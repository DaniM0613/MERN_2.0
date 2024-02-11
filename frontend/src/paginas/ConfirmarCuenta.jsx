import { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Alerta from '../components/Alerta'


const ConfirmarCuenta = () => {

  const params = useParams();

  console.log(params)
  return (
    <>
       <h1 className='text-purple-900 text-5xl capitalize font-black'>Confirma tu cuenta y 
       comienza a crear tus {''}
       <span className='text-slate-700'>proyectos </span> </h1>
    </>
  )
}

export default ConfirmarCuenta
