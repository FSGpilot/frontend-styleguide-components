'use strict';
const behavior = require('../utils/behavior');
const select = require('../utils/select');
const closest = require('../utils/closest');
const forEach = require('array-foreach');


class radioToggleGroup{
    constructor(el){
        this.jsToggleTrigger = ".js-radio-toggle-group";
        this.jsToggleTarget = "data-js-target";

        this.radioEls = null;
        this.targetEl = null;

        this.init(el);
    }

    init(el){
        this.radioGroup = el;
        this.radioEls = select("input[type='radio']", this.radioGroup);
        var that = this;

        forEach(this.radioEls, radio => {
            radio.addEventListener('change',function(event){
                forEach(that.radioEls, radio => { 
                    that.toggle(radio);
                });
            });

            this.toggle(radio); //Initial value;
        });

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

module.exports = radioToggleGroup;