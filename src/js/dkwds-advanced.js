'use strict';
const domready = require('domready');

/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
require('./polyfills');

const dkwds = require('./config');

const components_advanced = require('./components-advanced');
dkwds.components_advanced = components_advanced;

domready(() => {
  const target = document.body;
  for (let name in components_advanced) {
    const behavior = components_advanced[ name ];
    behavior.on(target);
  }
});

module.exports = dkwds;
