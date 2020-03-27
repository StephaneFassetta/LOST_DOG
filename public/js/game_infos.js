socketIo.on('refreshInfosUsersAndGame', function(gameInfos) {
    refreshInfosUsersAndGame(gameInfos.game);
});

$(document).ready(function () {

});

function refreshInfosUsersAndGame(game)
{
    let admin = game.admin;
    let players = game.players;
    let playerLength = game.players.length;
    let gameLimitPlayer = game.size;

    $('#list-people').empty();
    $('#list-people').append('<p class="list-players">' + admin.name + ' (Maître du jeu) <p>');

    Object.keys(players).forEach(function (key) {
        $('#list-people').append('<p class="list-players">' + players[key].name + '<p>');
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