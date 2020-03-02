let nameRoom = $('#nameRoom').val();

socketIo.on('launchGame', function() {
    insertScript('/js/in_game.js', 'module');
});


$(document).ready(function () {
    $('#btn-launch-game').on('click', function(e) {
        startGame(nameRoom);
    });
});

function startGame(nameRoom)
{
    socketIo.emit('startGame', { 'name' : nameRoom });
}

function insertScript(scriptName, type)
{
    let script = document.createElement('script');

    script.setAttribute('type', type);
    script.setAttribute('src', scriptName);
    document.head.appendChild(script);
}
