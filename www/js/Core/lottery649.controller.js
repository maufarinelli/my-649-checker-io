define([
    'mlcApp',
    'Core/core.controller'
], function(
        mlcApp,
        Core649Controller
    ) {
        return mlcApp.controller('Lottery649Controller', ['$scope', '$rootScope', '$controller', function($scope, $rootScope, $controller) {

            // Extending Core649 Controller
            $.extend(this, $controller('Core649Controller', {$scope: $scope}));

            // Which lotto
            $scope.sort = 'lotto649';

            // Title of this lottery
            $scope.sortTitle = 'Lotto 649';

            //An array of integers. The format of lastDraw: [6, 26, 41, 42, 47, 48],
            $scope.lastDraw = localStorage['lastDraw_' + $scope.sort] ? angular.fromJson(localStorage['lastDraw_' + $scope.sort]) : [];

            // Last draw's date written
            $scope.dateLastDraw = localStorage['dateLastDraw_' + $scope.sort] ? localStorage['dateLastDraw_' + $scope.sort] : '';

            // The bonus number of this last draw
            $scope.bonusLastDraw = localStorage['bonusLastDraw_' + $scope.sort] ? localStorage['bonusLastDraw_' + $scope.sort] : '';

            // Last draw's date in a yyyy-mm-dd format
            $scope.shortdateLastDraw = localStorage['shortdateLastDraw_' + $scope.sort] ? localStorage['shortdateLastDraw_' + $scope.sort] : '';

            // Guaranteed prize of last draw in a 00000000-00 format
            $scope.guaranteedLastDraw = localStorage['guaranteedLastDraw_' + $scope.sort] ? localStorage['guaranteedLastDraw_' + $scope.sort] : '';

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

            // The Guaranteed Prize in the format { n: '00000000-00', status: false }
            $scope.myGuaranteedNumber = localStorage['myGuaranteedNumber_' + $scope.sort] ? angular.fromJson(localStorage['myGuaranteedNumber_' + $scope.sort]) : {};

            // The messages, depending on how many numbers you matched
            $scope.phrases = {};

            // A flag property. We use ajax to get the last draw, when it is not saved on localStorage. We set it as true when we have last draw to start comparing our numbers
            $scope.readyLastDraw = false;

            /**
             * Add a new guaranteed number
             * @param {object} newGuaranteed - object with guaranteed number and its status
             **/
            $scope.addNewGuaranteed = function(newGuaranteed) {
                $scope.myGuaranteedNumber = newGuaranteed;
                localStorage['myGuaranteedNumber_'+ $scope.sort] = angular.toJson($scope.myGuaranteedNumber);
                $scope.$broadcast('newGuaranteed');
            };

            /**
             * Delete an guaranteed number
             **/
            $scope.removeGuaranteed = function() {
                $scope.myGuaranteedNumber = {};
                localStorage.removeItem('myGuaranteedNumber_'+ $scope.sort);
                $scope.$broadcast('deleted-guaranteed');
            };

            /**
             * Compares the guaranteed number with the guaranteed prize of the last draw
             **/
            $scope.compareGuaranteed = function() {
                var sort = $scope.sort,
                    myGuaranteed = $scope.myGuaranteedNumber,
                    guaranteedLastDraw = localStorage['guaranteedLastDraw_' + sort];

                if(myGuaranteed.n === guaranteedLastDraw) {
                    myGuaranteed.status = true;
                }

                $scope.myGuaranteedNumber = myGuaranteed;
                localStorage['myGuaranteedNumber_' + sort] = angular.toJson($scope.myGuaranteedNumber);
            };
        }]);
    }
);