'use strict';
const behavior = require('../utils/behavior');
const toggle = require('../utils/toggle');
const forEach = require('array-foreach');
const $ = require('jquery');
const select2 = require('select2')();

const jsSelectorSelect2_Example1 = `.js-select2-example1`;

class select2Examples {
  constructor(el){
    
    //Init a normal select2 
    $(jsSelectorSelect2_Example1).select2({
      placeholder: "Vælg et element på listen",
      width: "100%"
    });

  }
}


module.exports = select2Examples;