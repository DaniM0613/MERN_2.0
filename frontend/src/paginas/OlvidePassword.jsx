import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6 ){
       setAlerta({
          msg: 'El Email es obligatorio',
          error: true
       });
        return 
    }

    try {
        
       const {data} = await clienteAxios.post(`/usuarios/olvide-password`, {email})

        setAlerta({
          msg: data.msg,
          error: false
        })

    }catch(error){
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
    }
  }

    const {msg} = alerta

  return (
    <>
    <h1 className='text-purple-900 text-6xl capitalize font-black'>Recupera tu acceso y no pierdas tus proyectos</h1>
      
      {msg && <Alerta alerta={alerta}/>}


      <form 
         className='my-3 p-10 rounded-lg shadow bg-white'
         onSubmit={handleSubmit}
      >

      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email de registro'
          className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
          value= {email}
          onChange = {e => setEmail(e.target.value)}
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
