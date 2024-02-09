import React from 'react'

const NuevoPassword = () => {
  return (
    <>
     <h1 className='text-purple-900 text-6xl capitalize font-black'>Restablece tu password y no pierdas acceso a tus proyectos</h1>
      
      <form className='my-3 p-10 rounded-lg shadow bg-white'>

      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Nuevo password</label>
        <input
          id='password'
          type='password'
          placeholder='Escribe tu nuevo password'
          className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
        /> 
      </div>
      <input
        type='submit'
        value='Guardar nuevo password'
        className='bg-sky-700 mt-5 py-3 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
      />

      </form>
    </>
  )
}

export default NuevoPassword
