import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../actions'; 
import { Link } from 'react-router-dom';
import Card from './Card';

export default function Home (){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)

    useEffect (() => {
        dispatch (getDogs());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return(
        <div>
            <Link to='/dogs'>Crear perro</Link>
            <h1>Los mejores perros</h1>
            <button onClick={e => {handleClick()}}>
                Volver a cargar a los perros
            </button>
            <div>
                <select>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                    <option value='ascWeight'>Menor peso</option>
                    <option value='desWeight'>Mayor peso</option>
                </select>
                {
                    allDogs && allDogs.map( el => {
                        <Card name = {el.name} img = {el.img}></Card>
                    })
                }

            </div>
        </div>
    )



}