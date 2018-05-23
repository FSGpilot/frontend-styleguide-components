'use strict';
const Pikaday = require('../../vendor/pikaday.js');

const behavior = require('../utils/behavior');
const toggle = require('../utils/toggle');
const forEach = require('array-foreach');
const select = require('../utils/select');

const jsHandle = '.js-calendar';

const toggleCalendar = function (event) {

};


module.exports = behavior(
  {
    ['click']: {
      [jsHandle]: toggleCalendar,
    },
  },
  {
    init: target => {
      
      forEach(select(jsHandle), calendarElement => {
        new Pikaday({
          field: calendarElement,
          format: 'D/M/YYYY',
          toString(date, format) {
              // you should do formatting based on the passed format,
              // but we will just return 'D/M/YYYY' for simplicity
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              return `${day}/${month}/${year}`;
          },
          parse(dateString, format) {
              // dateString is the result of `toString` method
              const parts = dateString.split('/');
              const day = parseInt(parts[0], 10);
              const month = parseInt(parts[1] - 1, 10);
              const year = parseInt(parts[1], 10);
              return new Date(year, month, day);
          }
        });

      });
    },

    teardown: target => {
      //pikaday.destroy();
    }
  }
);

/*
var picker = new Pikaday({
    field: document.getElementByClassName('js-toggle-calendar'),
    format: 'D/M/YYYY',
    toString(date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },
    parse(dateString, format) {
        // dateString is the result of `toString` method
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1] - 1, 10);
        const year = parseInt(parts[1], 10);
        return new Date(year, month, day);
    }
});
*/
