'use strict';
const domready = require('domready');

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require('./polyfills');
//Polyfill ES6 --> ES5
require('../../node_modules/babel-polyfill/dist/polyfill'); 

const dkwds = require('./config');

const components = require('./components');
dkwds.components = components;

domready(() => {
  const target = document.body;
  for (let name in components) {
    const behavior = components[ name ];
    behavior.on(target);
  }
});

module.exports = dkwds;
