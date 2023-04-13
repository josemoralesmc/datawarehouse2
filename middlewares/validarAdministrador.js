
module.exports = (req, res, next) => {
    const jwt = require('jsonwebtoken');
    require('dotenv').config();
    const token = req.headers.authorization.split(' ')[1];
    if(token) {
       const verificar = jwt.verify(token, process.env.jwt_pass); 
       console.log(verificar.usuario.perfil);
       if (verificar.usuario.perfil == 1) {
            next();
        } else{
            res.status(401).json({error: "no esta autorizado"}); 
        }
    } else { 
        res.status(401).json({error: "no esta autorizado"}); 
    }
}