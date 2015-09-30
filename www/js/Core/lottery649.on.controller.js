define([
    'mlcApp',
    'Core/core.controller',
    'Core/lottery649.controller'
], function(
        mlcApp,
        Core649Controller
    ) {
        return mlcApp.controller('Lottery649ONController', ['$scope', '$rootScope', '$controller', function($scope, $rootScope, $controller) {

            // Extending Core649 Controller
            $.extend(this, $controller('Lottery649Controller', {$scope: $scope}));

            // the province of the lottery. 
            $scope.province = 'on';

            // Extra of last draw in a 0000000 format
            $scope.encoreLastDraw = localStorage['encoreLastDraw_' + $scope.sort] ? localStorage['encoreLastDraw_' + $scope.sort] : '';

            /* An array of objects
             This is the format
             [
             { n: 1, status: false },
             { n: 2, status: false },
             { n: 3, status: false },
             { n: 4, status: true },
             { n: 5, status: true },
             { n: 6, status: true },
             { n: 7, status: true }
             ]*/
            $scope.myExtra = localStorage['myExtra_' + $scope.sort] ? angular.fromJson(localStorage['myExtra_' + $scope.sort]) : {};

            // A flag property. We use ajax to get the last draw, when it is not saved on localStorage. We set it as true when we have last draw to start comparing our numbers
            $scope.readyLastDraw = false;

            /**
             * Initializes the app
             */
            var init = function() {
                $scope.getLastDraw();
            };
            init();
        }]);
    }
);