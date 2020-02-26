import Player from '/classes/Player.js';
import GameRoom from '/classes/GameRoom.js';
import Card from "/classes/Card.js";
import * as ListCards from './cards.js';

$(document).ready(function () {
    const pseudo = $('#pseudo').val();
    const isAdmin = $('#admin').val();
    const nameRoom = $('#nameRoom').val();
    const hasBeenCreate = $('#hasBeenCreate').val();
    const maxPlayerLimit = $('#maxPlayerLimit').val();
    const cardsInGame = JSON.parse(unescape($('#cardsInGame')[0].dataset.value));


    const gameRoomInfos = {'nameRoom' : nameRoom, 'hasBeenCreate' : hasBeenCreate, 'maxPlayerLimit' : maxPlayerLimit, 'cardsInGame' : cardsInGame};
    const player = new Player(pseudo, null, socketIo.id, isAdmin);
    console.log('Ready for create game...');
    createGameRoom(player, gameRoomInfos);
});


function createGameRoom(playerInfos, gameRoomInfos)
{
    const gameRoom = new GameRoom(gameRoomInfos.nameRoom, gameRoomInfos.maxPlayerLimit);

    // TODO : Cree les cartes en fonction du choix dans le menu


    for (let i; i < gameRoomInfos.cardsInGame.length; i++) {
        for (let x; x < gameRoomInfos.cardsInGame[i].length; x++) {
            console.log(gameRoomInfos.cardsInGame[i]);
        }
    }

    socketIo.emit('createGameRoom', gameRoom, function () {
        socketIo.emit('joinGameRoom', { 'player' : playerInfos, 'name' : gameRoomInfos.nameRoom });
    });
}