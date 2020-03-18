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

anuncioSchema.statics.lista = function (filtro, limit, skip, sort) {
    console.log(Anuncio.find);  // el .lista lo ponemos nosotros, no es nada declarado. 
    const query = Anuncio.find(filtro); //el find no se hace hasta hacer el return, await o .exec

    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    return query.exec();

};
// con el esquema creamos un modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);


console.log('Fin anuncio.js')

//exportamos el modelo
module.exports = Anuncio;


