import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const agregarTarea = async (req, res) => {
    const {proyecto} = req.body
    delete req.body.id

    const existeProyecto = await Proyecto.findById(proyecto)
    
    if(!existeProyecto){
        const error = new Error('El Proyecto no existe');
        return res.status(404).json({msg: error.message});
    }
    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes los permisos para añadir tareas');
        return res.status(403).json({msg: error.message})
    }

    try {
      const tareaAlmacenada = await Tarea.create(req.body);
      // Almacenar el ID en el proyecto
      existeProyecto.tareas.push(tareaAlmacenada._id);
      await existeProyecto.save();
      res.json(tareaAlmacenada);
    }catch (error){
        console.log(error)
    }

 };

const obtenerTarea = async (req, res) => {
    const { id } = req.params
   
    const tarea = await Tarea.findById(id).populate("proyecto");

    if(!tarea){
        const error = new Error('Tarea no Encontrado')
        return res.status(404).json({msg: error.message});
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion No Valida');
        return res.status(403).json({msg: error.message});
    }

    res.json(tarea);
};

const actualizarTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if(!tarea) {
        const error = new Error('Tarea no Encontrada');
        return res.status(404).json({msg: error.message});
    }
    
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no valida');
        return res.status(403).json({msg: error.message});
    }

    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
      const tareaAlmacenada = await tarea.save();
      res.json(tareaAlmacenada);
    }catch(error) {
        console.log(error);
    }

};
const eliminarTarea = async (req, res) => {
    const {id } = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');
    if(!tarea){
        const error = new Error('Tarea No Encontrada');
        return res.status(404).json({msg: error.message});
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Accion no valida');
        return res.status(403).json({msg: error.message});
    }

    try {
        await tarea.deleteOne()
        res.json({msg: 'La Tarea se elimino'})
    }catch(error){
        console.log(error)
    }
};

const cambiarEstado = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate('proyecto');

    if(!tarea) {
        const error = new Error('Tarea no encontrada');
        return res.status(404).json({ msg: error.message});
    }

    if( tarea.proyecto.creador.toString() !== req.usuario._id.toString() && !tarea.proyecto.colaboradores.some (
        (colaboradores) => colaboradores._id.toString() === req.usuario._id.toString())
        ) {
            const error = new Error('Accion no valida')
            return res.status(403).json({msg: error.message})
        }
   
    tarea.estado = !tarea.estado;
    await tarea.save();
    res.json(tarea);
    
};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,
}