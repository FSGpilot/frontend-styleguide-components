'use strict';
const forEach = require('array-foreach');
const $  = require( 'jquery' );
window.$ = $;
const dt = require( 'datatables.net' )( window, $ );
const dt_select =require( 'datatables.net-select' )( window, $ );
const dt_edit = require( './datatables-editable' );

const jsSelectorDatatable_Example_basic = "#js-datatable-example-basic";
const jsSelectorDatatable_Example_extra_pagination = "#js-datatable-example-extra_pagination";
const jsSelectorDatatable_Example_ajax = "#js-datatable-example-ajax";
const jsSelectorDatatable_Example_detailsrow = "#js-datatable-example-detailsrow";
const jsSelectorDatatable_Example_selectable = "#js-datatable-example-selectable";
const jsSelectorDatatable_Example_rowedit = "#js-datatable-example-rowedit";

class datatablesExamples {
  constructor(el){

    //NOTE: you only need to externally include the javascript. A theme is shipped with DKWDS.
     
    //////////////////////////////////////
    //Init a datatable with no configuration
    //////////////////////////////////////
    var table_basic = $(jsSelectorDatatable_Example_basic).DataTable();

    
    //////////////////////////////////////
    //Init a datatable with ajax data
    //////////////////////////////////////
    var table_ajax = $(jsSelectorDatatable_Example_ajax).DataTable({
        "processing": true,
        "ajax": {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        "columns": [
            { "data": "name" },
            { "data": "email" },
            { "data": "address.street" },
            { "data": "address.city" },
            { "data": "phone" },
            { "data": "company.name" }
        ]
    } );

    //////////////////////////////////////
    //Init a datatable with full pagination settings and language settings
    //////////////////////////////////////    
    var table_extra_pagination = $(jsSelectorDatatable_Example_extra_pagination).DataTable({
            "pagingType": "full_numbers",
            "language": {
                "lengthMenu": "Viser _MENU_ elementer pr side",
                "zeroRecords": "Der blev fundet intet resultat",
                "info": "Viser sider _PAGE_ af _PAGES_",
                "infoEmpty": "Intet resultat",
                "infoFiltered": "(filtreret fra _MAX_ elementer)",
                "emptyTable": "Ingen data",
                "search": "Søg:",
                "paginate": {
                    "first":      "Første",
                    "last":       "Sidste",
                    "next":       "Næste",
                    "previous":   "Forrige"
                },
            }
        }
    );

    //////////////////////////////////////
    //Init a datatable with selectable rows
    //////////////////////////////////////
    var table_selectable = $(jsSelectorDatatable_Example_selectable).DataTable({
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        select: {
            style:    'single',
            selector: 'td:first-child'
        },
        order: [[ 1, 'asc' ]]
    });

    //////////////////////////////////////
    //Init a datatable with expand row
    //////////////////////////////////////
  
    // Formatting function for row details - modify as you need 
    function format ( d ) {
        // `d` is the original data object for the row
        return '<table>'+
            '<tr>'+
                '<td>Full name:</td>'+
                '<td>'+d.name+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Email:</td>'+
                '<td>'+d.email+'</td>'+
            '</tr>'+
            '<tr>'+
                '<td>Extra info:</td>'+
                '<td>And any further details here (images etc)...</td>'+
            '</tr>'+
        '</table>';
    }
    

    var table_detailsrow = $(jsSelectorDatatable_Example_detailsrow).DataTable( {
        "ajax": {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "email" },
            { "data": "address.street" },
            { "data": "address.city" },
            { "data": "phone" },
            { "data": "company.name" }
        ],
        "order": [[1, 'asc']]
    } );
    
    // Add event listener for opening and closing details
    $(jsSelectorDatatable_Example_detailsrow).on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table_detailsrow.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

    
    
    /*function myCallbackFunction (updatedCell, updatedRow, oldValue) {
      console.log("The new value for the cell is: " + updatedCell.data());
      console.log("The values for each cell in that row are: " + updatedRow.data());
    }

    table.MakeCellsEditable({
        "onUpdate": myCallbackFunction
    });*/
    

  }
}


module.exports = datatablesExamples;