'use strict';
const domready = require('domready');
const forEach = require('array-foreach');
const select = require('./utils/select');
const datepicker = require('./components/datepicker');
const modal = require('./components/modal');

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require('./polyfills');

const dkwds = require('./config');

const jsSelectorDatepicker = '.js-calendar-group';

const components = require('./components');
dkwds.components = components;

domready(() => {
  const target = document.body;
  for (let name in components) {
    const behavior = components[ name ];
    behavior.on(target);
  }

  //Init datepicker.  (Note: above 'behavior.on' does not work with pikaday -> seperate initialization)
  forEach(select(jsSelectorDatepicker), calendarGroupElement => {
    new datepicker(calendarGroupElement);
  });
  
});

module.exports = dkwds;
