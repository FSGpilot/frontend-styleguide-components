'use strict';
const behavior = require('../utils/behavior');
const select = require('../utils/select');
const closest = require('../utils/closest');
const forEach = require('array-foreach');

const jsDropdownTrigger = ".js-dropdown";
const jsDropdownTarget = "data-js-target";
//const jsDropdownItem = ".js-dropdown-item";


const toggleDropdown = function (triggerEl, forceClose) {
    if(triggerEl !== null && triggerEl !== undefined){
        var targetAttr = triggerEl.getAttribute(jsDropdownTarget)
        if(targetAttr !== null && targetAttr !== undefined){
            var targetEl = select(targetAttr, 'body');
            if(targetEl !== null && targetEl !== undefined && targetEl.length > 0){
                //target found, check state
                targetEl = targetEl[0];
                //change state
                if(triggerEl.getAttribute("aria-expanded") == "true" || forceClose){
                    //close
                    triggerEl.setAttribute("aria-expanded", "false");
                    targetEl.classList.add("collapsed");
                    targetEl.setAttribute("aria-hidden", "true");
                }else{
                    //open
                    triggerEl.setAttribute("aria-expanded", "true");
                    targetEl.classList.remove("collapsed");
                    targetEl.setAttribute("aria-hidden", "false");
                }
            }
        }       
    }
};

const toggle = function (event) {
    event.preventDefault();
    var dropdownElm = closest(event.target, jsDropdownTrigger);
    if(dropdownElm !== null && dropdownElm !== undefined){
        //Close all existing open dropdowns
        forEach(select(jsDropdownTrigger, 'body'), dropdownInstance => {
            if(dropdownInstance !== dropdownElm){
                toggleDropdown(dropdownInstance, true);
            }
        });
        //Open new dropdown
        toggleDropdown(dropdownElm);
    }
};

const outsideClose = function(event){
    //closes dropdown when clicked outside. 
    var dropdownElm = closest(event.target, jsDropdownTrigger);
    if(dropdownElm === null || dropdownElm === undefined){
        //clicked outside trigger, force close all
        forEach(select(jsDropdownTrigger), dropdownInstance => {
            toggleDropdown(dropdownInstance, true);
        });
    }
};

module.exports = behavior({
  ['click']: {
    [ jsDropdownTrigger ]: toggle,
    ['body']: outsideClose,
    //[jsDropdownItem]: itemClick
  },
});
