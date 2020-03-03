var express = require('express');
var router = express.Router();

router.get('/story', function(req, res, next) {
    res.render('settings/story');
});

router.get('/deroulement', function(req, res, next) {
    res.render('settings/deroulement');
});

module.exports = router;
