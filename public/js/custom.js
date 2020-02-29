$(document).ready(function(){
    $('#createRoom').on('click', function (e) {
        e.preventDefault();
        let nameRoom = $('#nameRoom').val().trim();
        let pseudo = $('#pseudoForCreate').val().trim();

        if (nameRoom == '' || pseudo == '') {
            alert('Pour crée une partie il faut rentrer un nom ET un pseudo !')
        } else {
            let cardsLength = $('.counter_card').length;
            let cardsInGame = {};

            for (let i = 1; i <= cardsLength; i++) {
                let value = $('#card_' + i).val();
                let id_card = i;
                cardsInGame[id_card] = value;
            }

            $('<input type="hidden" name="cardsInGame"/>').val(JSON.stringify(cardsInGame)).appendTo('#role-in-game');
            $('#formCreateRoom').attr('action', 'room/' + nameRoom);
            $('#formCreateRoom').submit();
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
        let valueChildren =  parseInt(childrenInput.val());
        childrenInput.val(valueChildren + 1);
    });

    $('.btn-decremented-counter').on('click', function(e) {
        let childrenInput = $('#' + e.currentTarget.dataset.childrenInput);
        let valueChildren =  parseInt(childrenInput.val());

        if (valueChildren != 0) {
            childrenInput.val(valueChildren - 1);
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
});