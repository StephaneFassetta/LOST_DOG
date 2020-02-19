import { Game } from './../../classes/Game.js'

$('#btn-chat').on('click', (e) => {
    socketIo.emit('sendMessage', { nameRoom : '{{ nameRoom }}', pseudo : '{{ pseudo }}', message : $('#btn-input').val()});
    $('#btn-input').val('');
});

socketIo.on('joinRoom', function (data)
{
    if (data.hasBeenCreate) {
        addEventInChat(data.player.name, 'Vient de crée la partie !');
    } else {
        addEventInChat(data.player.name, 'Vient de rejoindre la partie !');
    }

    $('#list-people').empty();
});

socketIo.on('sendMessage', function (data) {
    $('.chat').append('<li class="right clearfix">\n' +
        '<div class="chat-body clearfix">\n' +
        '<div class="header">\n' +
        '<strong class="primary-font">'+ data.pseudo +'</strong>\n' +
        '</div>\n' +
        '<p>' + data.message + '</p>\n' +
        '</div>\n' +
        '</li>'
    );
});

socketIo.on('refreshPlayersList', function (data) {
    refreshPlayersList(data.players);
});

function addMessageInChat(pseudo, message) {
    $('.chat').append('<li class="right clearfix">\n' +
        '<div class="chat-body clearfix">\n' +
        '<div class="header">\n' +
        '<strong class="primary-font">'+ pseudo +'</strong>\n' +
        '</div>\n' +
        '<p>' + message + '</p>\n' +
        '</div>\n' +
        '</li>'
    );
}

function addEventInChat(pseudo, message) {
    $('.chat').append('<li class="right clearfix">\n' +
        '<div class="chat-body clearfix">\n' +
        '<div class="header">\n' +
        '</div>\n' +
        '<p><b>' + pseudo +' : '+ message + '<b></p>\n' +
        '</div>\n' +
        '</li>'
    );
}

function refreshPlayersList(players) {
    players.forEach(function(player) {
        $('#list-people').append('<p style="margin: 5px 5px">' + player.name + '('+ player.role +')<p>');
    })
}

function joinRoom(playerProfil, roomProfil) {

    if (roomProfil.hasBeenCreate == '1') {
        const game = new Game(roomProfil.nameRoom);

        socketIo.emit('newGame', {game : game, gameInfos: roomProfil }, () => {
            socketIo.emit('joinRoom', { playerInfos : playerProfil, gameInfos: roomProfil });
        });
    } else {
        socketIo.emit('joinRoom', { playerInfos : playerProfil, gameInfos: roomProfil });
    }

}