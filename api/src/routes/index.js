const { Router } = require('express');

const axios = require('axios');
const { Dog, Temperament}= require('../db');
const API_KEY = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo= async () =>{

    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id, 
            name:el.name,
            height:el.height.imperial,
            weight:el.weight.metric,
            life_span:el.life_span,
            image:el.image.url,
            temperament:el.temperament
        }
    }); 
   
   return apiInfo;
   
};
const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attibutes: ['name'],
            through: {
                attibutes: [],
            },
        }
    })
}

const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}

router.get('/dogs', async (req, res) => {
    const name = req.query.name
    let dogsTotal = await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        dogName.length ? res.status(200).send(dogName) : res.status(404).send('No existe ese perro')
    }else{
        res.status(200).send(dogsTotal)
    }
})

router.get('/temperaments', async (req, res) => {
    
    //Obtener todos los temperamentos posibles
    // En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos 
    // y luego ya{ utilizarlos desde allí}
    
        let array = [];
        let concatArr = [];

        const getApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const infoApi = getApi.data.map( data => {
            return {
                temperament: data.temperament,
            }
        });
        const filtrado = infoApi.filter(data => data.temperament !== undefined)
        filtrado.map(data => {
            array.push(data.temperament.split(","));
            return array
        });       
        array.forEach(data => {
            for(var i = 0; i < data.length; i++){
                data[i] = data[i].trimStart();
                concatArr.push(data[i])
            }
        });        
        const tabla = {};
        const unicos = concatArr.filter((indice) => {
        return tabla.hasOwnProperty(indice) ? false : (tabla[indice] = true);
        });        
        unicos.sort();
    const apiADb = unicos.map((data) => {
        return Temperament.findOrCreate({
            where:{
                name: data,
            }
        });
    });        
    let showDB = await Temperament.findAll();
    res.status(200).send(showDB);   
})
//  Esto llega pór Body...
router.post('/dogs', async (req, res) => {
    let {
        name,
        image,
        height,
        weight,
        life_span,
        temperament,
        createdInDb
    } = req.body;
// con esto lo creamos...
    const newDogCreated = await Dog.create({
        name,
        image,
        height,
        weight,
        life_span,
        createdInDb
    });

    let tempDB = await Temperament.findAll({
        where:{name: temperament},
        include: [Dog]
    });
    newDogCreated.addTemperament(tempDB); // add... creamos.

    return res.json(newDogCreated);
})

router.get('/dogs/:id', async (req, res) => {
    const id = req.params.id;
    const dogsTotal = await getAllDogs()
    if (id){
        let dogId = await dogsTotal.filter( el => el.id == id)
        dogId.length? res.status(200).json(dogId) : res.status(404).send('No se encontro el perro')
    }
})


module.exports = router;
