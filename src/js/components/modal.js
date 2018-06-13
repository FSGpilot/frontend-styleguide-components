
const domready = require('domready');

/**
 * Import modal lib.
 * https://micromodal.now.sh
 */
const microModal = require("../../vendor/micromodal.js");
domready(() => {
	microModal.init(); //init all modals
});
