
const domready = require('domready');

var textarea = document.getElementsByClassName("textarea");
var textareaWordCount = document.getElementsByClassName("textareaWordCount");

textarea.addEventListener("keyup",function(){
	var characters = textarea.value.split('');
	textareaWordCount.innerText = characters.length;
  if(characters.length > 2000){
	textarea.value = textarea.value.substring(0,2000);
    textareaWordCount.innerText = 2000;
  }
});