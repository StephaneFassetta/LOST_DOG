import * as tools from './tools.js';

let nameRoom = $('#nameRoom').val();

socketIo.on('launchGame', function() {
    tools.insertScript('/js/in_game.js', 'module');
    showInGameDiv();
});

$(document).ready(function () {
    $('#btn-launch-game').on('click', function(e) {
        startGame(nameRoom);
    });
});

function startGame(nameRoom)
{
    socketIo.emit('startGame', { 'name' : nameRoom });
}

function showInGameDiv()
{
    $('.lobby-div').hide();
    $('.in-game-div').show();
}
