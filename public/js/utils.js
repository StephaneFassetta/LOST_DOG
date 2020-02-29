socketIo.on('refreshInfosUsersAndGame', function(game) {
    refreshInfosUsersAndGame(game.game);
});

$(document).ready(function () {
    $('#btn-launch-game').on('click', function(e) {
        let nameRoom = $('#nameRoom').val();
        startGame(nameRoom);
        $.getScript("/js/utils.js");
    });
});

function refreshInfosUsersAndGame(game)
{
    let admin = game.admin;
    let players = game.players;
    let playerLength = game.players.length;
    let gameLimitPlayer = game.size;

    $('#list-people').empty();
    $('#list-people').append('<p style="margin: 5px 5px">' + admin.name + ' (Maître du jeu) <p>');

    Object.keys(players).forEach(function (key){
        $('#list-people').append('<p style="margin: 5px 5px">' + players[key].name + '<p>');
    });


    $('#limit-user').text(gameLimitPlayer);
    $('#ingame-user').text(playerLength);

    showButtonLaunchGame(gameLimitPlayer, playerLength);
}

function showButtonLaunchGame(gameLimitPlayer, playerLength)
{
    if (gameLimitPlayer == playerLength) {
        $('#btn-launch-game').show();
    } else {
        $('#btn-launch-game').hide();
    }
}

function startGame(nameRoom)
{
    socketIo.emit('startGame', { 'name' : nameRoom });
}