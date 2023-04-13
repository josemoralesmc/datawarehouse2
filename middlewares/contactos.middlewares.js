const modelsUsuarios = require("../models/contactos");

function ValidarCampos(req, res, next) {
    
    const { nombre_contacto, apellido_contacto, interes_contacto, email_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario, ciudad_contacto, compania_contacto, pais_contacto  } = req.body;

    if (!nombre_contacto || !apellido_contacto || !interes_contacto || !email_contacto || !direccion_contactos || !canales_contacto || !cargo_contacto || !cuenta_usuario || !ciudad_contacto || !compania_contacto || !pais_contacto) {
        res.status(400).json({error: "Datos incompletos"})
    } else{
        next();
    }
}

module.exports = {ValidarCampos}