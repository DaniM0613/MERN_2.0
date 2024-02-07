import { Link } from 'react-router-dom'

const Registrar = () => {
  return (
    <>

    <h1 className='text-purple-900 font-black capitalize text-6xl'>
     Crea tu cuenta y administra tus proyectos
    </h1>


    <form className='my-10 shadow rounded-lg bg-white p-10'>


      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='nombre'>Nombre</label>
        <input
          id='nombre'
          type='text'
          placeholder='Tu nombre'
          className='w-full rounded-xl border p-3 mt-3 bg-gray-100'
        />
      </div>

      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email de registro'
          className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
        /> 
      </div>


      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>Password</label>
         <input
           type='password'
           id='password'
           placeholder='Password de registro'
           className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
         />
      </div>

      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password2'>Repetir Password</label>
         <input
          type='password2'
          id='password2'
          placeholder='Repetir password'
          className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
         />

      </div>

      <input
        type='submit'
        value='Crear cuenta'
        className='bg-sky-700 mt-5 py-3 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
      />
     </form>

     <nav className='lg:flex lg:justify-between'>
      <Link 
          className='block text-center my-5 text-sky-900 uppercase text-sm'
          to='registrar'
        >
        ¿Ya tines una cuenta? Iniciar sesión
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

export default Registrar
