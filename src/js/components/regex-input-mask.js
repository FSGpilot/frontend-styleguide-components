
/*
* Prevents the user from inputting based on a regex.
* Does not work the same way af <input pattern="">, this pattern is only used for validation, not to prevent input. 
* Usecase: number input for date-component.
* Example - number only: <input type="text" data-input-regex="^\d*$">
*/
'use strict';
const behavior = require('../utils/behavior');

const modifierState = {
  shift: false,
  alt: false,
  ctrl: false,
  command: false
};

function inputRegexMask(event) {

    if(modifierState.ctrl || modifierState.command) {
        return;
    }
    var newChar = null;
    if(typeof event.key !== "undefined"){
        if(event.key.length === 1){
            newChar = event.key;
        }
    } else {
        if(!event.charCode){
            newChar = String.fromCharCode(event.keyCode);
        } else {
            newChar = String.fromCharCode(event.charCode);
        }
    }
    if(newChar !== null) {
        if(newChar.length > 0){
            var newValue = this.value + newChar;
            var regexStr = this.getAttribute("data-input-regex");
            var r = new RegExp(regexStr);
            if(r.exec(newValue) === null){
                if (event.preventDefault) {
                  event.preventDefault();
                } else {
                  event.returnValue = false;
                }
            }
        }
    }
}

module.exports = behavior({
  'keypress paste': {
    'input[data-input-regex]': inputRegexMask,
  }
});
