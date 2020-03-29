'use strict';

var express = require('express');
var router = express.Router();

const Anuncio = require('../models/anuncios');
//const {query, validationResult} = require('express-validator/check');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    
    const limit = parseInt(req.query.limit || 10); // si el primero es false, te da el 10
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const fields = req.query.fields;
    const venta = req.query.venta;
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

          filtro.precio = { $lte: parseInt(precioSplit[1]) }

      } else if (precioSplit[1] == '') {
          console.log('entra en el 2');

          filtro.precio = { $gte: parseInt(precioSplit[0]) }

         
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

    const docs = await Anuncio.lista(filtro, limit, skip, sort, fields);
    
    res.locals.anuncios = docs;
    res.render('index');
  } catch (err) {
    next(err);
  }
});

//! Duda ¿Como podemos realizar una validacion de tag ?
/*
console.log('jose---------------------------------------------', router.get)


router.get('/api/anuncios/:tags?'), [
  query('tags').isIn(['work','lifestyle','motor','mobile']).withMessage('tag erroneo, introducir: work, lifestyle, motor, mobile'),
], (req, res, next) => {
  validationResult(req).throw(); //con este metodo directamente valida el resultado y lanza excepcion si hay errores de validacion. 
  console.log(req.query);
  console.log('joorrrrr', JSON.stringify(req.query))
  res.end('ok');
}

 */


module.exports = router;
