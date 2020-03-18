import * as tools from './tools.js';

var actualGame = null;
var showPlayerCard = null;
var showAdminCards = null;
var name = $('#pseudo').val();
var isAdmin = parseInt($('#admin').val());
var nameRoom = $('#nameRoom').val();

socketIo.on('retrieveActualGame', function(game) {
    actualGame = game;

    if (showPlayerCard != true && isAdmin == 0) {
        showCardForPlayer();
    }

    if (showAdminCards != true && isAdmin == 1) {
        showCardsForAdmin(game.players);
    }
});

socketIo.on('vibratePlayer', function() {
    console.log('vibrate receive')
});

$(document).ready(function () {
    $(document).on('click', '.btn-vibrate', function () {
        // TODO : Recuperer le pseudo du joueur, recuperer son socket id et emettre levenement
        let pseudo = $('.info h2').text();

        socketIo.to(`${player.socketId}`).emit('vibratePlayer', {game : actualGame, pseudo : pseudo});
    });
});

function showCardForPlayer()
{
    let player = actualGame.players.find((player) => player.name === name);
    $('#role').append(player.role.role);
    showPlayerCard = true
}

function getPlayerByPseudo(pseudo)
{
    let player = actualGame.players.find((player) => player.name === pseudo);
    return player;
}

function showCardsForAdmin(players)
{
    players.forEach(function (element, index) {
        tools.addCardsForAdmin(element.name, element.role.role, element.status);
    });

    showAdminCards = true
}

setInterval(function () {
    socketIo.emit('updateActualGame', { name: nameRoom });
}, 500);