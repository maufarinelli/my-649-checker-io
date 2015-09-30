'use strict';

define([
        'angular',
        'mlcApp',
        'Core/lottery649.qc.controller',
        'Core/lottery649.on.controller',
        'Core/quebec49.controller',
        'Core/ontario49.controller',
    ],
    function(angular, mlcApp) {

        return mlcApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/lottery649-qc', {
                templateUrl: 'templates/base.html',
                controller: 'Lottery649QCController'
            });
            $routeProvider.when('/lottery649-on', {
                templateUrl: 'templates/base.html',
                controller: 'Lottery649ONController'
            });
            $routeProvider.when('/quebec49', {
                templateUrl: 'templates/base.html',
                controller: 'Quebec49Controller'
            });
            $routeProvider.when('/ontario49', {
                templateUrl: 'templates/base.html',
                controller: 'Ontario49Controller'
            });
            $routeProvider.otherwise({
                redirectTo: '/lottery649-qc'
            });
        }]);

    }
);