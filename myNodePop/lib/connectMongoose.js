'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection.on; 

conn.on('open', () => {
    console.log('Conectado a MongoDb en', conn.name);
});

conn.on('error', err => {
    console.error('Error de conexion', err);
    process.exit(1);

});

mongoose.connect('mongodb://localhost/myNodepop');

module.exports = conn; // Esto ahora lo usamos en APP.js para que arranque la conexion automaticamente