'use strict';

//import 'Choises', a non-jquery-dependent library similar to select2. https://github.com/jshjohnson/Choices.
const Choices = require('../../../node_modules/choices.js/assets/scripts/dist/choices'); 

const behavior = require('../utils/behavior');
const select = require('../utils/select');
const forEach = require('array-foreach');

const CLICK = require('../events').CLICK;
const PREFIX = require('../config').prefix;

const MULTISELECT_CLASS = `.js-${PREFIX}multiselect`;
let CHOISE_OBJ = null;

const toggleBanner = function (event) {
  event.preventDefault();
  this.closest(HEADER).classList.toggle(EXPANDED_CLASS);
  return false;
};

module.exports = behavior(
    {
        [ CLICK ]: {
            [ `${MULTISELECT_CLASS} [aria-controls]` ]: toggleBanner,
        },
    },
    {
        init: root => {
            forEach(root.querySelectorAll(MULTISELECT_CLASS), multiselectElem => {
                new Choices(multiselectElem, {
                    renderSelectedChoices: 'always', //Whether selected choices should be removed from the list. To always render choices pass 'always'.
                    removeItemButton: true, //Whether each item should have a remove button.
                    paste: false, //Whether a user can paste into the input.
                    callbackOnCreateTemplates: function (template) {
                        var classNames = this.config.classNames;
                        return {
                          choice: (data) => {
                            return template(`
                              <div class="${classNames.item} ${classNames.itemChoice} ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}" data-select-text="${this.config.itemSelectText}" data-choice ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : 'data-choice-selectable'} data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
                                <input type="checkbox" ${data.active ? 'checked' : ''}><label></label>  ${data.label}
                              </div>
                              
                            `);
                          },
                        };
                    }
                });
            });
        },
    }
);




