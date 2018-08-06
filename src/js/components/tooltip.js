
const domready = require('domready');
//Import tippy.js (https://atomiks.github.io/tippyjs/)
const tippy = require("tippy.js");

domready(() => {
    tippy('.js-tooltip', { 
        duration: 0
    }) //init tooltip on elements with the .js-tooltip class
});
