var $ = require('jquery');

$('.overflow-menu-btn').on('click', function () {
    $('.overflow-menu-options').addClass('overflow-menu-options-open');
});

$('.overflow-menu-btn').on('blur', function () {
    $('.overflow-menu-options').removeClass('overflow-menu-options-open');
});

// onclick doesnt work because onblur is fired first
$('.overflow-menu-options-btn').on('mousedown', function () {
    console.log($(this).text() + ' clicked');
});

