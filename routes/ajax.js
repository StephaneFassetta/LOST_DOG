var express = require('express');
var router = express.Router();

router.post('/existRoom', function(req, res, next) {
    let existingRooms = req.roomsActive;
    let nameRoom = req.body.nameRoom.toLowerCase();
    let games = Object.keys(existingRooms);

    if (games.includes(nameRoom)) {
        return res.send(true);
    } else {
        return res.send(false);
    }
});

module.exports = router;
