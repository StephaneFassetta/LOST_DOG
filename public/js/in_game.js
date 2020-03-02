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

$(document).ready(function () {

});

function showCardForPlayer()
{
    let player = actualGame.players.find((player) => player.name === name);
    $('#role').append(player.role.role);
    showPlayerCard = true
}

function showCardsForAdmin(players)
{
    players.forEach(function (element, index) {
        tools.addRoleInChat(element.name, element.role.role);
    });

    showAdminCards = true
}

setInterval(function () {
    socketIo.emit('updateActualGame', { name: nameRoom });
}, 500);