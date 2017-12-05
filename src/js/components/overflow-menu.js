var $ = require('jquery');

// Handle hiding and showing overflow menu
$(document).click(function(event) {
    var isMenu = $(event.target).closest('.overflow-menu-options').length > 0;    
    if (!isMenu) {
        $('.overflow-menu-options').removeClass('open');
    }

    var btn = $(event.target).closest('.overflow-menu-btn'); 
    if (btn.length > 0) {
        btn.next('.overflow-menu-options').toggleClass('open');
    }
});