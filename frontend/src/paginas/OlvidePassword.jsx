import { Link } from 'react-router-dom'

const OlvidePassword = () => {
  return (
    <>
    <h1 className='text-purple-900 text-6xl capitalize font-black'>Recupera tu acceso y no pierdas tus proyectos</h1>
      
      <form className='my-3 p-10 rounded-lg shadow bg-white'>

      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email de registro'
          className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
        /> 
      </div>
      <input
        type='submit'
        value='Enviar Instrucciones'
        className='bg-sky-700 mt-5 py-3 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
      />

      </form>

      <nav className='lg:flex lg:justify-between'>
      <Link 
          className='block text-center my-5 text-sky-900 uppercase text-sm'
          to='/'
        >
        ¿Ya tines una cuenta? Iniciar sesión
       </Link>
       <Link 
          className='block text-center my-5 text-sky-900 uppercase text-sm'
          to='/registrar'
        >
       ¿No tienes una cuenta? Regístrate
       </Link>
      </nav>
    </>
  )
}

export default OlvidePassword
