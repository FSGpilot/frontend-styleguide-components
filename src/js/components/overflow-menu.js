var $ = require('jquery');

// Handle hiding and showing overflow menu
$(document).click(function(event) {
    var menu = $(event.target).closest('.overflow-menu');    
    if (menu.length == 0) {
        $('.overflow-menu').removeClass('open');
    }

    var btn = $(event.target).closest('.overflow-menu-btn'); 
    if (btn.length > 0) {
        $('.overflow-menu').not(menu).removeClass('open');
        btn.closest('.overflow-menu').toggleClass('open');
    }
});