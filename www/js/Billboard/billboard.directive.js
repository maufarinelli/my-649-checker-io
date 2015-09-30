'use strict';

define([
        'billboard',
        'Billboard/billboard.controller'
    ],
    function(
        billboard
        ) {
        return billboard.directive('billboardDirective', function() {
            return {
                restrict: 'EA',
                templateUrl: 'js/Billboard/billboard.html',
                controller: 'BillboardController'
            }
        });
    }
);