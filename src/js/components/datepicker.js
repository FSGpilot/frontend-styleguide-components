'use strict';
const Pikaday = require("../../vendor/pikaday.js");
const behavior = require('../utils/behavior');
const select = require('../utils/select');

const jsDatepickerSelector = '.js-calendar-datepicker';
const jsDayInput = '.js-calendar-day-input';
const jsMonthInput = '.js-calendar-month-input';
const jsYearInput = '.js-calendar-year-input';

class datepickerGroup {
  constructor(el){
    
    this.pikadayInstance = null;
    this.datepickerElement = select(jsDatepickerSelector, el);
    this.dateGroup = el;
    this.dayInputElement = null;
    this.monthInputElement = null;
    this.yearInputElement = null;

    this.initDateInputs();
    this.initDatepicker(this.datepickerElement[0]);
  }

  initDateInputs(){
    this.dayInputElement = select(jsDayInput, this.dateGroup)[0]
    this.monthInputElement = select(jsMonthInput, this.dateGroup)[0];
    this.yearInputElement = select(jsYearInput, this.dateGroup)[0];

    var that = this;
    
    this.dayInputElement.addEventListener("blur", function(){
      var curDate = that.pikadayInstance.getDate();
      that.updateDatepickerDate(curDate.getFullYear(), curDate.getMonth(), this.value)
    });

    this.monthInputElement.addEventListener("blur", function(){
      var curDate = that.pikadayInstance.getDate();
      that.updateDatepickerDate(curDate.getFullYear(), parseInt(this.value)-1, curDate.getDate())
    });
    this.yearInputElement.addEventListener("blur", function(){
      var curDate = that.pikadayInstance.getDate();
      that.updateDatepickerDate(this.value, curDate.getMonth(), curDate.getDate())
    });
  }

  initDatepicker(el){
    if(el){
      var that = this;

      this.pikadayInstance = new Pikaday({
        field: el,
        format: 'DD/MM/YYYY',
        onSelect: function(date) {
          that.updateDateInputs(date)
        }
      });

      var initDate = new Date();
      this.pikadayInstance.setDate(initDate);
      this.updateDateInputs(initDate);
    }
  }

  updateDateInputs(date){
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    this.dayInputElement.value = day;
    this.monthInputElement.value = month;
    this.yearInputElement.value = year;
  }

  updateDatepickerDate(year, month, day){
    var newDate = new Date(year, month, day);
    this.pikadayInstance.setDate(newDate);
  }
}

module.exports = datepickerGroup;