'use strict';

define([
        'addNumbers'
    ],
    function(addNumbers) {
        addNumbers.service('addNumbersServices', function() {
            var that = this;

            /**
             * Checks if selected numbers exceeded maximum of 6
             */
            this.checkSelectedNumbersExceeded = function(buttonsSelected) {
                var check = false;
                if(buttonsSelected.length > 6) {
                    check = true;
                }
                return check;
            };

            /**
             * Checks if user has selected exactly 6 numbers
             */
            this.checkSelectedExactly6Numbers = function(buttonsSelected) {
                var check = true;
                if(buttonsSelected.length !== 6) {
                    check = false;
                }
                return check;
            };

            /**
             * Constructor for all choose numbers buttons
             * @return Array containing all buttons' objects
             */
            this.buttonsChooseNumbersConstructor = function() {
                var buttonsChooseNumbers = [];

                for(var i = 1; i < 50; i++) {
                    var button = {};
                    button.text = i < 10 ? '0' + i : i;
                    button.value = i;
                    buttonsChooseNumbers.push(button);
                }

                return buttonsChooseNumbers;
            };

            /**
             * Remove a button from the buttonSelectedModel Array
             * @param {Array of Numbers}  buttonSelectedModel - the buttonSelectedModel Array
             * @param {String} buttonValue - the button value of the button to be removed
             */
            this.removeButtonFromModel = function(buttonSelectedModel, buttonValue) {
                _.remove(buttonSelectedModel, function(num){
                    return num === parseInt(buttonValue, 10);
                });
            };

            /**
             * Gets the numbers array formatted, with each index in the following format {n: number, status: false}
             * @param buttonsSelectedModel - the buttonSelectedModel Array containing only teh numbers
             * @returns {Array}
             */
            this.getNewNumbersArray = function(buttonsSelectedModel) {
                var newNumbersArray = [];

                _.each(buttonsSelectedModel, function(number) {
                    var val = {n: number, status: false};
                    newNumbersArray.push(val);
                });

                return newNumbersArray;
            }
        });
    }
);