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
    if (navigator.vibrate) {
        navigator.vibrate(500);
    }
});

$(document).ready(function () {
    $(document).on('click', '.btn-vibrate', function (e) {
        e.preventDefault();
        let socketId = $('.div-btn-card')[0].dataset.socketId;
        console.log(socketId);
        socketIo.emit('vibratePlayer', {socketId : socketId});
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
    players.forEach(function (player, index) {
        tools.addCardsForAdmin(player);
    });

    showAdminCards = true
}

setInterval(function () {
    socketIo.emit('updateActualGame', { name: nameRoom });
}, 500);