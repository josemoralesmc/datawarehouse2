const jwt = require('jsonwebtoken');
const conexion = require('../conexion');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const validarAdministrador = require('../middlewares/validarAdministrador');
const {ValidarCampos, ValidarExistencia} = require('../middlewares/usuarios.middlewares');


router.route('/login').post(async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;
    const result = await conexion.query('SELECT * FROM usuarios WHERE nombre_usuario = ? OR email = ?', {
        type: conexion.QueryTypes.SELECT,
        replacements: [nombre_usuario, nombre_usuario]
    });

    if (result.length > 0 && bcrypt.compareSync(contrasena, result[0].contrasena)) {
        const { apellido_usuario, email, perfil } = result[0];
        const token = jwt.sign({ usuario: { apellido_usuario, email, perfil } }, process.env.jwt_pass);
        res.json(token);
    } else {
        res.status(401).json('Usuario y/o contraseña incorrectas');
    }
});

router.route('/registrar').post( validarAdministrador, ValidarCampos, ValidarExistencia, (req, res) => {
    const { nombre_usuario, apellido_usuario, email, perfil, contrasena } = req.body;

    const passwordHash = bcrypt.hashSync(contrasena, 8);

    conexion.query('INSERT INTO usuarios (nombre_usuario, apellido_usuario, email, perfil, contrasena) VALUES (?, ?, ?, ?, ?)', {
        replacements: [nombre_usuario,  apellido_usuario, email, perfil, passwordHash]
    });
    res.status(204).end();
});


module.exports = router;