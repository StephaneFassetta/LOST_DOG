export function addCardsForAdmin(name, role)
{
    $('.container-game-card').append('' +
        '<div class="game-card"><div class="card-game-front">' +  name +
        '</div> ' +
        '<div class="card-game-back"> <div class="role-card"> <p id="role">'+ role +'</p> ' +
        '</div> <div class="order-card"> <p></p>' +
        '</div><div class="power-card"><p></p>' +
        '</div>' +
        '</div>' +
        '</div>');
}

export function insertScript(scriptName, type)
{
    let script = document.createElement('script');

    script.setAttribute('type', type);
    script.setAttribute('src', scriptName);
    document.head.appendChild(script);
}