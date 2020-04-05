export function addCardsForAdmin(player)
{
    $('.admin-cards').append(`<div class="container-card inactive">
        <div class="game-card">
            <div class="side front"> 
                <div class="img img3"></div>
                    <div class="info">
                        <h2>${player.name}</h2>
                        <p id="icon-status">${(player.alive ? '<i class="fas fa-heart" style="color: #ff4d4d;"></i>' : '<i class="fas fa-skull-crossbones" style="color: #000000;"></i>')}</p>
                        <p class="card-instruction">Cliquez sur la carte pour découvrir votre rôle. Ne le montrez à personne !</p>
                    </div>
                </div>
                <div class="side back">
                    <div class="info">
                        <h2 id="role">${player.role.role}</h2> 
                        <ul>
                            <li></li>
                            <li></li>
                        </ul>
                        <div class="div-btn-card" data-socket-id="${player.socketId}" ${(!player.alive ? 'disabled' : '')}>
                            <div class="btn-vibrate">
                                <button type="button" class="btn btn-warning">Faire vibrer</button>
                            </div>
                            <div class="btn-death">
                                <button type="button" class="btn btn-danger">Faire mourir</button>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>`);
}

export function insertScript(scriptName, type)
{
    let script = document.createElement('script');

    script.setAttribute('type', type);
    script.setAttribute('src', scriptName);
    document.head.appendChild(script);
}