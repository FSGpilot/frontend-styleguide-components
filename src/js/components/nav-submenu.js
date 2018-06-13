/**
 * Collapse/expand for navigation submenues.
 * Behaves like a dropdown on desktop (closes when clicked outside).
 * And behaves like an accordion (multiselect) on mobile.
 */

'use strict';
const behavior = require('../utils/behavior');
const select = require('../utils/select');
const closest = require('../utils/closest');
const forEach = require('array-foreach');

const jsNavSubmenuTrigger = ".js-nav-submenu";
const jsNavSubmenuTarget = "data-js-target";

const navResponsiveBreakpoint = 992; //same as $nav-responsive-breakpoint from the scss.

const toggleNavSubmenu = function (triggerEl, forceClose) {
    if(triggerEl !== null && triggerEl !== undefined){
        var targetAttr = triggerEl.getAttribute(jsNavSubmenuTarget)
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
    var NavSubmenuElm = closest(event.target, jsNavSubmenuTrigger);
    if(NavSubmenuElm !== null && NavSubmenuElm !== undefined){
        //Close all existing open NavSubmenus (on desktop).
        if(window.innerWidth > navResponsiveBreakpoint){
            forEach(select(jsNavSubmenuTrigger, 'body'), NavSubmenuInstance => {
                if(NavSubmenuInstance !== NavSubmenuElm){
                    toggleNavSubmenu(NavSubmenuInstance, true);
                }
            });
        }
        
        //Open new NavSubmenu
        toggleNavSubmenu(NavSubmenuElm);
    }
};

const outsideClose = function(event){
    //closes NavSubmenu when clicked outside (on desktop) 
    if(window.innerWidth > navResponsiveBreakpoint){
        var NavSubmenuElm = closest(event.target, jsNavSubmenuTrigger);
        if(NavSubmenuElm === null || NavSubmenuElm === undefined){
            //clicked outside trigger, force close all
            forEach(select(jsNavSubmenuTrigger), NavSubmenuInstance => {
                toggleNavSubmenu(NavSubmenuInstance, true);
            });
        }
    }
};

module.exports = behavior({
  ['click']: {
    [ jsNavSubmenuTrigger ]: toggle,
    ['body']: outsideClose,
  },
});
