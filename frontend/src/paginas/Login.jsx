import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Login = () =>  {
  return (
    <>
       <h1 className='text-purple-900 font-black text-6xl capitalize'>Inicia sesión y administra tus proyectos</h1>

       <form className='my-10 bg-white shadow rounded-lg p-10'>


        <div className='my-5'>
          <label 
             className='uppercase text-gray-600 block text-xl font-bold'
             htmlFor="email">Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='Email de registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
          />
        </div>


        <div className='my-5'>
          <label 
             className='uppercase text-gray-600 block text-xl font-bold'
             htmlFor="password">Password
          </label>
          <input  
            id='password'
            type='password'
            placeholder='Password de registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-100'
          />
        </div>

        

        <input
          type='submit'
          value='Iniciar Sesión'
          className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
       </form>

       <nav className='lg:flex lg:justify-between'>
        <Link 
          className='block text-center my-5 text-sky-900 uppercase text-sm'
          to='registrar'
        >
        ¿No tienes una cuenta? Regístrate
        </Link>
        <Link 
          className='block text-center my-5 text-sky-900 uppercase text-sm'
          to='/olvide-password'
        >
        Olvide mi password
        </Link>
       </nav>
    </>
  )
}

export default Login
