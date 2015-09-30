define([
        'mlcApp',
        'Core/core.controller'
    ], function(
        mlcApp,
        Core649Controller
        ) {
        return mlcApp.controller('Ontario49Controller', ['$scope', '$rootScope', '$controller', function($scope, $rootScope, $controller) {

            // Extending Core649 Controller
            $.extend(this, $controller('Core649Controller', {$scope: $scope}));

            // Which lotto
            $scope.sort = 'ontario49';

            // Title of this lottery
            $scope.sortTitle = 'Ontario 49';

            // the province of the lottery.
            $scope.province = 'on';

            //An array of integers. The format of lastDraw: [6, 26, 41, 42, 47, 48],
            $scope.lastDraw = localStorage['lastDraw_' + $scope.sort] ? angular.fromJson(localStorage['lastDraw_' + $scope.sort]) : [];

            // Last draw's date written
            $scope.dateLastDraw = localStorage['dateLastDraw_' + $scope.sort] ? localStorage['dateLastDraw_' + $scope.sort] : '';

            // The bonus number of this last draw
            $scope.bonusLastDraw = localStorage['bonusLastDraw_' + $scope.sort] ? localStorage['bonusLastDraw_' + $scope.sort] : '';

            // Last draw's date in a yyyy-mm-dd format
            $scope.shortdateLastDraw = localStorage['shortdateLastDraw_' + $scope.sort] ? localStorage['shortdateLastDraw_' + $scope.sort] : '';

            // Extra of last draw in a 0000000 format
            $scope.extraLastDraw = localStorage['extraLastDraw_' + $scope.sort] ? localStorage['extraLastDraw_' + $scope.sort] : '';

            /* An array of objects
             This is the format
             [
             { n: 8, status: false },
             { n: 13, status: false },
             { n: 25, status: false },
             { n: 26, status: true },
             { n: 41, status: true },
             { n: 42, status: true }
             ]*/
            $scope.myNumbers = localStorage['myNumbers_' + $scope.sort] ? angular.fromJson(localStorage['myNumbers_' + $scope.sort]) : [];

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
            //$scope.myExtra = JSON.parse(localStorage.myExtra_lotto649) ? JSON.parse(localStorage.myExtra_lotto649) : {};
            $scope.myExtra = localStorage['myExtra_' + $scope.sort] ? angular.fromJson(localStorage['myExtra_' + $scope.sort]) : {};

            // The messages, depending on how many numbers you matched
            $scope.phrases = {};

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