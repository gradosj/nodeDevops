'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/anuncios');

console.log('holaaaaaaaaaaaaaaaaa');
// esta sera la raiz
router.get('/', async (req, res, next) => {
    try {
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const limit = parseInt(req.query.limit || 10); // si el primero es false, te da el 10
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        const tag = req.query.tags;

        let precio = req.query.precio;
        let preciomax = req.query.preciomax;
        let preciomin = req.query.preciomin;

        console.log('Precio max: ', preciomax);
        console.log('Nombre: ', nombre);

        
        
        const filtro = {};

        if (typeof nombre !== 'undefined') {
            filtro.nombre = nombre;
        }

        if (typeof precio !== 'undefined') {
            filtro.precio = precio;
        }

        if (venta) {
            filtro.venta = venta;
        }
       
        if (tag !== undefined) {
            filtro.tags = req.query.tags.split(','); //El .split separa por comas y guarda en Array. Si un anuncio tiene 2 tags no encuentra uno individual o desordenado tampoco.
            console.log(filtro.tags);
        }

        console.log(preciomax, preciomin);

        if (preciomax !== undefined || preciomin !== undefined) { // si los dos vienen informados, pasamos select completa
            filtro.precio = { $gte: parseInt(preciomin), $lte: parseInt(preciomax) }
           // si alguno de los dos no viene informado solo informamos select correpondiente
            if (preciomax === undefined) {
                filtro.precio = { $gte: parseInt(preciomin) }; 
            };

            if (preciomin === undefined) {
                filtro.precio = { $lte: parseInt(preciomax) }; 
            };

            console.log(" Entra por aqui preciomax:", preciomax,  "preciomin:", preciomin);
           // filtro.precio = { $gte: parseInt(preciomin), $lte: parseInt(preciomax) }
            
            }
        
        
        console.log(filtro);
        const docs = await Anuncio.lista(filtro, limit, skip, sort);
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