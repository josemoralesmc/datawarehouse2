const router = require('express').Router();
const Compania = require('../models/companias');
router.route('/')
    .get( async (req, res) => {
        const compania = await Compania.obtenerTodos();
        res.json(compania);
        
    })
    .post(async (req, res) => {
        try {
            const { id, nombre_compania, direccion, email, telefono, ciudad_id } = req.body;
        const result = await Compania.crear(id, nombre_compania, direccion, email, telefono, ciudad_id)
        res.json('Compania creada')
        } catch (error) {
            console.log(error);
        }    
    })
    .put( async (req, res) => {
        const id_compania = req.query.id;
        const {nombre_compania, direccion, email, telefono, ciudad_id} = req.body;

        const result = await Compania.actualizar(id_compania, nombre_compania, direccion, email, telefono, ciudad_id);

        res.json("Compania actualizada");
    })
    .delete(async (req, res) => {
        const id_compania = req.query.id;

        await Compania.borrar(id_compania);

        res.json('Compania eliminada con id ' + id_compania);
    });

module.exports = router