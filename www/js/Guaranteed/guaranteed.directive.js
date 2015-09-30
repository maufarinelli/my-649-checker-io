'use strict';

define([
        'guaranteed',
        'Guaranteed/guaranteed.controller'
    ],
    function(
        guaranteeed
        ) {
        guaranteeed.directive('myGuaranteedDirective', function() {
            return {
                restrict: 'EA',
                templateUrl: 'js/Guaranteed/my_guaranteed.html',
                controller: 'GuaranteedController'
            }
        });
    }
);