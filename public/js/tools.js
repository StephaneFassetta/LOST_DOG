export function addCardsForAdmin(name, role, status)
{
    let icon;

    if (status != 'alive') {
        icon = '<i class="fas fa-heart"></i>';
    } else {
        icon = '<i class="fas fa-skull-crossbones"></i>';
    }

    $('.container-game-card').append(`<div class="container-card inactive">
                                        <div class="game-card">
                                            <div class="side front"> 
                                                <div class="img img3"></div>
                                                    <div class="info">
                                                        <h2>${name}</h2>
                                                        <p>Cliquez sur la carte pour découvrir votre rôle. Ne le montrez à personne !</p>
                                                    </div>
                                                </div>
                                                <div class="side back">
                                                    <div class="info">
                                                        <h2 id="role">${role}</h2> 
                                                        <ul>
                                                            <li></li>
                                                            <li></li>
                                                        </ul>
                                                        <div class="btn">
                                                            <h6>Faire vibrer le joueur</h6>
                                                        </div>
                                                        <div class="btn">
                                                            <p>${icon}</p>
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