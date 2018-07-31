'use strict';
const forEach = require('array-foreach');
window.$ = window.jQuery = require("jquery");
const select2 = require('../../vendor/selectWoo/js/selectWoo.full.js')();

const jsSelectorSelect2_Example1 = `#js-select2-example1`;
const jsSelectorSelect2_Example2 = `#js-select2-example2`;

class select2Examples {
  constructor(el){
    
    //Init a normal select2 
    $(jsSelectorSelect2_Example1).selectWoo({
      placeholder: "Vælg et element på listen",
      width: "100%",
      language: "da"
    });
    $(jsSelectorSelect2_Example1).removeClass('d-none'); //avoid flash of unstyled content. 

    //Init a normal select2 
    $(jsSelectorSelect2_Example2).selectWoo({
      placeholder: "Skriv for at fremsøge",
      width: "100%",
      language: "da",
      /*ajax: {
        url: 'https://api.github.com/orgs/select2/repos',
        data: function (params) {
          var query = {
            search: params.term,
            type: 'public'
          }
    
          // Query parameters will be ?search=[term]&type=public
          return query;
        }
      }*/
      ajax: {
        url: 'https://api.github.com/orgs/select2/repos',
        dataType: 'json',
        type: "GET",
        quietMillis: 50,
        data: function (params) {
          var query = {
            search: params.term,
            type: 'public'
          }
    
          // Query parameters will be ?search=[term]&type=public
          return query;
        },
        results: function (data) {
          console.log(data);
            return {
                results: $.map(data, function (item) {
                    return {
                        text: item.completeName,
                        slug: item.slug,
                        id: item.id
                    }
                })
            };
        }
    }
    });
    $(jsSelectorSelect2_Example2).removeClass('d-none'); //avoid flash of unstyled content. 
  }
}

module.exports = select2Examples; 