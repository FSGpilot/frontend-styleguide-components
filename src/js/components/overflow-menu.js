'use strict';
const behavior = require('../utils/behavior');
const select = require('../utils/select');
const closest = require('../utils/closest');
const forEach = require('array-foreach');

const jsOverflowMenu = ".js-overflow-menu";
const jsOverflowMenuBtn = ".js-overflow-menu-btn";
const jsOverflowMenuItem = ".js-overflow-menu-item";


const toggle = function (event) {
    event.preventDefault();
    var menu = closest(event.target, jsOverflowMenu);
    if(menu !== null && menu !== undefined){
        //remove all old opens
        forEach(select(jsOverflowMenu, 'body'), menuInstance => {
            menuInstance.classList.remove("open");
            menuInstance.setAttribute("aria-expanded", "false");
        });
        //add new open
        menu.classList.add("open");
        menu.setAttribute("aria-expanded", "true");
    }
};

const outsideClose = function(){
    //closes overflow when clicked outside. 
    var menu = closest(event.target, jsOverflowMenu);
    if(menu === null || menu === undefined){
        forEach(select(jsOverflowMenu), menu => {
            menu.classList.remove("open");
            menu.setAttribute("aria-expanded", "false");
        });
    }
};

const itemClick = function(){
    //closes overflow when item
    var menu = closest(event.target, jsOverflowMenu);
    if(menu !== null && menu !== undefined){
        forEach(select(jsOverflowMenu), menu => {
            menu.classList.remove("open");
            menu.setAttribute("aria-expanded", "false");
        });
    }
};

module.exports = behavior({
  ['click']: {
    [ jsOverflowMenuBtn ]: toggle,
    ['body']: outsideClose,
    [jsOverflowMenuItem]: itemClick
  },
});
