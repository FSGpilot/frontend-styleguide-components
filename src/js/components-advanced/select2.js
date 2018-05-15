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
          width: "100%",
          ajax: {
            url: "http://sh-example-simple.herokuapp.com",
            dataType: "json",
            width: 'style',
            delay: 250,
            data: function(params) {
              return {
                q: params.term,
                page: params.page,
                per_page: 10
              };
            },
            processResults: function(data, page) {
              return {
                // Select2 requires an id, so we need to map the results and add an ID
                // You could instead include an id in the tsv you add to soulheart ;)
                results: data.matches.map(function(item) {
                  return {
                    id: item.text,
                    text: item.text
                  };
                }),
                pagination: {
                  // If there are 10 matches, there's at least another page
                  more: data.matches.length === 10
                }
              };
            },
            cache: true
          }
        });
      });
    },
    teardown () {
     
    },
  }
);