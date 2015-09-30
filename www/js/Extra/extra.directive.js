'use strict';

define([
        'extra',
        'Extra/extra.controller'
    ],
    function(
        extra
    ) {
        extra.directive('myExtraDirective', function() {
            return {
                restrict: 'EA',
                templateUrl: 'js/Extra/my_extra.html',
                controller: 'ExtraController'
            }
        });
    }
);
