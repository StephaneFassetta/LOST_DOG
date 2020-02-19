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