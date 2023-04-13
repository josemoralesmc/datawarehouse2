const router = require('express').Router();
const Region = require('../models/region');

router.route('/region')
    .get(async (req, res) => {
        const region = await Region.obtenerTodos();
        res.json(region);

    })

    .post(async (req, res) => {
        try {
            const { id, nombre_region } = req.body;
            const result = await Region.crear(id, nombre_region)
            res.json('Region creado')
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (req, res) => {
        const id_region = req.query.id;
        const { nombre_region } = req.body;

        const result = await Region.actualizar(id_region, nombre_region);

        res.json("Region actualizada");
    })
    .delete(async (req, res) => {
        try {
            const id_region = req.query.id;

        await Region.borrar(id_region);

        res.json('Region eliminado con id ' + id_region);
        } catch (error) {
            console.log(error);
        }
        
    });


router.route('/region/pais')
    .get(async (req, res) => {
        const pais = await Region.obtenerTodoslosPais();
        res.json(pais);
    })
    .post(async (req, res) => {
        try {
            const { id, region_id, nombre_pais } = req.body;
            const result = await Region.crearPais(id, region_id, nombre_pais)
            res.json('pais creado')
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (req, res) => {
        const id = req.query.id;
        const { region_id, nombre_pais } = req.body;

        const result = await Region.actualizarPais(id, region_id, nombre_pais);

        res.json("Pais actualizado");
    })
    .delete(async (req, res) => {
        try {
            const id = req.query.id;
    
            await Region.borrarPais(id);
    
            res.json('pais eliminado con id ' + id);
            
        } catch (error) {
         console.log(error);   
        }
    });


router.route('/region/pais/ciudad')
    .get(async (req, res) => {
        const ciudad = await Region.obtenerTodoslasCiudades();
        res.json(ciudad);
    })
    .post(async (req, res) => {
        try {
            const { id, pais_id, nombre_ciudad } = req.body;
            const result = await Region.crearCiudad(id, pais_id, nombre_ciudad)
            res.json('ciudad creada')
        } catch (error) {
            console.log(error);
        }
    })
    .put(async (req, res) => {
        const id = req.query.id;
        const { pais_id, nombre_ciudad } = req.body;

        const result = await Region.actualizarCiudad(id, pais_id, nombre_ciudad);

        res.json("Ciudad Actualizada");
    })
    .delete(async (req, res) => {
        try {
             const id = req.query.id;

        await Region.borrarCiudad(id);

        res.json('Ciudad eliminado con id ' + id);
        } catch (error) {
            console.log(error);
        }
       
    });


router.route('/region/pais/ciudad_pais')
    .get(async (req, res) => {
        const id = req.query.id;
        const region = await Region.ObtenerCiudadesDePaises(id);
        res.json(region);

    })

router.route('/region/pais/region_pais')    
    .get(async (req, res) => {
        const id = req.query.id;
        const region = await Region.ObtenerPaiseeDeRegiones(id);
        res.json(region);

    })

module.exports = router