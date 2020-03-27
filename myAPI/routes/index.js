var express = require('express');
var router = express.Router();
//const {query, validationResult} = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index'); // Variable que le pasamos a la plantilla
  
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



/*pacticar */
router.get('/parametros/:numero', function(req, res, next) {
  console.log(req.params);
  const numero = req.params.numero;

  res.send('otra pagina que he hechook');
  
});


/*practicar */

module.exports = router;
