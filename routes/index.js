const express = require('express');
const router = express.Router();
const cardsRole = require('../public/js/cards.js');

router.get('/', function(req, res, next) {
    res.render('index', { cardsRole });
});

module.exports = router;
