
/** 
 * Initializes examples of how to use the recommended vendor libraries. 
 */

'use strict';
const domready = require('domready');
const forEach = require('array-foreach');
const select = require('./utils/select');
const select2Examples = require('./components-vendor-examples/select2-examples');

require('./polyfills');

const ELEMENT_SELECTOR = `.js-select2-example`;

domready(() => {
  //Init select2 examples 
  new select2Examples();
});
