require('dotenv').config();
const express = require('express');
var { expressjwt: jwt } = require("express-jwt")
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(express.static('public'));

var mysql = require('mysql');
  var connection = mysql.createConnection({
    	host     : process.env.MYSQL_ADDON_HOST,
    	database : process.env.MYSQL_ADDON_DB,
    	user     : process.env.MYSQL_ADDON_USER,
    	password : process.env.MYSQL_ADDON_PASSWORD
  });
// middlewares 





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(jwt({
    secret: process.env.jwt_pass,
    algorithms: ['HS256']
}).unless({
    path: ['/api/login', '/api/registrar']
}));



//routes
app.use('/api', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/contactos', require('./routes/contactos.routes'))
app.use('/api', require('./routes/region.routes'))
app.use('/api/compania', require('./routes/compania.routes'))

app.listen(process.env.PORT, () => { console.log('Servidor escuchando en el puerto ' + process.env.PORT); });