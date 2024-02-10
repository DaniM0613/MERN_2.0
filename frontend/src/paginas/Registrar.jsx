import { useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import axios from 'axios'

const Registrar =  () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    
    if([nombre, email, password, repetirPassword].includes('')) {
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
         msg: 'Los password no son iguales',
         error: true
      })
      return
    }
    if(password.length < 6 ) {
      setAlerta({
         msg: 'El Password es muy corto, agrega minimo 6 caracteres',
         error: true
      })
      return
    }
     setAlerta({})

     // Crear el usuario en la API
    try {
       const {data} = await axios.post( `${import.meta.env.VITE_BACKEND_URL}/api/usuarios` , {nombre, email, password})
       
       setAlerta({
           msg: data.msg,
           error: false
       })

       setNombre('')
       setEmail('')
       setPassword('')
       setRepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta

  return (
    <>

    <h1 className='text-purple-900 font-black capitalize text-5xl'>
     Crea tu cuenta y administra tus proyectos
    </h1>

    {msg && <Alerta alerta={alerta} />}

    <form 
      className='my-10 shadow rounded-lg bg-white p-10'
      onSubmit={handleSubmit}
    >


      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='nombre'>Nombre</label>
        <input
          id='nombre'
          type='text'
          placeholder='Tu nombre'
          className='w-full rounded-xl border p-3 mt-3 bg-gray-100'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>

      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email de registro'
          className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
          value={email}
          onChange={e => setEmail(e.target.value)}
        /> 
      </div>


      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password'>Password</label>
         <input
           type='password'
           id='password'
           placeholder='Password de registro'
           className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
           value={password}
           onChange={e => setPassword(e.target.value)}
         />
      </div>

      <div className='my-5'>
        <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='password2'>Repetir Password</label>
         <input
          type='password'
          id='password2'
          placeholder='Repetir password'
          className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
          value={repetirPassword}
          onChange={e => setRepetirPassword(e.target.value)}
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
          to='/'
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
