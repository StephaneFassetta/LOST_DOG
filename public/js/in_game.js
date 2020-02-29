let actualGame = null;

socketIo.on('retrieveActualGame', function(game) {
    actualGame = game;
});


$(document).ready(function () {
    $('#role').append(actualGame.players[0].role);
});

// setInterval(function () {
//     let nameRoom = $('#nameRoom').val();
//     socketIo.emit('updateActualGame', { name: nameRoom });
// }, 200);
