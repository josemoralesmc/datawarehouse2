const sequelize = require("../conexion")

const Region = {};

Region.crear = async (id, nombre_region) => {
    try {
        const result = await sequelize.query('INSERT INTO region (id, nombre_region) VALUES (?, ?)', {
            replacements: [id, nombre_region]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Region.obtenerTodos = async () => {
    const result = await sequelize.query('SELECT id, nombre_region FROM region',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}
Region.obtenerTodasLasRegiones = async () => {
    const result = await sequelize.query('SELECT * FROM region INNER  JOIN pais ON   region.id = pais.region_id INNER JOIN ciudad ON  pais.id = ciudad.pais_id',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Region.actualizar = async (id, nombre_region) => {
    try {
        const result = await sequelize.query('UPDATE region SET nombre_region = ? WHERE id = ?', {
            replacements: [nombre_region, id]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Region.borrar = async (id) => {
    try {
        const result = await sequelize.query('DELETE FROM region WHERE id = ?', {
        replacements: [id]
    });
    return result;
    } catch (error) {
        console.log(error);
    }
    
}

//Paises 
Region.crearPais = async (id, region_id, nombre_pais) => {
    try {
        const result = await sequelize.query('INSERT INTO pais (id, region_id, nombre_pais) VALUES (?, ?, ?)', {
            replacements: [id, region_id, nombre_pais]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Region.obtenerTodoslosPais = async () => {
    const result = await sequelize.query('SELECT pais.region_id, region.nombre_region, pais.nombre_pais, pais.id FROM region INNER  JOIN pais ON   region.id = pais.region_id ',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Region.actualizarPais = async (id, region_id, nombre_pais) => {
    try {
        const result = await sequelize.query('UPDATE pais SET region_id = ?, nombre_pais = ? WHERE id = ?', {
            replacements: [region_id, nombre_pais, id]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Region.borrarPais = async (id) => {
    try {
       const result = await sequelize.query('DELETE FROM pais WHERE id = ? ', {
        replacements: [id]
    });
    return result; 
    } catch (error) {
        console.log(error);
    }
    
}

//ciudad

Region.crearCiudad = async (id, pais_id, nombre_ciudad) => {
    try {
        const result = await sequelize.query('INSERT INTO ciudad (id, pais_id, nombre_ciudad) VALUES (?, ?, ?)', {
            replacements: [id, pais_id, nombre_ciudad]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

Region.obtenerTodoslasCiudades = async () => {
    const result = await sequelize.query('SELECT * FROM region INNER  JOIN pais ON   region.id = pais.region_id INNER JOIN ciudad ON pais.id = ciudad.pais_id',
        { type: sequelize.QueryTypes.SELECT });
    return result;
}

Region.ObtenerCiudadesDePaises = async (id) => {
    const result = await sequelize.query('SELECT ciudad.id, ciudad.pais_id, ciudad.nombre_ciudad, pais.region_id, pais.nombre_pais FROM ciudad JOIN pais ON  pais.id = ciudad.pais_id WHERE pais_id = ?',
        { type: sequelize.QueryTypes.SELECT, replacements: [id] });
    return result;
}
Region.ObtenerPaiseeDeRegiones = async (id) => {
    const result = await sequelize.query('SELECT * FROM region JOIN pais ON  pais.region_id = region.id WHERE region_id = ?',
        { type: sequelize.QueryTypes.SELECT, replacements: [id] });
    return result;
}

Region.actualizarCiudad = async (id, pais_id, nombre_ciudad) => {
    try {
        const result = await sequelize.query('UPDATE ciudad SET pais_id = ?, nombre_ciudad = ? WHERE id = ?', {
            replacements: [pais_id, nombre_ciudad, id,]
        });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

Region.borrarCiudad = async (id) => {
    const result = await sequelize.query('DELETE FROM ciudad WHERE id = ?', {
        replacements: [id]
    });
    return result;
}



module.exports = Region;
