'use strict';
const behavior = require('../utils/behavior');
const select = require('../utils/select');
const closest = require('../utils/closest');
const forEach = require('array-foreach');


class dropdown {
    constructor(el){
        this.jsDropdownTrigger = ".js-dropdown";
        this.jsDropdownTarget = "data-js-target";
        
        //option: make dropdown behave as the collapse component when on small screens (used by submenus in the header and step-dropdown). 
        this.navResponsiveBreakpoint = 992; //same as $nav-responsive-breakpoint from the scss.
        this.jsResponsiveCollapseModifier = ".js-dropdown--responsive-collapse"
        this.responsiveCollapseEnabled = false;

        this.triggerEl = null;
        this.targetEl = null;

        this.init(el);

        if(this.triggerEl !== null && this.triggerEl !== undefined && this.targetEl !== null && this.targetEl !== undefined){
            var that = this;
            //Clicked outside dropdown -> close it
            select('body')[0].addEventListener("click", function(event){
                that.outsideClose(event);
            });
            
            //Clicked on dropdown open button --> toggle it
            this.triggerEl.addEventListener("click", function(event){
                event.preventDefault();
                that.toggleDropdown();
            });
        }       
    }

    init(el){
        this.triggerEl = el;
        if(this.triggerEl !== null && this.triggerEl !== undefined){
            var targetAttr = this.triggerEl.getAttribute(this.jsDropdownTarget)
            if(targetAttr !== null && targetAttr !== undefined){
                var targetEl = select(targetAttr, 'body');
                if(targetEl !== null && targetEl !== undefined && targetEl.length > 0){
                    this.targetEl = targetEl[0];
                }
            }
        }

        if(this.triggerEl.classList.contains('js-dropdown--responsive-collapse')){
            this.responsiveCollapseEnabled = true;
        }
    }

    
    toggleDropdown(forceClose) {
        if(this.triggerEl !== null && this.triggerEl !== undefined && this.targetEl !== null && this.targetEl !== undefined){
            //change state
            if(this.triggerEl.getAttribute("aria-expanded") == "true" || forceClose){
                //close
                this.triggerEl.setAttribute("aria-expanded", "false");
                this.targetEl.classList.add("collapsed");
                this.targetEl.setAttribute("aria-hidden", "true");
            }else{
                //open
                this.triggerEl.setAttribute("aria-expanded", "true");
                this.targetEl.classList.remove("collapsed");
                this.targetEl.setAttribute("aria-hidden", "false");
            }
        }
    };

    outsideClose(event){
        if(!this.doResponsiveCollapse()){
            //closes dropdown when clicked outside. 
            var dropdownElm = closest(event.target, this.targetEl.id);
            if((dropdownElm === null || dropdownElm === undefined) && (event.target !== this.triggerEl)){
                //clicked outside trigger, force close
                this.toggleDropdown(true);
            }
        }
    };

    doResponsiveCollapse(){
        //returns true if responsive collapse is enabled and we are on a small screen. 
        if(this.responsiveCollapseEnabled && window.innerWidth <= this.navResponsiveBreakpoint){
            return true;
        }
        return false;
    }
}

module.exports = dropdown;