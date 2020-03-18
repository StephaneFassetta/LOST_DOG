$(document).ready(function() {
    animateCSS('body', 'fadeIn', 'fast', 0);

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

        if(pseudo == '') {
            $('.player-name-error').text('Veuillez rentrer un pseudo.');
            animateCSS('.player-name-error', 'fadeIn', 'fast', 0);
            error = true;
        }

        if (nameRoom == '') {
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

    $('#btnShowInfo').on('click', function (e) {
        e.preventDefault();
        $('.main-button').hide();
        $('.game-logo').hide();
        $('.settings-div').show();
        animateCSS('.settings-div', 'fadeIn', 'fast', 0);
    });

    $('.btn-incremented-counter').on('click', function(e) {
        let childrenInput = $('#' + e.currentTarget.dataset.childrenInput);
        let valueChildren =  parseInt(childrenInput.text());
        childrenInput.text(valueChildren + 1);
    });

    $('.btn-decremented-counter').on('click', function(e) {
        let childrenInput = $('#' + e.currentTarget.dataset.childrenInput);
        let valueChildren =  parseInt(childrenInput.text());

        if (valueChildren != 0) {
            childrenInput.text(valueChildren - 1);
        }
    });

    $('.back-button').on('click', function(e) {
        $('.join-room-div').hide();
        $('.create-room-div').hide();
        $('.main-button').show();
        $('.game-logo').show();
        $('.game-name-error').empty();
        $('.player-name-error').empty();

        animateCSS('.main-button', 'fadeIn', 'fast', 0);
    });

    function animateCSS(element, animationName, duration, delay) {
        const node = $(element);
        node.addClass('animated  ' + animationName + ((duration != 0) ? ' delay-'+ delay +'s ' : ' ') + duration);

        function handleAnimationEnd() {
            node.removeClass('animated ' + animationName)
            node.off('animationend', handleAnimationEnd)
        }

        node.on('animationend', handleAnimationEnd)
    }

    $(function () {
        $('.question-mark').tooltip();
    });

    $(document).on('click', '.game-card', function() {
        if ($(this)[0].classList.contains('active')) {
            $(this)[0].classList.remove('active')
        } else {
            $(this)[0].classList.add('active');
        }
    });
});