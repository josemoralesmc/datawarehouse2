const modelsUsuarios = require("../models/usuarios");
const RegistarUsuario = require("../routes/auth.routes");

function ValidarCampos(req, res, next) {
    
    const { nombre_usuario, apellido_usuario, email, perfil, contrasena } = req.body;

    if (!nombre_usuario || !apellido_usuario || !email || !perfil || !contrasena) {
        res.status(400).json({error: "Datos incompletos"})
    } else{
        next();
    }
}

 async function ValidarExistencia(req, res, next) {
     try {
        const { nombre_usuario, email} = req.body;
         const Verificar = await modelsUsuarios.VerificarUsuario(nombre_usuario, email)
         console.log(Verificar);
         if (Verificar.length > 0) {
             res.status(409).json({error: `El nombre de usuario o email ya existe`});
         } else {
             next();
         }
         
     } catch (error) {
         console.log(error);
     }
 }


function ValidarContraseña(req, res, next) {
    const { contrasena, contrasenaRepetida } = req.body;
    if (contrasena !== contrasenaRepetida) {
        res.status(400).json({error: "Las contraseñas tienen que coincidir"})
    } else {
        next()
    }
}


module.exports = {ValidarCampos, ValidarContraseña, ValidarExistencia}