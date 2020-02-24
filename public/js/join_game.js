import Player from '/classes/Player.js';

$(document).ready(function () {
    const pseudo = $('#pseudo').val();
    const isAdmin = $('#admin').val();
    const nameRoom = $('#nameRoom').val();
    const player = new Player(pseudo, null, socketIo.id, isAdmin);

    console.log('Ready for join game...');
    joinGame(player, nameRoom);
});

function joinGame(playerInfos, nameRoom)
{
    socketIo.emit('joinGameRoom', { 'player' : playerInfos, 'name' : nameRoom });
}