import React from 'react';

export default function Card ({ name, img, temperament, temperaments}) {
    return (
        <div>
        <h3>{name}</h3> 
        <img 
            src={ img } 
            alt='imagen raza' width="150" height="150"/>
        <div>                                              
                <p>Temperamento: { temperament ? temperament.map( elem => elem + ', ') :
                        temperaments?.map( elem => elem.name + ', ') 
                    }
                </p>                
        </div>
    </div>
    )
}