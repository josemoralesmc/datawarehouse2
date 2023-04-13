const sequelize = require("../conexion")

const Usuario = {}


Usuario.obtenerTodos = async () => {
    const result = await sequelize.query('SELECT id, nombre_usuario, apellido_usuario, email, perfil FROM usuarios',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Usuario.VerificarUsuario = async (nombre_usuario, email) => {
    try {
        
        const result = await sequelize.query('SELECT * FROM usuarios WHERE nombre_usuario = ? OR email = ?',
            { replacements: [nombre_usuario, email],
                type: sequelize.QueryTypes.SELECT });
        return result;
    } catch (error) {
        console.log(error);
    }
}


Usuario.actualizar = async (id_usuario, nombre_usuario, apellido_usuario, email, perfil) => {
    try {
        const result = await sequelize.query('UPDATE usuarios SET nombre_usuario = ?, apellido_usuario = ?, email = ?, perfil = ? WHERE id = ?', {
            replacements: [nombre_usuario, apellido_usuario, email, perfil, id_usuario]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Usuario.borrar = async (id) => {
    const result = await sequelize.query('DELETE FROM usuarios WHERE id = ?', {
        replacements: [id]
    });
    return result;
}

module.exports = Usuario;