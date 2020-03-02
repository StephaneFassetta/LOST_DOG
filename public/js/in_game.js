let actualGame = null;
let showPlayerCard = null;
let showAdminCards = null;
let name = $('#pseudo').val();
let isAdmin = parseInt($('#admin').val());
let nameRoom = $('#nameRoom').val();

socketIo.on('retrieveActualGame', function(game) {
    actualGame = game;

    if (showPlayerCard != true && isAdmin == 0) {
        showCardForPlayer(game.players);
    }

    if (showAdminCards != true && isAdmin == 1) {
        showCardsForAdmin(game.players);
    }
});

$(document).ready(function () {

});

function showCardForPlayer(players)
{
    players.forEach(function (element, index) {
        if (element.name == name) {
            $('#role').append(element.role.role);
            showPlayerCard = true
        }
    });
}

function showCardsForAdmin(players)
{
    players.forEach(function (element, index) {
        addRoleInChat(element.name, element.role.role);
    });

    showAdminCards = true
}

function addRoleInChat(name, role)
{
    $('.chat').append('<li class="left clearfix">\n' +
        '                                <div class="chat-body clearfix">\n' +
        '                                    <div class="header">\n' +
        '                                        <strong class="primary-font">'+ name +'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time">\n' +
        '                                    </div>\n' +
        '                                    <p>Son role : ' + role + '</p>\n' +
        '                                </div>\n' +
        '                            </li>')
}

setInterval(function () {
    socketIo.emit('updateActualGame', { name: nameRoom });
}, 500);