
/** 
 * Initializes examples of how to use the recommended vendor libraries. 
 */

'use strict';
const domready = require('domready');
const select2Examples = require('./components-vendor-examples/select2-examples');
const datatablesExamples = require('./components-vendor-examples/datatables-examples');

require('./polyfills');

const ELEMENT_SELECTOR = `.js-select2-example`;

domready(() => {
  //Init select2 examples 
  new select2Examples();

  new datatablesExamples();
});
