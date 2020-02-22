var express = require('express');
var router = express.Router();

router.post('/:id', function(req, res, next) {
    let nameRoom = req.params.id;
    let pseudo = req.body.pseudo;
    let maxPlayerLimit = (req.body.maxPlayerLimit == '') ? 10 : req.body.maxPlayerLimit;
    let admin = 0;
    let hasBeenCreate = 0;

    if (req.body.newRoom == '1') {
        admin = 1;
        hasBeenCreate = 1;
    } else {
        admin = 0;
        hasBeenCreate = 0;
    }

    res.render('room/room', { nameRoom : nameRoom, pseudo : pseudo, admin : admin, hasBeenCreate: hasBeenCreate, maxPlayerLimit: maxPlayerLimit });

});

module.exports = router;
