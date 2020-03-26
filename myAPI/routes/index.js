var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  
});

/*pacticar */
router.get('/parametros/:numero', function(req, res, next) {
  console.log(req.params);
  const numero = req.params.numero;

  res.send('otra pagina que he hechook');
  
});


/*practicar */

module.exports = router;
