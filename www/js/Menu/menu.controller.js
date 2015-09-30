define([
        'mlcApp',
    ],
    function(
        mlcApp
    )
    {
        return mlcApp.controller('MenuController', ['$scope', function($scope) {
            // Flags
            $scope.isMainMenuOpened = false
            $scope.isOntarioMenuOpened = false;
            $scope.isQuebecMenuOpened = false;
            $scope.isLangMenuOpened = false;

            /**
             * Toggles the main manu
             */
            $scope.toggleMenu = function() {
                $scope.isMainMenuOpened = !$scope.isMainMenuOpened;
            };

            /**
             * Opens Ontario submenu
             */
            $scope.openOntarioMenu = function() {
                $scope.isOntarioMenuOpened = true;
                $scope.isQuebecMenuOpened = false;
            };

            /**
             * Opens Quebec submenu
             */
            $scope.openQuebecMenu = function() {
                $scope.isOntarioMenuOpened = false;
                $scope.isQuebecMenuOpened = true;
            };

            /**
             * Opens Languages submenu
             */
            $scope.toggleLangMenu = function() {
                $scope.isLangMenuOpened = !$scope.isLangMenuOpened;
            };
        }]);
    }
);