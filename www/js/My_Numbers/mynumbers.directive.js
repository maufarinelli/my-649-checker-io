'use strict';

define([
        'myNumbers',
        'My_Numbers/mynumbers.controller'
    ],
    function(
        myNumbers
        ) {
        myNumbers.directive('myNumbersDirective', function() {
            return {
                restrict: 'EA',
                templateUrl: 'js/My_Numbers/my_numbers.html',
                controller: 'MyNumbersController'
            }
        });
    }
);