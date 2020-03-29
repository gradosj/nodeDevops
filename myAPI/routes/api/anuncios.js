'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/anuncios');
const { check, validationResult } = require('express-validator');


// esta sera la raiz
router.get('/', async (req, res, next) => {
    try {

        const venta = req.query.venta;
        const limit = parseInt(req.query.limit || 10); // si el primero es false, te da el 10
        const skip = parseInt(req.query.skip);
        const sort = req.query.sort;
        const fields = req.query.fields;
        let tag = req.query.tags;

        let precio = req.query.precio;
      
        let nombre = req.query.nombre;

   
        console.log('Nombre: ', nombre);

        const filtro = {};

        if (typeof nombre !== 'undefined') {
            filtro.nombre = new RegExp('^' + nombre, 'i');
   
        }

 

        if (venta) {
            filtro.venta = venta;
        }

        if (tag !== undefined) {
          

            tag = req.query.tags.split(',');

            filtro.tags = { $all: tag }, { name: 1, tags: 1 }
           

        }

        console.log('filtro total: ', filtro);
        console.log(JSON.stringify(filtro))


        
        if (precio !== undefined) { // si los dos vienen informados, pasamos select completa

            let precioSplit = req.query.precio.split('-');
            console.log('Preciosplit: ', precioSplit);
            console.log('precioSplit[0] ', precioSplit[0]);
            console.log('precioSplit[1] ', precioSplit[1]);
            console.log('precioSplit[1] ', typeof(precioSplit[1]));

            
            if (precioSplit[0] == '') {
                console.log('entra en el 1');

                filtro.precio = { $gte: parseInt(precioSplit[1]) }

            } else if (precioSplit[1] == '') {
                console.log('entra en el 2');

                filtro.precio = { $lte: parseInt(precioSplit[0]) }

               
            } else {
                console.log('entra en el 3');
              
                filtro.precio = { $gte: parseInt(precioSplit[0]), $lte: parseInt(precioSplit[1]) }

            }




            
            // si alguno de los dos no viene informado solo informamos select
        //    if (preciomax === undefined) {
        //        filtro.precio = { $gte: parseInt(preciomin) };
        //    };

        //    if (preciomin === undefined) {
        ////        filtro.precio = { $lte: parseInt(preciomax) };
//};

    //        console.log(" Entra por aqui preciomax:", preciomax, "preciomin:", preciomin);
            // filtro.precio = { $gte: parseInt(preciomin), $lte: parseInt(preciomax) }

        }


        console.log(filtro);
        const docs = await Anuncio.lista(filtro, limit, skip, sort, fields);
        
        
        
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
router.post('/',
 check('nombre').isString(),
 check('venta').isBoolean(),
 check('precio').isNumeric(),
 check('foto').isString(),
async (req, res, next) => {
    try {
        const errors = validationResult(req);
        let cont = 0;
        const listaTags = ['motor', 'lifestyle', 'mobile', 'work'];
        let encontrado = false;

        console.log(listaTags.length);
        console.log(encontrado)
;
        while (cont < listaTags.length && encontrado === false) {
            console.log(req.body.tags);
            if (listaTags[cont] === req.body.tags) {

                encontrado === true;
            } 
            
            cont ++;

        }

        if (encontrado === false ) {
                const err = new Error('Error tags, used: motor, lifestyle, mobile, work');
                err.status = 422;
                return next(err); // como esta definia la viesta de errores, "enviamos el error" a la vista
        
        }
    

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() }); //Respuesta si fallan las validaciones.
        }
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