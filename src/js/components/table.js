var $ = require('jquery');

////////////////////////////////
/////// Selecting rows /////////
////////////////////////////////

function showActionButtons(checkedCount) {
    $('.dt-selected-items-counter-value').text(checkedCount);
    $('.dt-selected-rows-menu').removeClass('dt-hidden');
    $('.dt-default-menu').addClass('dt-hidden');
};

function hideActionButtons() {
    $('.dt-selected-rows-menu').addClass('dt-hidden');
    $('.dt-default-menu').removeClass('dt-hidden');
};

$('.dt-checkbox').on('change', function () {
    var checkedCount = $('.dt-checkbox:checked').length;
    if (checkedCount > 0) {
        showActionButtons(checkedCount);
    } else {
        hideActionButtons();
    }
});

$('.dt-cancel-button').on('click', function () {
    $('.dt-checkbox').prop('checked', false);
    hideActionButtons();
});

////////////////////////////////
/////////// Sorting ////////////
////////////////////////////////

$('.dt-sort-button').on('click', function() {
    var svg = $(this).find('.dt-sort-button-svg')[0];
    $(svg).toggleClass('dt-svg-rotate');

    $('.dt-sort-button-svg').addClass('dt-hidden');
    $(svg).removeClass('dt-hidden');    

    var index = $(this).parent().index();
    var asc = $(svg).hasClass('dt-svg-rotate');

    sortTable(index,asc);
});

function sortTable(column, asc) {
    var table = $('.dt-table');
    var rows = table.find('tr').toArray();
    rows = rows.slice(1).sort(function (a, b) {
        return getCellValue(a, column) > getCellValue(b, column);
    });
    if (!asc) {
        rows = rows.reverse();
    }
    for (var i = 0; i < rows.length; i++) {
        table.append(rows[i])
    }
};

function getCellValue(row, column) {
    return $(row).children('td').eq(column).text();
}

