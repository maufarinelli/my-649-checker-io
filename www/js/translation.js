"use strict";

/* Global translate app*/
var translateApp = translateApp || {};

(function() {

    // object that will contain all i18n stuffs
    translateApp.i18n = {};

    translateApp.i18n.i18nTranslated = {};

    translateApp.i18n.construct = function(dict) {
        for( var i in dict ){
            if( dict.hasOwnProperty(i) ){
                translateApp.i18n.i18nTranslated[i] = dict[i];
            }
        }
    };

    translateApp.i18n.translate = function() {
        $('[data-i18n]').each(function(idx, elem) {
            var key = $(elem).data('i18n');
            var text = translateApp.i18n.i18nTranslated[key];

            $(elem).text(text);
        });
    };

}());