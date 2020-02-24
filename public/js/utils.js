socketIo.on('refreshInfosUsersAndGame', function(game) {
    refreshInfosUsersAndGame(game.game);
});

$(document).ready(function () {
    $('#btn-launch-game').on('click', function(e) {
        let nameRoom = $('#nameRoom').val();
        startGame(nameRoom);
    });
});

function refreshInfosUsersAndGame(game)
{
    let players = game.players;
    let playerLength = game.players.length;
    let gameLimitPlayer = game.size;

    $('#list-people').empty();

    Object.keys(players).forEach(function (key){
        let isAdmin = (players[key].isAdmin == 1) ? ' (Maître du jeu)' : '';
        $('#list-people').append('<p style="margin: 5px 5px">' + players[key].name + isAdmin + '<p>');
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