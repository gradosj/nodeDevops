'use strict';

const express = require('express');
const router = express.Router();

const Anuncio = require('../../models/anuncios');


// esta sera la raiz
router.get('/', (req, res, next) => {
    Anuncio.find().exec((err, docs) => {
        res.json(docs);
    });
});

module.exports = router; // lo exportamos para usarlo en app.js