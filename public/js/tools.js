export function addRoleInChat(name, role)
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

export function addLogInChat(gameInfos)
{
    let event = gameInfos.event;
    let game = gameInfos.game;
    let user = gameInfos.user;

    eval("log_" + event + "(game, user)");
}

export function insertScript(scriptName, type)
{
    let script = document.createElement('script');

    script.setAttribute('type', type);
    script.setAttribute('src', scriptName);
    document.head.appendChild(script);
}

function log_joinGameRoom(game, user)
{
    $('.chat').append('<li class="left clearfix">\n' +
        '                                <div class="chat-body clearfix">\n' +
        '                                    <div class="header">\n' +
        '                                        <strong class="primary-font">'+ user.name +'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time">\n' +
        '                                    </div>\n' +
        '                                    <p>A rejoins la partie ! :D </p>\n' +
        '                                </div>\n' +
        '                            </li>');
}

function log_createGameRoom(game, user)
{
    $('.chat').append('<li class="left clearfix">\n' +
        '                                <div class="chat-body clearfix">\n' +
        '                                    <div class="header">\n' +
        '                                        <strong class="primary-font">'+ user.name +'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time">\n' +
        '                                    </div>\n' +
        '                                    <p>A crée la partie ! Vous êtes le maître du jeu. Invitez des gens en leurs donnant le nom de la room : <br>' + game.name +'</br> </p>\n' +
        '                                </div>\n' +
        '                            </li>');
}

function log_disconnectToGame(game, user)
{
    $('.chat').append('<li class="left clearfix">\n' +
        '                                <div class="chat-body clearfix">\n' +
        '                                    <div class="header">\n' +
        '                                        <strong class="primary-font">'+ user.name +'</strong> <small class="pull-right text-muted"><span class="glyphicon glyphicon-time">\n' +
        '                                    </div>\n' +
        '                                    <p>S\'est déconnecté du jeu !</p>\n' +
        '                                </div>\n' +
        '                            </li>');
}