'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/anuncios');

console.log('holaaaaaaaaaaaaaaaaa');
// esta sera la raiz
router.get('/', async (req, res, next) => {
    try {
        const nombre = req.query.nombre;
        const precio  = req.query.precio;
        const filtro = {};  

        if (nombre) {
            filtro.nombre = nombre;
        }

        if (precio){
            filtro.precio = precio;
        } 


       

        const docs = await Anuncio.lista(filtro);
        res.json(docs);
    } catch (err) {
        next(err);
    }
});


// realizamos peticiones por id
router.get('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id; // metamos siempre los parametros en variables

        const anuncio = await Anuncio.findOne({ _id: _id });
        if (!anuncio) { //controlamos el retorno 
            const err = new Error('not found');
            err.status = 404;
            return next(err); // como esta definia la viesta de errores, "enviamos el error" a la vista
        }

        res.json({ result: anuncio });

    } catch (err) {
        next(err);

    }

});

// Crea un anuncio
router.post('/', async (req, res, next) => {
    try {
        const anuncioData = req.body;

        // creamos el objeto en memoria
        const anuncio = new Anuncio(anuncioData);
        const anuncioGuardado = await anuncio.save(); //metodo de mongoose para el guardado, que nos devuelve el objero añadido a la BBDD
        res.status(201).json({ result: anuncioGuardado })
    } catch (err) {
        next(err);
    }


    // lo guardamos en la BBDD


});

module.exports = router; // lo exportamos para usarlo en app.js