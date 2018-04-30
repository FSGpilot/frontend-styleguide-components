'use strict';
const accordion = require('./accordion');
const behavior = require('../utils/behavior');
const debounce = require('lodash.debounce');
const forEach = require('array-foreach');
const select = require('../utils/select');

const CLICK = require('../events').CLICK;
const PREFIX = require('../config').prefix; //JJE: not used anymore 

const HIDDEN = 'hidden';
const SCOPE = `.footer`; //${PREFIX}-
const NAV = `${SCOPE} nav`;
const BUTTON = `${NAV} .footer-primary-link`; //${PREFIX}-
const LIST = `${NAV} ul`;

const HIDE_MAX_WIDTH = 600;
const DEBOUNCE_RATE = 180;

const showPanel = function () {
  const small_screen = window.innerWidth < HIDE_MAX_WIDTH;
  if(small_screen){
    const list = this.closest(LIST);
    list.classList.toggle(HIDDEN);

    // NB: this *should* always succeed because the button
    // selector is scoped to ".{prefix}-footer-big nav"
    const lists = list.closest(NAV)
      .querySelectorAll('ul');

    forEach(lists, el => {
      if (el !== list) {
        el.classList.add(HIDDEN);
      }
    });
  }
};

const resize = debounce(() => {
  const hidden = window.innerWidth < HIDE_MAX_WIDTH;
  forEach(select(LIST), list => {
    list.classList.toggle(HIDDEN, hidden);
  });
}, DEBOUNCE_RATE);

module.exports = behavior({
  [ CLICK ]: {
    [ BUTTON ]: showPanel,
  },
}, {
  // export for use elsewhere
  HIDE_MAX_WIDTH,
  DEBOUNCE_RATE,

  init: target => {
    resize();
    window.addEventListener('resize', resize);
  },

  teardown: target => {
    window.removeEventListener('resize', resize);
  },
});
