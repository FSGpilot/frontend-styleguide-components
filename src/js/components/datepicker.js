'use strict';
const Pikaday = require("../../vendor/pikaday.js");
const behavior = require('../utils/behavior');
const toggle = require('../utils/toggle');
const forEach = require('array-foreach');
const select = require('../utils/select');

const jsSelector = '.js-calendar-group';
const jsDatepickerSelector = '.js-calendar-datepicker';
const jsDayInput = '.js-calendar-day-input';
const jsMonthInput = '.js-calendar-month-input';
const jsYearInput = '.js-calendar-year-input';

class datepickerGroup {
  constructor(el){
    
    var datepickerElement = select(jsDatepickerSelector, el);
    var dayInputElement = select(jsDayInput, el);
    var monthInputElement = select(jsMonthInput, el);
    var yearInputElement = select(jsYearInput, el);

    this.initDatepicker(datepickerElement, dayInputElement, monthInputElement, yearInputElement);
  }

  initDatepicker(el, dayEl, monthEl, yearEl){
    if(el.length > 0 && dayEl.length > 0 && monthEl.length > 0 && yearEl.length > 0){
      var datepickerElement = el[0];
      var dayInputElement = dayEl[0]
      var monthInputElement = monthEl[0]
      var yearInputElement = yearEl[0]

      var pikadayInstance = new Pikaday({
        field: datepickerElement,
        format: 'DD/MM/YYYY',
        onSelect: function(date) {
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          
          dayInputElement.value = day;
          monthInputElement.value = month;
          yearInputElement.value = year;
        }
      });

      dayInputElement.addEventListener("blur", function(){
        pikadayInstance.setDate('2015-01-01')
      });
      monthInputElement.addEventListener("blur", function(){
        console.log('day blue')
      });
      yearInputElement.addEventListener("blur", function(){
        console.log('day blue')
      });

    }
  }
}

module.exports = behavior({},{
  init: (target) => {
    forEach(select(jsSelector), calendarGroupElement => {
      new datepickerGroup(calendarGroupElement);
    });
  },
});