let actualGame = null;
let showCard = null;
let name = $('#pseudo').val();

socketIo.on('retrieveActualGame', function(game) {
    actualGame = game;

    if (showCard != true) {
        game.players.forEach(function (element, index) {
            console.log(element);
            if (element.name == name) {
                $('#role').append(element.role.role);
                showCard = true
            }
        });
    }
});


$(document).ready(function () {

});

setInterval(function () {
    let nameRoom = $('#nameRoom').val();
    socketIo.emit('updateActualGame', { name: nameRoom });
}, 200);
