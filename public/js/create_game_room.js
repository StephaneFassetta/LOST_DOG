import Player from '/classes/Player.js';
import GameRoom from '/classes/GameRoom.js';

$(document).ready(function () {
    const pseudo = $('#pseudo').val();
    const isAdmin = $('#admin').val();
    const nameRoom = $('#nameRoom').val();
    const hasBeenCreate = $('#hasBeenCreate').val();
    const maxPlayerLimit = $('#maxPlayerLimit').val();

    const gameRoomInfos = {'nameRoom' : nameRoom, 'hasBeenCreate' : hasBeenCreate, 'maxPlayerLimit' : maxPlayerLimit};
    const player = new Player(pseudo, null, socketIo.id, isAdmin);
    console.log('Ready for create game...');
    createGameRoom(player, gameRoomInfos);
});


function createGameRoom(playerInfos, gameRoomInfos)
{
    const gameRoom = new GameRoom(gameRoomInfos.nameRoom, gameRoomInfos.maxPlayerLimit);
    socketIo.emit('createGameRoom', gameRoom, function () {
        socketIo.emit('joinGameRoom', { 'player' : playerInfos, 'name' : gameRoomInfos.nameRoom });
    });
}