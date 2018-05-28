'use strict';
const forEach = require('array-foreach');
const $  = require('jquery');
window.jQuery = $;
const slick_core = require('slickgrid');
const eventdrag = require('slickgrid/lib/jquery.event.drag-2.3.0');
const eventdrop = require('slickgrid/lib/jquery.event.drop-2.3.0');
const slick_grid = require('slickgrid/slick.grid');

const jsSelectorSlickgrid_Example1 = `#js-slickgrid-example1`;

class slickgridExamples {
  constructor(el){

    if( $('#myGrid').length > 0){
      //NOTE: you only need to externally include the javascript. A theme is shipped with DKWDS.
      
      //Init a datatable with no configuration
      //$(jsSelectorSlickgrid_Example1).DataTable();
      var grid;
      var columns = [
        {id: "title", name: "Title", field: "title"},
        {id: "duration", name: "Duration", field: "duration"},
        {id: "%", name: "% Complete", field: "percentComplete"},
        {id: "start", name: "Start", field: "start"},
        {id: "finish", name: "Finish", field: "finish"},
        {id: "effort-driven", name: "Effort Driven", field: "effortDriven"}
      ];
      var options = {
        enableCellNavigation: true,
        enableColumnReorder: false
      };
      $(function () {
        var data = [];
        for (var i = 0; i < 500; i++) {
          data[i] = {
            title: "Task " + i,
            duration: "5 days",
            percentComplete: Math.round(Math.random() * 100),
            start: "01/01/2009",
            finish: "01/05/2009",
            effortDriven: (i % 5 == 0)
          };
        }
        grid = new Slick.Grid("#myGrid", data, columns, options);
      })
    }
  }
}


module.exports = slickgridExamples;