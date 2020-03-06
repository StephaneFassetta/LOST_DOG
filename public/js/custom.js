$(document).ready(function(){
    $('#createRoom').on('click', function (e) {
        e.preventDefault();
        let nameRoom = $('#nameRoom').val().trim();
        let pseudo = $('#pseudoForCreate').val().trim();

        if (nameRoom == '' || pseudo == '') {
            alert('Pour crée une partie il faut rentrer un nom ET un pseudo !')
        } else {
            let cardsLength = $('.counter_card').length;
            let atLeastOneCard = false;
            let cardsInGame = {};

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

    $('#joinRoom').on('click', function (e) {
        e.preventDefault();
        let roomToJoin = $('#roomToJoin').val().trim();
        let pseudo = $('#pseudoForJoin').val().trim();

        if (roomToJoin == '' || pseudo == '') {
            alert('Pour rejoindre une partie il faut rentrer un nom ET un pseudo !')
        } else {
            $('#formJoinRoom').attr('action', 'room/' + roomToJoin);
            $('#formJoinRoom').submit();
        }
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

    $(function(){
        let page = window.location.pathname;

        if(!page) {
            page = '/';
        }

        $('.navbar-nav li a').each(function(){
            let href = $(this).attr('href');

            if ((href == page) || (href == '')) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    });

    $(function () {
        $('[data-toggle="popover"]').popover()
    })
});