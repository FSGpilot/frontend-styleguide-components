'use strict';
const forEach = require('array-foreach');
const $  = require( 'jquery' );
window.$ = $;
const microModal = require("../../vendor/micromodal.js");
const dt = require( 'datatables.net' )( window, $ );
const dt_select =require( 'datatables.net-select' )( window, $ );

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
        "language": {
            "search": "Søg i tabel:",
            "Sort": true
        },

        "dom": '<"toolbar">frtip',  

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

    //$("div.toolbar").append('<b>Custom tool bar! Text/images etc.</b>');
    //////////////////////////////////////
    //Init a datatable with expand row
    //////////////////////////////////////

    // Formatting function for row details - modify as you need
    function format ( d ) {
        // `d` is the original data object for the row
        return '<div class="details-row-content">'+
          // '<table>'+
          //     '<tr>'+
          //         '<td>Full name:</td>'+
          //         '<td>'+d.name+'</td>'+
          //     '</tr>'+
          //     '<tr>'+
          //         '<td>Email:</td>'+
          //         '<td>'+d.email+'</td>'+
          //     '</tr>'+
          //     '<tr>'+
          //         '<td>Extra info:</td>'+
          //         '<td>And any further details here (images etc)...</td>'+
          //     '</tr>'+
          // '</table>'+
          '<div class="dataset row">'+
            '<div class="col-5">'+
              '<h3>Headline</h3>' +
              '<p>sdflkjsdflkj sdfs sd sdfsdflkjsd f lkjsdf sdflk lkjsdf lkjsdflkjsdflksdflk <a href="#">SDJSDKSDLKJH</a></p>'+
            '</div>'+
            '<div class="col-6">'+
              '<div class="chart">' +
                '<img src="https://ramen-files.s3.amazonaws.com/charturl-images/2017-01-26/9b64e497-3a7a-40c8-b7c7-322f84f84ba9.png"></div>' +
              '</div>'+
            '</div>' +
        '</div>';
    }


    var table_detailsrow = $(jsSelectorDatatable_Example_detailsrow).DataTable( {

        "ajax": {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        "rowId": "id",
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
            { "data": "company.name" },
                {
                "targets": -1,
                "data": null,
                "render": function ( data, type, full, meta ) {
                    var overflowID = "overflow-table-"+full.id;
                    return  `<div class="overflow-menu overflow-menu--open-left">
                                <button class="button-overflow-menu js-dropdown" data-js-target="#`+ overflowID +`" aria-haspopup="true" aria-expanded="false">
                                    <svg class="icon-svg"><use xlink:href="#dots-vertical"></use></svg>
                                </button>
                                <div class="overflow-menu-inner" id="`+ overflowID +`" aria-hidden="true">
                                    <ul class="overflow-list">
                                        <li><button class="js-edit-modal-trigger">Rediger</button></li>
                                        <li><button class="js-delete-modal-trigger danger-delete">Slet</button></li>
                                    </ul>
                                </div>
                            </div>`
                }
            }
        ],
        "order": [[1, 'asc']]
    } );

    //"defaultContent": "<i class='dots-vertical selected'></i><div class='dots-vertical-content'><span class='triangle'></span><ul><li class='editrow'>Edit</li><li>Item</li><li class='selected'>Selected item</li><li class='deleterow'>Delete</li></ul></div>"

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

    var currentEditTr = null

    //Open edit modal
    $(jsSelectorDatatable_Example_detailsrow).on('click', '.js-edit-modal-trigger', function () {

        //get data from row
        currentEditTr = $(this).closest('tr');
        var data = table_detailsrow.row(currentEditTr).data();
        var id = table_detailsrow.row(currentEditTr).id()

        //insert data in modal
        $('#edit-row-id').val(id);
        $('#edit-navn').val(data.name);
        $('#edit-email').val(data.email);
        $('#edit-vejnavn').val(data.address.street);
        $('#edit-by').val(data.address.city);
        $('#edit-telefon').val(data.phone);
        $('#edit-firmanavn').val(data.company.name);

        //open modal
         microModal.show('modal-edit');
    });

    //Update edit row
    $('body').on('click', '.js-edit-save-trigger', function () {

        //get row data
        var data = table_detailsrow.row(currentEditTr).data();

        //update  data
        data.name = $('#edit-navn').val();
        data.email = $('#edit-email').val();
        data.address.street = $('#edit-vejnavn').val();
        data.address.city =  $('#edit-by').val();
        data.phone = $('#edit-telefon').val();
        data.company.name = $('#edit-firmanavn').val();

        //Update row and redraw
        table_detailsrow.row(currentEditTr).data(data).draw();

        //close modal
        microModal.close('modal-edit');
    });

    var currentDeleteTr = null
    //Open delete modal
    $(jsSelectorDatatable_Example_detailsrow).on('click', '.js-delete-modal-trigger', function () {

        currentDeleteTr = $(this).closest('tr');

        //open modal
        microModal.show('modal-delete');
    });
    //do delete
    $('body').on('click', '.js-delete-trigger', function () {

        //delete row
        table_detailsrow.row(currentDeleteTr).remove().draw();

        //close modal
        microModal.close('modal-delete');
    });
  }
}



module.exports = datatablesExamples;
