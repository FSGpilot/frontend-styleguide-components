var $ = require('jquery');

////////////////////////////////
/////// Selecting rows /////////
////////////////////////////////

function showActionButtons(checkedCount) {
    $('.selected-items-counter-value').text(checkedCount);
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
    $('.row-selection-checkbox:checked').each(function () {
        $(this).prop('checked', false);
        $(this).trigger('change');
    });
});

////////////////////////////////
/////////// Sorting ////////////
////////////////////////////////

$('.table-sort-button').on('click', function () {
    var icon = $(this).find('i')[0];
    $(icon).toggleClass('icon-rotate');

    $('.table-sort-button').find('i').removeAttr('style');
    $(icon).css('visibility','visible');

    var index = $(this).parent().index();
    var asc = $(icon).hasClass('icon-rotate');

    sortTable(index, asc);
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

$('.search').on('input', function () {
    var rows = $('.dk-table').find('tr').toArray();
    var text = $(this).val();

    // Hide all rows
    rows.slice(1).forEach(function (row) {
        $(row).hide();
    });

    // Show filtered rows
    rows.slice(1).filter(function (row) {
        return $(row).text().includes(text);
    }).forEach(function (row) {
        $(row).show();
    });
});

////////////////////////////////
////////// Expandable //////////
////////////////////////////////

$('.expand-button').on('click', function () {
    var trRow = $(this).closest('tr').next('.expandable-row')
    trRow.toggleClass('expanded');
    $(this).toggleClass('expanded')
});

////////////////////////////////
////////// Row height //////////
////////////////////////////////
$('.radiobutton input').on('change', function () {
    var table = $('.dk-table');
    table.removeClass('compact');
    table.removeClass('short');
    table.removeClass('tall');
    switch (this.id) {
        case 'compact':
            table.addClass('compact')
            break;
        case 'short':
            table.addClass('short')
            break;
        case 'default':
            break;
        case 'tall':
            table.addClass('tall')
            break;
    };
});