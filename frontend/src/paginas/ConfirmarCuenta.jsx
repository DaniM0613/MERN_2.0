import { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams();
  const {id} = params

  useEffect(() => {
     const  confirmarCuenta = async () => {
       try {

           
          const url = `/usuarios/confirmar/${id}`
          const {data} = await clienteAxios(url)

       setAlerta({
         msg: data.msg,
         error: false
       })
      
       setCuentaConfirmada(true)

       } catch(error){
          setAlerta({
             msg: error.response.data.msg,
             error: true
          })
       }

     }
      confirmarCuenta();

      
  }, []);

  const  { msg } = alerta
  
  return (
    <>
       <h1 className='text-purple-900 text-5xl capitalize font-black'>Confirma tu cuenta y 
       comienza a crear tus {''}
       <span className='text-slate-700'>proyectos </span> 
       </h1>

       <div className='mt-15 md:mt-10 shadow-lg px-5 py-5 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta}/>}

        {cuentaConfirmada && (
           <Link 
           className='block text-center my- text-slate-500 uppercase text-sm'
           to='/'
           >
           Inicia Sesión</Link>
        )}
       </div>
    </>
  )
}

export default ConfirmarCuenta
