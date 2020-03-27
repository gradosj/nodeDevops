var express = require('express');
var router = express.Router();

const Anuncio = require('../models/anuncios');
//const {query, validationResult} = require('express-validator/check');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {

    let nombre = req.query.nombre;

    // Variable que le pasamos a la plantilla
    const filtro = {};

    if (typeof nombre !== 'undefined') {
      filtro.nombre = new RegExp('^' + nombre, 'i');

      //filtro.nombre = nombre;
    }
    const docs = await Anuncio.lista(filtro);
    
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
