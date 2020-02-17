var express = require('express');
var router = express.Router();

router.post('/:id', function(req, res, next) {
    let nameRoom = req.params.id;

    if (req.body.newRoom == '1') {
        let pseudo = req.body.pseudoForCreate;
        res.render('room/room', { type: 'create', nameRoom : nameRoom, pseudo : pseudo, status : 'admin'});
    } else {
        let pseudo = req.body.pseudoForJoin;
        res.render('room/room', { type: 'join', nameRoom : nameRoom, pseudo : pseudo, status : 'player'});
    }
});

module.exports = router;
