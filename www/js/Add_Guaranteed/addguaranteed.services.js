'use strict';

define([
        'addGuaranteed'
    ],
    function(
        addGuaranteed
        ) {
        addGuaranteed.service('addGuaranteedServices', function() {
            /**
             * Validates if GUaranteed number has exactly 8 numbers, hyphen, 2 numbers, as the following format: 00000000-00
             * @returns {boolean}
             * @private
             */
           this.extraValidation = function(rawMyGuaranteed) {
                return rawMyGuaranteed.search(/^\d{8}-\d{2}$/) === 0;
            }

            /**
             * Formats a Guaranteed prize number that is collected as a String
             * @returns {Object} - in a following format { n: 00000000-00, status: false }
             * @private
             */
           this.formatsGuaranteed = function(rawMyGuaranteed) {
                return {n: rawMyGuaranteed.trim(), status: false};
           }
        });
    }
);