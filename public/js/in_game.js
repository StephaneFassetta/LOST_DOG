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
        console.log('Vibrating receive');
        navigator.vibrate(500);
    }
});

socketIo.on('killPlayer', function(game) {
    showAdminCards = false;
    showPlayerKilled(game.lastPlayerKilled);
});

$(document).ready(function () {
    $(document).on('click', '.btn-vibrate', function (e) {
        e.stopPropagation();
        let socketId = $(this)[0].offsetParent.dataset.socketId;
        socketIo.emit('vibratePlayer', {socketId : socketId});
    });

    $(document).on('click', '.btn-death', function (e) {
        e.stopPropagation();
        let socketId = $(this)[0].offsetParent.dataset.socketId;
        socketIo.emit('killPlayer', {nameRoom : nameRoom, socketId : socketId});
    });
});

function showCardForPlayer()
{
    let player = actualGame.players.find((player) => player.name === name);
    $('#role').append(player.role.role);
    showPlayerCard = true;
}

function showCardsForAdmin(players)
{
    $('.admin-cards').empty();

    players.forEach(function (player, index) {
        tools.addCardsForAdmin(player);
    });

    showAdminCards = true
}

function showPlayerKilled(player)
{
    $('#overlay-killed').fadeIn('slow');
    $('#overlay-killed').append(`<p><b>${player.name}</b> est mort.</p><br><p>Son rôle était <b>${player.role.role}</b></p>`);

    setTimeout(function() {
        $('#overlay-killed').fadeOut('slow');
    }, 2000);
}

setInterval(function () {
    socketIo.emit('updateActualGame', { name: nameRoom });
}, 200);