'use strict';

define([
        'addExtra'
    ], 
    function(
        addExtra
    ) {
        addExtra.service('addExtraServices', function() {
            /**
             * Validates if the param has 7 exactly numbers. In this case, used to validate Extra
             * @param {String} value
             * @returns {boolean}
             * @private
             */
            this._extraValidation = function(value) {
                return value.search(/^\d{7}$/) === 0;
            };

            /**
             * Formats a extra that is collected as a Number
             * @param {Number} Extra number
             * @returns {Array} - in a following format [{ n: 1, status: false },{ n: 2, status: false }, etc... ]
             * @private
             */
            this._formatsExtra = function(value) {
                var extraList = value.toString().trim().split(''),
                    formattedExtraList = [];

                for(var i = 0; i < extraList.length; i++) {
                    formattedExtraList.push({n: parseInt(extraList[i], 10), status: false});
                }

                return formattedExtraList;
            };
        });
    }
);