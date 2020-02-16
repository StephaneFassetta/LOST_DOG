var express = require('express');
var router = express.Router();

router.post('/:id', function(req, res, next) {
    let nameRoom = req.params.id;

    if (req.body.newRoom == '1') {
        res.render('room/room', { type: 'create', nameRoom : nameRoom, role : 'admin'});
    } else {
        let pseudo = req.body.pseudoForJoin;
        res.render('room/room', { type: 'join', nameRoom : nameRoom, pseudo : pseudo, role : 'player'});
    }
});

module.exports = router;
