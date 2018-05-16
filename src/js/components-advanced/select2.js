'use strict';
const behavior = require('../utils/behavior');
const toggle = require('../utils/toggle');
const forEach = require('array-foreach');
const $ = require('jquery');
const select2 = require('select2')();

const CLICK = require('../events').CLICK;
const PREFIX = require('../config').prefix;

const ELEMENT_SELECTOR = `.js-select2`;

module.exports = behavior(
  {
    //Actions
  },
  {
    init () {
      forEach(document.querySelectorAll(ELEMENT_SELECTOR), select2Element => {
        $(select2Element).select2({
          placeholder: "Vælg et element på listen",
          width: "100%"
        });
      });
    },
    teardown () {
     
    },
  }
);