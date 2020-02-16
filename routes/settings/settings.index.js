var express = require('express');
var router = express.Router();

router.get('/story', function(req, res, next) {
    res.render('settings/story');
});

router.get('/roles', function(req, res, next) {
    res.render('settings/roles');
});

module.exports = router;
