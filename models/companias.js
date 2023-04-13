const sequelize = require("../conexion")

const Compania = {};

Compania.crear = async (id, nombre_compania, direccion, email, telefono, ciudad_id) => {
    try {
        const result = await sequelize.query('INSERT INTO compania (id, nombre_compania, direccion, email, telefono, ciudad_id) VALUES (?, ?, ?, ?, ?, ?)', {
            replacements: [id, nombre_compania, direccion, email, telefono, ciudad_id]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Compania.obtenerTodos = async () => {
    const result = await sequelize.query('SELECT compania.id, compania.nombre_compania, compania.direccion, compania.email, compania.telefono, compania.ciudad_id, ciudad.nombre_ciudad FROM compania INNER JOIN ciudad ON compania.ciudad_id=ciudad.id;',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Compania.actualizar = async (id, nombre_compania, direccion, email, telefono, ciudad_id) => {
    try {
        const result = await sequelize.query('UPDATE compania SET nombre_compania = ?, direccion = ?, email = ?, telefono = ?, ciudad_id = ? WHERE id = ?', {
            replacements: [ nombre_compania, direccion, email, telefono, ciudad_id, id]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Compania.borrar = async (id) => {
    const result = await sequelize.query('DELETE FROM compania WHERE id = ?', {
        replacements: [id]
    });
    return result;
}



module.exports = Compania;
