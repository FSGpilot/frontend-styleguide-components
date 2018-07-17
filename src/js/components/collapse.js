/**
 * Collapse/expand.
 */

'use strict';
const behavior = require('../utils/behavior');
const select = require('../utils/select');
const closest = require('../utils/closest');
const forEach = require('array-foreach');

const jsCollapseTrigger = ".js-collapse";
const jsCollapseTarget = "data-js-target";

const toggleCollapse = function (triggerEl, forceClose) {
    if(triggerEl !== null && triggerEl !== undefined){
        var targetAttr = triggerEl.getAttribute(jsCollapseTarget)
        if(targetAttr !== null && targetAttr !== undefined){
            var targetEl = select(targetAttr, 'body');
            if(targetEl !== null && targetEl !== undefined && targetEl.length > 0){
                //target found, check state
                targetEl = targetEl[0];
                //change state
                if(triggerEl.getAttribute("aria-expanded") == "true" || triggerEl.getAttribute("aria-expanded") == undefined || forceClose ){
                    //close
                    animateCollapse(targetEl, triggerEl);
                }else{
                    //open
                    animateExpand(targetEl, triggerEl);
                }
            }
        }       
    }
};

const toggle = function (event) {
    event.preventDefault();
    var triggerElm = closest(event.target, jsCollapseTrigger);
    if(triggerElm !== null && triggerElm !== undefined){
        toggleCollapse(triggerElm);
    }
};

var animateInProgress = false;

function animateCollapse(targetEl, triggerEl) {
    if(!animateInProgress){
        animateInProgress = true;
        
        targetEl.style.height = targetEl.clientHeight+ "px";
        targetEl.classList.add("collapse-transition-collapse");
        setTimeout(function(){ 
            targetEl.removeAttribute("style");
        }, 5);
        setTimeout(function(){ 
            targetEl.classList.add("collapsed");
            targetEl.classList.remove("collapse-transition-collapse");
            
            triggerEl.setAttribute("aria-expanded", "false");
            targetEl.setAttribute("aria-hidden", "true");
            animateInProgress = false;
        }, 200);
    }
}

function animateExpand(targetEl, triggerEl) {
    if(!animateInProgress){
        animateInProgress = true;
        targetEl.classList.remove("collapsed");
        var expandedHeight = targetEl.clientHeight;
        targetEl.style.height = "0px";
        targetEl.classList.add("collapse-transition-expand");
        setTimeout(function(){ 
            targetEl.style.height = expandedHeight+ "px";
        }, 5);
        
        setTimeout(function(){ 
            targetEl.classList.remove("collapse-transition-expand");
            targetEl.removeAttribute("style");

            targetEl.setAttribute("aria-hidden", "false");
            triggerEl.setAttribute("aria-expanded", "true");
            animateInProgress = false;
        }, 200);
    }
}

module.exports = behavior({
  ['click']: {
    [ jsCollapseTrigger ]: toggle
  },
});
