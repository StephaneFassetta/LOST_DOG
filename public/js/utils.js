socketIo.on('refreshInfosUsersAndGame', function(game) {
    refreshInfosUsersAndGame(game.game);
});

$(document).ready(function () {
});

function refreshInfosUsersAndGame(game) {
    let players = game.players;
    let playerLength = game.players.length;
    let gameLimitPlayer = game.size;

    $('#list-people').empty();

    Object.keys(players).forEach(function (key){
        $('#list-people').append('<p style="margin: 5px 5px">' + players[key].name + '<p>');
    });

    $('#limit-user').text(gameLimitPlayer);
    $('#ingame-user').text(playerLength);
}
