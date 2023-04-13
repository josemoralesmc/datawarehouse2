const router = require('express').Router();
const Contactos = require('../models/contactos');
const {ValidarCampos} = require('../middlewares/contactos.middlewares')
router.route('/')
    .get( async (req, res) => {
        const contactos = await Contactos.obtenerTodos();
        res.json(contactos);
        
    })
    .post( ValidarCampos, async (req, res) => {
        try {
            const {nombre_contacto, apellido_contacto, interes_contacto, email_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario, ciudad_contacto, compania_contacto, pais_contacto  } = req.body;
        const result = await Contactos.crear(nombre_contacto, apellido_contacto, interes_contacto, email_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario, ciudad_contacto, compania_contacto, pais_contacto )
        res.json('Contacto creada')
        } catch (error) {
            console.log(error);
        }    
    })
    .put( async (req, res) => {
        const id_contacto = req.query.id;
        const {nombre_contacto, apellido_contacto, interes_contacto, email_contacto, compania_contacto, ciudad_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario} = req.body;

        const result = await Contactos.actualizar(id_contacto, nombre_contacto, apellido_contacto, interes_contacto, email_contacto, compania_contacto, ciudad_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario);

        res.json("Contacto actualizada");
    })
    .delete(async (req, res) => {
        const id_contacto = req.query.id;

        await Contactos.borrar(id_contacto);

        res.json('Contacto eliminada con id ' + id_contacto);
    });

router.route('/search')

    .get( async (req, res) => {
        try {
            const search = req.query.search
            const Search = await Contactos.Busqueda(search);
            res.json(Search);
            
        } catch (error) {
            console.log(error);
        }
        
    })

module.exports = router