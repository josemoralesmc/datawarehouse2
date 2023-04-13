const router = require('express').Router();
const Usuario = require('../models/usuarios');
const validarAdministrador = require('../middlewares/validarAdministrador');
const {ValidarCampos, ValidarExistencia} = require('../middlewares/usuarios.middlewares');


router.route('/')
    .get(validarAdministrador, async  (req, res) => {
        const usuarios = await Usuario.obtenerTodos();
        res.json(usuarios);
    })
    .put(validarAdministrador, ValidarCampos, async ( req, res) => {
        const id_usuario = req.query.id;
        const { nombre_usuario, apellido_usuario, email, perfil} = req.body;

        const result = await Usuario.actualizar(id_usuario, nombre_usuario, apellido_usuario, email, perfil);

        res.json(result);
    })
    .delete(validarAdministrador, async (req, res) => {
        const id_usuario = req.query.id;

        await Usuario.borrar(id_usuario);

        res.json('Usuario eliminado con id ' + id_usuario);
    });


module.exports = router;