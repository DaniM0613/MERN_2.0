import { useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/clienteAxios'
import { useNavigate } from 'react-router-dom'

const ProyectosContext = createContext() 

const ProyectosProvider = ({children}) => {

  const [proyectos, setProyectos ] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [proyecto, setProyecto] = useState({});
  const [cargando, setCargando] = useState(false)
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false)
  const [ tarea, setTarea ] = useState({})

  const navigate = useNavigate();


  useEffect(() => {
    const obtenerProyectos = async () => {
       try {
         const token = localStorage.getItem('token')
         if(!token) return
         
         const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
         }
         const {data} = await clienteAxios('/proyectos', config)
         setProyectos(data)

       } catch(error) {
          console.log(error)
       }
     }
     obtenerProyectos()
  },[])



  const mostrarAlerta = alerta => {
    setAlerta(alerta)
    setTimeout(() => {
      setAlerta({})
    }, 4000);
  }



  const submitProyecto =async proyecto =>{
   if(proyecto.id) {
    await editarProyecto(proyecto)
   }else {
    await nuevoProyecto(proyecto)
   }
  }

  const editarProyecto = async proyecto => {
       try {
          const token = localStorage.getItem('token')
          if(!token) return 

          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
         const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
          

          //Sincronizar el state

          const proyectosActualizados =  proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
          setProyectos(proyectosActualizados)

          setAlerta({
             msg: 'Proyecto Actualizado Correctamente',
             error: false
          })

          setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
          }, 3000);
        }catch (error){
          console.log(error)
        }
  }


  const nuevoProyecto = async proyecto => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return
      const config = {
       headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
       }
      }
       const {data} = await clienteAxios.post('/proyectos', proyecto, config)
       
       setProyectos([...proyectos, data])

       setAlerta({
          msg: 'Proyecto Creado Correctamente',
          error: false
       })

       setTimeout(() => {
         setAlerta({})
         navigate('/proyectos')
       }, 3000);
   }catch(error){
      console.log(error)
   }
  }



  const obtenerProyecto = async id => { 
    setCargando(true)
    try{
      const token = localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        } 
      }
     const { data } = await clienteAxios(`/proyectos/${id}`, config);
      setProyecto(data)
    }catch(error){
       console.log(error)
    } finally {
        setCargando(false)
    }
  }

  const eliminarProyecto = async id => {
     try{
       const token = localStorage.getItem('token')
       if(!token) return

       const config = {
         headers:{
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
         }
       }

       
       const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

         // Sincronizar el state 
         const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
         setProyectos(proyectosActualizados)

         setAlerta({
            msg: data.msg,
            error: false
         })

         setTimeout(() => {
            setAlerta({})
            navigate('/proyectos')
         }, 3000);
     }catch {
        console.log(error)
     }
  }


  const handleModalTarea = () => {
     setModalFormularioTarea(!modalFormularioTarea)
     setTarea({})
  }

  const submitTarea = async tarea =>{
    if(tarea?.id){
     await editarTarea(tarea)
    }else {
     await crearTarea(tarea)
    }
  }

  const crearTarea = async tarea => {
      
    try {
      const token =  localStorage.getItem('token')
      if(!token) return

      const config = {
        headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
        }
      }

      const {data} = await clienteAxios.post('/tareas', tarea, config)
      console.log(data)

      // Agregar la tarea al state
      const proyectoActualizado = {... proyecto}
      proyectoActualizado.tareas = [... proyecto.tareas, data]
      setProyecto(proyectoActualizado)
      setAlerta({})
      setModalFormularioTarea(false)
   }catch(error){
     console.log(error)
   }
  }

  const editarTarea = async tarea => {
    try {
      const token = localStorage.getItem('token')
      if(!token) return 

      const config = {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }

      const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
      
      // Todo: Actualizar el DOM
      setAlerta({})
      setModalFormularioTarea(false)
    }catch(error){
       console.loog(error)
    }
  }



  const handleModalEditarTarea = tarea =>{
     setTarea(tarea)
     setModalFormularioTarea(true)
  }

  return (
     <ProyectosContext.Provider
       value= {{
         proyectos, 
         mostrarAlerta,
         alerta,
         submitProyecto,
         obtenerProyecto,
         proyecto,
         cargando,
         eliminarProyecto,
         modalFormularioTarea,
         handleModalTarea,
         submitTarea,
         handleModalEditarTarea,
         tarea
       }}
     >
      {children}
     </ProyectosContext.Provider>
  )
}
export {
  ProyectosProvider
}
export default ProyectosContext