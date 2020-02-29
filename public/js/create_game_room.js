import GameRoom from '/classes/GameRoom.js';
import Card from "/classes/Card.js";
import Admin from '/classes/Admin.js';
import * as ListCards from './cards.js';

$(document).ready(function () {
    const pseudo = $('#pseudo').val();
    const isAdmin = $('#admin').val();
    const nameRoom = $('#nameRoom').val();
    const hasBeenCreate = $('#hasBeenCreate').val();
    const maxPlayerLimit = $('#maxPlayerLimit').val();
    const cardsInGame = JSON.parse(unescape($('#cardsInGame')[0].dataset.value));

    const gameRoomInfos = {'nameRoom' : nameRoom, 'hasBeenCreate' : hasBeenCreate, 'maxPlayerLimit' : maxPlayerLimit, 'cardsInGame' : cardsInGame};
    const admin = new Admin(pseudo,  socketIo.id);
    console.log('Ready for create game...');
    createGameRoom(admin, gameRoomInfos);
});


function createGameRoom(adminInfos, gameRoomInfos)
{
    const gameRoom = new GameRoom(gameRoomInfos.nameRoom, maxPlayerLimit(gameRoomInfos.cardsInGame), adminInfos);

    createCards(gameRoomInfos, gameRoom);

    socketIo.emit('createGameRoom', gameRoom);
}

function maxPlayerLimit(cardsInGame)
{
    let numberTotal = 0;

    for (const number in cardsInGame) {
        numberTotal = numberTotal + parseInt(cardsInGame[number]);
    }

    return numberTotal;
}

function createCards(gameRoomInfos, gameRoom) {
    const totalCard = Object.getOwnPropertyNames(gameRoomInfos.cardsInGame).length;

    for (let i = 1; i <= totalCard; i++) {
        for (let x = 0; x < gameRoomInfos.cardsInGame[i]; x++) {
            gameRoom.cards.push(new Card(i, ListCards.default[i - 1].role, ListCards.default[i - 1].description));
        }
    }
}
