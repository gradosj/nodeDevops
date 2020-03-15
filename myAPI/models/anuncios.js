'use strict';
console.log('inicio anuncio.js')

const mongoose = require('mongoose');

//crear un esquema

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]

});
// con el esquema creamos un modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);


console.log('Fin anuncio.js')

//exportamos el modelo
module.exports = Anuncio;


