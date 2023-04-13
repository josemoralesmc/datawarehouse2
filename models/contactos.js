const sequelize = require("../conexion")

const Contactos = {};

Contactos.crear = async (nombre_contacto, apellido_contacto, interes_contacto, email_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario, ciudad_contacto, compania_contacto, pais_contacto ) => {
    try {
        const result = await sequelize.query('INSERT INTO contactos (nombre_contacto, apellido_contacto, interes_contacto, email_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario, ciudad_contacto, compania_contacto, pais_contacto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', {
            replacements: [nombre_contacto, apellido_contacto, interes_contacto, email_contacto, direccion_contactos, canales_contacto, cargo_contacto, cuenta_usuario, ciudad_contacto, compania_contacto, pais_contacto ]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Contactos.obtenerTodos = async () => {
    const result = await sequelize.query('SELECT contactos.id, contactos.nombre_contacto, contactos.apellido_contacto, contactos.email_contacto, contactos.ciudad_contacto, contactos.compania_contacto, contactos.cargo_contacto, contactos.interes_contacto, compania.nombre_compania, ciudad.nombre_ciudad, pais.nombre_pais FROM contactos INNER JOIN ciudad ON contactos.ciudad_contacto = ciudad.id INNER JOIN compania ON contactos.compania_contacto = compania.id INNER JOIN pais ON pais.id = ciudad.pais_id',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}



Contactos.Busqueda = async (search) => {
    try {
        
        const result = await sequelize.query('SELECT contactos.id, contactos.nombre_contacto, contactos.apellido_contacto, contactos.email_contacto, contactos.ciudad_contacto, contactos.compania_contacto, contactos.cargo_contacto, contactos.interes_contacto, compania.nombre_compania, ciudad.nombre_ciudad, pais.nombre_pais FROM contactos INNER JOIN ciudad ON contactos.ciudad_contacto = ciudad.id INNER JOIN compania ON contactos.compania_contacto = compania.id INNER JOIN pais ON pais.id = ciudad.pais_id WHERE CONCAT(nombre_contacto, apellido_contacto, interes_contacto, email_contacto, compania_contacto, ciudad_contacto, canales_contacto, cargo_contacto, cuenta_usuario) LIKE ?  ',
            {replacements: [search],
                 type: sequelize.QueryTypes.SELECT });
        return result;
    } catch (error) {
        console.log(error);
    }
}

Contactos.actualizar = async (id, nombre_contacto, apellido_contacto, interes_contacto, email_contacto, compania_contacto, ciudad_contacto, direccion_contacto, canales_contacto, cargo_contacto, cuenta_usuario) => {
    try {
        const result = await sequelize.query('UPDATE contactos SET nombre_contacto = ?, apellido_contacto = ?, interes_contacto = ?, email_contacto = ?, compania_contacto = ?, ciudad_contacto = ?, direccion_contactos = ?, canales_contacto = ?, cargo_contacto = ?, cuenta_usuario = ? WHERE id = ?', {
            replacements: [nombre_contacto, apellido_contacto, interes_contacto, email_contacto, compania_contacto, ciudad_contacto, direccion_contacto, canales_contacto, cargo_contacto, cuenta_usuario, id]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Contactos.borrar = async (id) => {
    const result = await sequelize.query('DELETE FROM contactos WHERE id = ?', {
        replacements: [id]
    });
    return result;
}



module.exports = Contactos;
