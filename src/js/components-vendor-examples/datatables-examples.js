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
const jsSelectorDatatable_Example_edit = "#js-datatable-example-edit";

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
        language: {
            "lengthMenu": "Viser _MENU_ elementer pr side",
            "zeroRecords": "Der blev fundet intet resultat",
            "info": "Viser sider _PAGE_ af _PAGES_",
            "infoEmpty": "Intet resultat",
            "infoFiltered": "(filtreret fra _MAX_ elementer)",
            "emptyTable": "Ingen data",
            "search": "Søg i tabel:",
            "Sort": true,
            "paginate": {
                "first":      "Første",
                "last":       "Sidste",
                "next":       "Næste",
                "previous":   "Forrige"
            },
        },
        processing: true,
        ajax: {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        columns: [
            { "data": "name" },
            { "data": "email" },
            { "data": "address.street" },
            { "data": "address.city" },
            { "data": "phone" }
        ]
    } );

    //////////////////////////////////////
    //Init a datatable with selectable rows
    //////////////////////////////////////
    var table_selectable = $(jsSelectorDatatable_Example_selectable).DataTable({
        language: {
            "lengthMenu": "Viser _MENU_ elementer pr side",
            "zeroRecords": "Der blev fundet intet resultat",
            "info": "Viser sider _PAGE_ af _PAGES_",
            "infoEmpty": "Intet resultat",
            "infoFiltered": "(filtreret fra _MAX_ elementer)",
            "emptyTable": "Ingen data",
            "search": "Søg i tabel:",
            "Sort": true,
            "paginate": {
                "first":      "Første",
                "last":       "Sidste",
                "next":       "Næste",
                "previous":   "Forrige"
            },
        },
        columnDefs: [ {
            orderable: false,
            targets:   0,
            render: function ( data, type, full, meta ) {
                var checkboxid = "checkbox-"+ Math.random().toString(36).substring(7); 
                return "<div class='form-group'>"+
                            "<input id='"+checkboxid+"' type='checkbox' name='checked'>"+
                            "<label for='"+checkboxid+"' ></label>" +
                        "</div>"
            }
        } ],
        /*select: {
            style:    'single',
            selector: 'td:first-child'
        },*/
        order: [[ 1, 'asc' ]]
    });

    $(jsSelectorDatatable_Example_selectable).on("click", "input[type='checkbox']", function (event) {
        if (event.target.checked) {
            $(event.target).closest("tr").addClass("selected-row");
        } else {
            $(event.target).closest("tr").removeClass("selected-row");
        }
    } );

    $("div.toolbar").html('<div class=""><svg class="icon-svg" alt="download som PDF"><use xlink:href="#printer"></use></svg> <svg class="icon-svg" alt="Download som Excel"><use xlink:href="#printer"></use></svg> <svg class="icon-svg" alt="Print side"><use xlink:href="#printer"></use></svg></div>');

    //////////////////////////////////////
    //Init a datatable with expand row
    //////////////////////////////////////

    // Formatting function for row details - modify as you need
    function format ( d ) {
        // `d` is the original data object for the row
        return '<div class="details-row-content">'+
          '<div class="row">'+
            '<div class="col-5">'+
              '<p class="h3">Headline</p>' +
              '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna <a href="#">aliqua</a>.</p>'+
            '</div>'+
            '<div class="col-6">'+
                '<img src="https://ramen-files.s3.amazonaws.com/charturl-images/2017-01-26/9b64e497-3a7a-40c8-b7c7-322f84f84ba9.png"></div>' +
            '</div>' +
        '</div>';
    }


    var table_detailsrow = $(jsSelectorDatatable_Example_detailsrow).DataTable( {
        language: {
            "lengthMenu": "Viser _MENU_ elementer pr side",
            "zeroRecords": "Der blev fundet intet resultat",
            "info": "Viser sider _PAGE_ af _PAGES_",
            "infoEmpty": "Intet resultat",
            "infoFiltered": "(filtreret fra _MAX_ elementer)",
            "emptyTable": "Ingen data",
            "search": "Søg i tabel:",
            "Sort": true,
            "paginate": {
                "first":      "Første",
                "last":       "Sidste",
                "next":       "Næste",
                "previous":   "Forrige"
            },
        },
        ajax: {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        rowId: "id",
        columns: [
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
        ],
        order: [[1, 'asc']]
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


    //////////////////////////////////////
    //Init a datatable with edit and delete
    //////////////////////////////////////


    var table_edit = $(jsSelectorDatatable_Example_edit).DataTable( {
        language: {
            "lengthMenu": "Viser _MENU_ elementer pr side",
            "zeroRecords": "Der blev fundet intet resultat",
            "info": "Viser sider _PAGE_ af _PAGES_",
            "infoEmpty": "Intet resultat",
            "infoFiltered": "(filtreret fra _MAX_ elementer)",
            "emptyTable": "Ingen data",
            "search": "Søg i tabel:",
            "Sort": true,
            "paginate": {
                "first":      "Første",
                "last":       "Sidste",
                "next":       "Næste",
                "previous":   "Forrige"
            },
        },
        ajax: {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        rowId: "id",
        columns: [
            { "data": "name" },
            { "data": "address.street" },
            { "data": "address.city" },
            { "data": "company.name" },
            {
                "targets": -1,
                "className":      'row-control',
                "data": null,
                "orderable": false,
                "render": function ( data, type, full, meta ) {
                    var overflowID = "overflow-table-"+full.id;
                    return  `<div class="overflow-menu overflow-menu--open-left">
                                <button class="button-overflow-menu js-dropdown" data-js-target="#`+ overflowID +`" aria-haspopup="true" aria-expanded="false">
                                    <svg class="icon-svg"><use xlink:href="#dots-vertical"></use></svg>
                                </button>
                                <div class="overflow-menu-inner" id="`+ overflowID +`" aria-hidden="true">
                                    <ul class="overflow-list">
                                        <li><button class="js-edit-modal-trigger">Rediger <svg class="icon-svg"><use xlink:href="#pencil"></use></svg></button></li>
                                        <li><button class="js-delete-modal-trigger danger-delete">Slet <svg class="icon-svg"><use xlink:href="#delete"></use></svg></button></li>
                                    </ul>
                                </div>
                            </div>`
                }
            }
        ],
        order: [[1, 'asc']]
    } );

    var currentEditTr = null

    //Open edit modal
    $(jsSelectorDatatable_Example_edit).on('click', '.js-edit-modal-trigger', function () {

        //get data from row
        currentEditTr = $(this).closest('tr');
        var data = table_edit.row(currentEditTr).data();
        var id = table_edit.row(currentEditTr).id()

        //insert data in modal
        $('#edit-row-id').val(id);
        $('#edit-navn').val(data.name);
        $('#edit-vejnavn').val(data.address.street);
        $('#edit-by').val(data.address.city);
        $('#edit-firmanavn').val(data.company.name);

        //open modal
         microModal.show('modal-edit');
    });

    //Update edit row
    $('body').on('click', '.js-edit-save-trigger', function () {

        //get row data
        var data = table_edit.row(currentEditTr).data();

        //update  data
        data.name = $('#edit-navn').val();
        data.address.street = $('#edit-vejnavn').val();
        data.address.city =  $('#edit-by').val();
        data.company.name = $('#edit-firmanavn').val();

        //Update row and redraw
        table_edit.row(currentEditTr).data(data).draw();

        //close modal
        microModal.close('modal-edit');
    });

    var currentDeleteTr = null
    //Open delete modal
    $(jsSelectorDatatable_Example_edit).on('click', '.js-delete-modal-trigger', function () {

        currentDeleteTr = $(this).closest('tr');

        //open modal
        microModal.show('modal-delete');
    });
    //do delete
    $('body').on('click', '.js-delete-trigger', function () {

        //delete row
        table_edit.row(currentDeleteTr).remove().draw();

        //close modal
        microModal.close('modal-delete');
    });
  }
}



module.exports = datatablesExamples;
