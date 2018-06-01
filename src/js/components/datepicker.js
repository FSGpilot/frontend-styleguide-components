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

      //validate day
      var newDay = parseInt(this.value);
      var lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getDate();
      if(newDay> lastDay){
        return; //no nothing, not valid.
      }
      var newDate = new Date(curDate.getFullYear(), curDate.getMonth(), newDay);

      //update pikaday
      that.updateDatepickerDate(newDate)
    });

    this.monthInputElement.addEventListener("blur", function(){
      var curDate = that.pikadayInstance.getDate();

      //validate month
      var newMonth = parseInt(this.value)-1;
      if(newMonth >= 12){
        return; //no nothing, not valid.
      }
      
      var newDate = new Date(curDate.getFullYear(), newMonth, curDate.getDate());

      that.updateDatepickerDate(newDate)
    });

    this.yearInputElement.addEventListener("blur", function(){
      var curDate = that.pikadayInstance.getDate();
      var newDate = new Date(this.value, curDate.getMonth(), curDate.getDate());
      that.updateDatepickerDate(newDate)
    });
  }

  initDatepicker(el){
    if(el){
      var that = this;

      this.pikadayInstance = new Pikaday({
        field: el,
        format: 'DD/MM/YYYY',
        firstDay: 1, //mandag
        i18n: {
          previousMonth : 'Forrige måned',
          nextMonth     : 'Næste måned',
          months        : ['Januar','Februar','Marth','April','Maj','Juni','July','August','September','Oktober','November','December'],
          weekdays      : ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
          weekdaysShort : ['Søn','Man','Tir','Ons','Tor','Fre','Lør']
        },
        minDate: new Date(),
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

  updateDatepickerDate(newDate){
    this.pikadayInstance.setDate(newDate);
  }
}

module.exports = datepickerGroup;