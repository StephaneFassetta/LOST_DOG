var express = require('express');
var router = express.Router();

router.post('/:id', function(req, res, next) {
    let nameRoom = req.params.id;
    let pseudo = '';
    let admin = 0;
    let hasBeenCreate = 0;

    if (req.body.newRoom == '1') {
        pseudo = req.body.pseudoForCreate;
        admin = 1;
        hasBeenCreate = 1;
    } else {
        pseudo = req.body.pseudoForJoin;
        admin = 0;
        hasBeenCreate = 0;
    }

    res.render('room/room', { nameRoom : nameRoom, pseudo : pseudo, admin : admin, hasBeenCreate: hasBeenCreate });

});

module.exports = router;
