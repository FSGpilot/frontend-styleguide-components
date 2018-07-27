'use strict';
const behavior = require('../utils/behavior');
const select = require('../utils/select');
const closest = require('../utils/closest');
const forEach = require('array-foreach');


class checkboxToggleContent{
    constructor(el){
        this.jsToggleTrigger = ".js-checkbox-toggle-content";
        this.jsToggleTarget = "data-js-target";

        this.targetEl = null;
        this.checkboxEl = null;

        this.init(el);
    }

    init(el){
        this.checkboxEl = el;
        var that = this;
        this.checkboxEl.addEventListener('change',function(event){
            that.toggle(that.checkboxEl);
        });
        this.toggle(this.checkboxEl);
    }

    toggle(triggerEl){
        var targetAttr = triggerEl.getAttribute(this.jsToggleTarget)
        if(targetAttr !== null && targetAttr !== undefined){
            var targetEl = select(targetAttr, 'body');
            if(targetEl !== null && targetEl !== undefined && targetEl.length > 0){
                if(triggerEl.checked){
                    this.open(triggerEl, targetEl[0]);
                }else{
                    this.close(triggerEl, targetEl[0]);
                }
            }
        }
    }

    open(triggerEl, targetEl){
        if(triggerEl !== null && triggerEl !== undefined && targetEl !== null && targetEl !== undefined){
            triggerEl.setAttribute("aria-expanded", "true");
            targetEl.classList.remove("collapsed");
            targetEl.setAttribute("aria-hidden", "false");
        }
    }
    close(triggerEl, targetEl){
        if(triggerEl !== null && triggerEl !== undefined && targetEl !== null && targetEl !== undefined){
            triggerEl.setAttribute("aria-expanded", "false");
            targetEl.classList.add("collapsed");
            targetEl.setAttribute("aria-hidden", "true");
        }
    }
}

module.exports = checkboxToggleContent;