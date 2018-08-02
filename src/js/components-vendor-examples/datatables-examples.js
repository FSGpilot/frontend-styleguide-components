'use strict';
const forEach = require('array-foreach');
const $  = require( 'jquery' );
window.$ = $;
const microModal = require("../../vendor/micromodal.js");
const dropdown = require('../components/dropdown');
const tippy = require("tippy.js");
const dt = require( 'datatables.net' )( window, $ );
const dt_select =require( 'datatables.net-select' )( window, $ );
const dt_responsive =require( 'datatables.net-responsive' )( window, $ );

const jsSelectorDatatable_Example_basic = "#js-datatable-example-basic";
const jsSelectorDatatable_Example_extra_pagination = "#js-datatable-example-extra_pagination";
const jsSelectorDatatable_Example_ajax = "#js-datatable-example-ajax";
const jsSelectorDatatable_Example_detailsrow = "#js-datatable-example-detailsrow";
const jsSelectorDatatable_Example_selectable = "#js-datatable-example-selectable";
const jsSelectorDatatable_Example_edit = "#js-datatable-example-edit";
const jsSelectorDatatable_Example_edit2 = "#js-datatable-example-edit2";

const jsSelectorDatatable_Example_praktikplads = "#js-datatable-example-praktikplads";

class datatablesExamples {
  constructor(el){

    var languageConfig = {
        "lengthMenu": "Viser _MENU_ elementer pr side",
        "zeroRecords": "Der blev fundet intet resultat",
        "info": "Viser sider _PAGE_ af _PAGES_",
        "infoEmpty": "Intet resultat",
        "infoFiltered": "(filtreret fra _MAX_ elementer)",
        "emptyTable": "Ingen data",
        "search": "Filtrer:",
        "Sort": true,
        "paginate": {
            "first":      "Første",
            "last":       "Sidste",
            "next":       "Næste",
            "previous":   "Forrige"
        },
    };

    //////////////////////////////////////
    //Init a datatable with no configuration
    //////////////////////////////////////
    var table_basic = $(jsSelectorDatatable_Example_basic).DataTable({
        'language': languageConfig,
        'responsive': true
    });


    //////////////////////////////////////
    //Init a datatable with ajax data
    //////////////////////////////////////
    var table_ajax = $(jsSelectorDatatable_Example_ajax).DataTable({
        'language': languageConfig,
        'responsive': true,
        'processing': true,
        'ajax': {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        'columns': [
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
        'language': languageConfig,
        'responsive': true,
        'columnDefs': [ {
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
        'order': [[ 1, 'asc' ]]
    });

    $(jsSelectorDatatable_Example_selectable).on("click", "input[type='checkbox']", function (event) {
        if (event.target.checked) {
            $(event.target).closest("tr").addClass("selected-row");
        } else {
            $(event.target).closest("tr").removeClass("selected-row");
        }
    } );
    
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
              '<div class="responsive-content"></div>'+
            '</div>'+
            '<div class="col-6">'+
                '<img src="https://ramen-files.s3.amazonaws.com/charturl-images/2017-01-26/9b64e497-3a7a-40c8-b7c7-322f84f84ba9.png"></div>' +
            '</div>' +
        '</div>';
    }


    var table_detailsrow = $(jsSelectorDatatable_Example_detailsrow).DataTable( {
        'language': languageConfig,
        'ajax': {
            "url": "https://jsonplaceholder.typicode.com/users",
            "dataSrc": ""
        },
        'rowId': "id",
        'columns': [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
                "width": "24px" 
            },
            { "data": "name" },
            { "data": "address.street" },
            { "data": "address.city" },
            { "data": "phone" },
        ],
        'order': [[1, 'asc']],
        'responsive': {
            details: false
        }
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
            row.child( format(row.data()), 'child').show();
            tr.addClass('shown');
        }
    } );


    //////////////////////////////////////
    //Init a datatable with edit and delete
    //////////////////////////////////////
    var table_edit = $(jsSelectorDatatable_Example_edit).DataTable( {
        language: languageConfig,
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
                "responsivePriority": 1, //do not responsive hide last
                "render": function ( data, type, full, meta ) {
                    var overflowID = "overflow-table-"+full.id;
                    return  `<div class="overflow-menu overflow-menu--open-left overflow-menu--hover-bg">
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
        order: [[1, 'asc']],
        'responsive': true,
        'initComplete': function(settings, json) {
            $(jsSelectorDatatable_Example_edit).find('.js-dropdown').each(function( index ) {
                new dropdown(this);
            });
        }
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
        
    //////////////////////////////////
    //Edit tabel uden overflow-menu.
    //////////////////////////////////
    var table_edit2 = $(jsSelectorDatatable_Example_edit2).DataTable( {
        language: languageConfig,
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
                "responsivePriority": 1, //do not responsive hide last
                "render": function ( data, type, full, meta ) {
                    return  `<button class="button button-unstyled px-3 js-delete-modal-trigger"><svg class="icon-svg"><use xlink:href="#delete"></use></svg></button>`
                }
            }
        ],
        order: [[1, 'asc']],
        'responsive': true
    });
    $(jsSelectorDatatable_Example_edit2).on('click', '.js-delete-modal-trigger', function () {

        currentDeleteTr = $(this).closest('tr');

        //open modal
        microModal.show('modal-delete');
    });

    /////////////////////////////////
    //Give dummy buttons to top bar (all datatables)
    /////////////////////////////////
    var downloadButton = "<button class='button button-unstyled mr-4 js-tooltip' aria-label='Download som PDF' title='Download som PDF'><svg class='icon-svg'><use xlink:href='#download'></use></svg></button>";
    var settingsButton = "<button class='button button-unstyled mr-4 js-tooltip' aria-label='Rediger egenskaber' title='Rediger egenskaber'><svg class='icon-svg'><use xlink:href='#settings'></use></svg></button>";
    $('.dataTables_filter').prepend(downloadButton).prepend(settingsButton);
    tippy('.js-tooltip');
  

    /////////////////////////////////
    //PRAKTIKPLADS DATATABLE
    /////////////////////////////////
    var table_praktikplads = $(jsSelectorDatatable_Example_praktikplads).DataTable( {
        language: languageConfig,
        ajax: {
            "url": "https://api.myjson.com/bins/1adkvm",
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
            { "data": "student", "width": "20%" },
            { "data": "birthday" },
            { "data": "education" },
            { "data": "education2" },
            { "data": "education3" },
            { "data": "education4" }
        ],
        order: [[1, 'asc']],
        paging:   false,
        searching: false,
        info:     false
    } );

    // Add event listener for opening and closing details 
    $(jsSelectorDatatable_Example_praktikplads).on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table_praktikplads.row( tr );

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

  }  
}




module.exports = datatablesExamples;
