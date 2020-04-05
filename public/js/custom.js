$(document).ready(function() {
    animateCSS('body', 'fadeIn', 'fast', 0);

    /*
     * EVENEMENT CREE UNE PARTIE
     */
    $('#btnCreateRoom').on('click', function (e) {
        e.preventDefault();
        $('.main-button').hide();
        $('.game-logo').hide();
        $('.create-room-div').show();

        animateCSS('#formCreateRoom', 'fadeIn', 'fast', 0);
    });

    $('#submitCreateRoom').on('click', function (e) {
        let error = false;
        let nameRoom = $('#nameRoom').val().trim();
        let pseudo = $('#pseudoForCreate').val().trim();
        let cardsLength = $('.counter-card').length;
        let atLeastOneCard = false;
        let cardsInGame = {};

        $.ajax({
            type: 'post',
            url: '/ajax/existRoom',
            data: {nameRoom : $('#nameRoom').val().trim()},
            dataType: 'text'
        }).done(function(roomExist) {
            if (roomExist == 'true') {
                $('.game-name-error').text('Une partie avec ce nom existe déjà. Veuillez en choisir un autre.');
                animateCSS('.game-name-error', 'fadeIn', 'fast', 0);
                error = true;
            }

            if (pseudo === '') {
                $('.player-name-error').text('Veuillez rentrer un pseudo.');
                animateCSS('.player-name-error', 'fadeIn', 'fast', 0);
                error = true;
            }

            if (nameRoom === '') {
                $('.game-name-error').text('Veuillez rentrer un nom de partie.');
                animateCSS('.game-name-error', 'fadeIn', 'fast', 0);
                error = true;
            }


            if (!error) {
                for (let i = 1; i <= cardsLength; i++) {
                    let value = parseInt($('#card_' + i).text());

                    if (value > 0) {
                        atLeastOneCard = true;
                    }

                    let id_card = i;
                    cardsInGame[id_card] = value;
                }

                if (atLeastOneCard) {
                    $('<input type="hidden" name="cardsInGame"/>').val(JSON.stringify(cardsInGame)).appendTo('#role-in-game');
                    $('#formCreateRoom').attr('action', 'room/' + nameRoom);
                    $('#formCreateRoom').submit();
                } else {
                    alert('Sélectionner au moins UN rôle !')
                }
            }
        });
    });

    /*
     * EVENEMENT REJOINDRE UNE PARTIE
     */
    $('#btnJoinRoom').on('click', function (e) {
        e.preventDefault();
        $('.main-button').hide();
        $('.game-logo').hide();
        $('.join-room-div').show();
        animateCSS('#formJoinRoom', 'fadeIn', 'fast', 0);
    });

    $('#submitJoinRoom').on('click', function (e) {
        let error = false;
        let roomToJoin = $('#roomToJoin').val().trim();
        let pseudo = $('#pseudoForJoin').val().trim();

        if (roomToJoin == '') {
            $('.player-name-error').text('Veuillez rentrer un pseudo.');
            animateCSS('.player-name-error', 'fadeIn', 'fast', 0);
            error = true;
        }

        if (pseudo == '') {
            $('.game-name-error').text('Veuillez rentrer un nom de partie.');
            animateCSS('.game-name-error', 'fadeIn', 'fast', 0);
            error = true;
        }

        if (!error) {
            $('#formJoinRoom').attr('action', 'room/' + roomToJoin);
            $('#formJoinRoom').submit();
        }
    });

    /*
     * EVENEMENT REGLES DU JEU
     */
    $('#btnShowInfo').on('click', function (e) {
        e.preventDefault();
        $('.main-button').hide();
        $('.game-logo').hide();
        $('.how-to-learn-div').show();
        animateCSS('.settings-div', 'fadeIn', 'fast', 0);
    });

    /*
     * BOUTON + sur carte des rôles
     */
    $('.btn-incremented-counter').on('click', function(e) {
        let childrenInput = $('#' + e.currentTarget.dataset.childrenInput);
        let valueChildren =  parseInt(childrenInput.text());
        childrenInput.text(valueChildren + 1);
    });

    /*
     * BOUTON - sur carte des rôles
     */
    $('.btn-decremented-counter').on('click', function(e) {
        let childrenInput = $('#' + e.currentTarget.dataset.childrenInput);
        let valueChildren =  parseInt(childrenInput.text());

        if (valueChildren != 0) {
            childrenInput.text(valueChildren - 1);
        }
    });

    /*
     * BOUTON RETOUR DANS LES MENUS PRINCIPALES
     */
    $('.back-button').on('click', function(e) {
        $('.join-room-div').hide();
        $('.create-room-div').hide();
        $('.how-to-learn-div').hide();
        $('.main-button').show();
        $('.game-logo').show();
        $('.game-name-error').empty();
        $('.player-name-error').empty();

        animateCSS('.main-button', 'fadeIn', 'fast', 0);
    });

    /*
    * PERMET DE CREE L'EFFET ROTATE SUR LES CARTES EN JEU
    */
    $(document).on('click', '.game-card', function() {
        if ($(this)[0].classList.contains('active')) {
            $(this)[0].classList.remove('active')
        } else {
            $(this)[0].classList.add('active');
        }
    });

    /*
     * PERMET DE METTRE UN EFFET SUR UN ELEMENT (LIBRARIE ANIMATED.CSS)
     */
    function animateCSS(element, animationName, duration, delay) {
        const node = $(element);
        node.addClass('animated  ' + animationName + ((duration != 0) ? ' delay-'+ delay +'s ' : ' ') + duration);

        function handleAnimationEnd() {
            node.removeClass('animated ' + animationName)
            node.off('animationend', handleAnimationEnd)
        }

        node.on('animationend', handleAnimationEnd)
    }

    /*
     * PERMET D'AFFICHER UN TOOLTIP SUR LES CARTES DES ROLES
     */
    $(function () {
        $('.question-mark').tooltip();
    });
});