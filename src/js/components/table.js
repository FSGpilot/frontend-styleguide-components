var $ = require('jquery');

////////////////////////////////
/////// Selecting rows /////////
////////////////////////////////

function showActionButtons(checkedCount) {
    $('.dt-selected-items-counter-value').text(checkedCount);
    $('.selected-rows-menu').show().css('display', 'flex');;
    $('.default-menu').hide();
};

function hideActionButtons() {
    $('.selected-rows-menu').hide();
    $('.default-menu').show();
};

$('.row-selection-checkbox').on('change', function () {
    var checkedCount = $('.row-selection-checkbox:checked').length;
    if (checkedCount > 0) {
        showActionButtons(checkedCount);
    } else {
        hideActionButtons();
    }
    var row = $(this).closest('tr');//.toggleClass('row-selected');
    if (this.checked) {
        row.addClass('row-selected');
    } else {
        row.removeClass('row-selected');        
    }
});

$('.cancel').on('click', function () {
    $('.row-selection-checkbox:checked').each(function() {
       $(this).prop('checked', false);
       $(this).trigger('change');
    });
});

////////////////////////////////
/////////// Sorting ////////////
////////////////////////////////

$('.table-sort-button').on('click', function() {
    var svg = $(this).find('svg')[0];
    $(svg).toggleClass('svg-rotate');

    $('.table-sort-button').find('svg').hide();
    $(svg).show();

    var index = $(this).parent().index();
    var asc = $(svg).hasClass('svg-rotate');

    sortTable(index,asc);
});

function sortTable(column, asc) {
    var table = $('.dk-table');
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

////////////////////////////////
/////////// Filtering //////////
////////////////////////////////

$('.dt-filter').on('input', function() {
    var rows = $('.dt-table').find('tr').toArray();
    var text = $(this).val();

    // Hide all rows
    rows.slice(1).forEach(function(row) {
        $(row).hide();
    });

    // Show filtered rows
    rows.slice(1).filter(function(row) {
        return $(row).text().includes(text);
    }).forEach(function(row) {
        $(row).show();
    });    
});

////////////////////////////////
////////// Expandable //////////
////////////////////////////////

$('.dt-expand-button').on('click', function() {
    var svg = $(this).find('.dt-expand-button-svg')[0];
    $(svg).toggleClass('dt-svg-rotate90');
    var trRow = $(this).closest('tr').next('.dt-expand-row')
    trRow.toggleClass('dt-hidden');    
});