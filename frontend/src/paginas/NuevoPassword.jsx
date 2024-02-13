import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'


const NuevoPassword = () => {

  const [ password, setPassword ] = useState('')
  const [ tokenValido, setTokenValido ] = useState(false)
  const [ alerta, setAlerta] = useState({})
  const [ passwordModificado, setPasswordModificado ] = useState(false)

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
        try {
      
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
        }catch( error ){
          setAlerta({
             msg: error.response.data.msg,
             error: true
          })
        }

    }
      comprobarToken()
  }, [])

   const handleSubmit = async e => {
    e.preventDefault();

    if(password.length < 6 ){
      setAlerta({
        msg:'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }
     
     try {
       const url= `/usuarios/olvide-password/${token}`

       const { data } = await clienteAxios.post(url, {password})
       setAlerta({
        msg: data.msg,
        error: false

       })
       setPasswordModificado(true)
     }catch (error){
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
     }
   }

   const { msg } = alerta
  return (
    <>
     <h1 className='text-purple-900 text-6xl capitalize font-black'>Restablece tu password y no pierdas acceso a tus proyectos</h1>
      
      { msg && <Alerta alerta = {alerta}/>}

      { tokenValido && (
        <form 
          className='my-3 p-10 rounded-lg shadow bg-white'
          onSubmit={handleSubmit}
        >

        <div className='my-5'>
          <label className='uppercase text-gray-600 block text-xl font-bold' htmlFor='email'>Nuevo password</label>
          <input
            id='password'
            type='password'
            placeholder='Escribe tu nuevo password'
            className='rounded-xl p-3 border mt-3 w-full bg-gray-100'
            value={password}
            onChange= {e => setPassword(e.target.value)}
          /> 
        </div>
        <input
          type='submit'
          value='Guardar nuevo password'
          className='bg-sky-700 mt-5 py-3 w-full text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors'
        />
  
        </form>
      )}

      {passwordModificado && (
        <Link
          className= 'block text-center my-5 text-slate-900 uppercase text-sm'
          to="/"
        >
         Iniciar Sesión
        </Link>
      )}
    </>
  )
}

export default NuevoPassword
