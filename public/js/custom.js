$(document).ready(function(){
    $('#createRoom').on('click', function (e) {
        e.preventDefault();
        let nameRoom = $('#nameRoom').val();
        let pseudo = $('#pseudoForCreate').val();

        if (nameRoom == '' || pseudo == '') {
            alert('Pour crée une partie il faut rentrer un nom ET un pseudo !')
        } else {
            $('#formCreateRoom').attr('action', 'room/' + nameRoom);
            $('#formCreateRoom').submit();
        }
    });

    $('#joinRoom').on('click', function (e) {
        e.preventDefault();
        let roomToJoin = $('#roomToJoin').val();
        let pseudo = $('#pseudoForJoin').val();

        if (roomToJoin.trim() == '' || pseudo.trim() == '') {
            alert('Pour rejoindre une partie il faut rentrer un nom ET un pseudo !')
        } else {
            $('#formJoinRoom').attr('action', 'room/' + roomToJoin);
            $('#formJoinRoom').submit();
        }
    });

    $('.btn-incremented-counter').on('click', function(e) {
        let childrenInput = $('#' + e.currentTarget.dataset.childrenInput);
        console.log(childrenInput)
        let valueChildren =  parseInt(childrenInput.val());
        childrenInput.val(valueChildren + 1);
    });

    $('.btn-decremented-counter').on('click', function(e) {
        let childrenInput = $('#' + e.currentTarget.dataset.childrenInput);
        let valueChildren =  parseInt(childrenInput.val());
        childrenInput.val(valueChildren - 1);
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