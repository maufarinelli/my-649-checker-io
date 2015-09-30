'use strict';

define('mlcApp',
    [
        'angular',
        'angularRoute',
        'ionic',
        'addExtra',
        'addGuaranteed',
        'addNumbers',
        'billboard',
        'extra',
        'guaranteed',
        'lastdraw',
        'myNumbers'
    ],
    function(angular) {
        return angular.module('mlcApp', [
            'ngRoute',
            'ionic',
            'addExtra',
            'addGuaranteed',
            'addNumbers',
            'billboard',
            'extra',
            'guaranteed',
            'lastdraw',
            'myNumbers'
        ])
        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if(window.cordova && window.cordova.plugins.Keyboard) {
                  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if(window.StatusBar) {
                  StatusBar.styleDefault();
                }
            });
        });
    }
);