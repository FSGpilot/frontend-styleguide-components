var $ = require('jquery');

$('.overflow-menu-btn').on('click', function () {
    $(this).next('.overflow-menu-options').toggleClass('overflow-menu-options-open');
});

$('.overflow-menu-btn').on('blur', function () {
    $(this).next('.overflow-menu-options').removeClass('overflow-menu-options-open');        
});

// Prevent button from losing focus when clicking option button
$('.overflow-menu-options-btn').on('mousedown', function (event) {
    event.preventDefault();
});

// Fire losing button focus after clicking option button
$('.overflow-menu-options-btn').on('mouseup', function () {
    $('.overflow-menu-btn').blur();        
});

$('.overflow-menu-options-btn').on('click', function () {
    console.log($(this).text() + ' clicked');  
});