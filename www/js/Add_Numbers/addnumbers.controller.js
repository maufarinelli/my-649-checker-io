define([
        'addNumbers',
        'Add_Numbers/addnumbers.service'
    ], function(
        addNumbers
        ) {
        return addNumbers.controller('AddNumbersController', ['$scope', 'addNumbersServices', function($scope, addNumbersServices) {
            // Flags
            $scope.isKeyboardActivated = false;
            $scope.isSelectedNumbersExceeded = false;

            // All selected number's buttons will be pushed on it
            $scope.buttonsSelectedModel = [];

            /**
            * Save a set of numbers
            */
            $scope.saveNumbers = function() {
                //var newNumbersArray = [];

                if(addNumbersServices.checkSelectedExactly6Numbers($scope.buttonsSelectedModel)) {
                    // Push a new numbers with status false into newNumbersArray
                    var newNumbersArray = addNumbersServices.getNewNumbersArray($scope.buttonsSelectedModel);

                    // Add new numbers to the main lottery controller and compare
                    $scope.addNewNumbers(newNumbersArray);
                    $scope.compare();

                    //$scope.resetChooseNumbersButtons();
                    $scope.$broadcast('reset');
                    $scope.buttonsSelectedModel = [];
                }
                else {
                    $scope.isSelectedNumbersExceeded = true;
                }
            };

            /**
            * Deletes all set of numbers
            */
            $scope.deleleAllNumbersSet = function() {
                if(window.confirm( translateApp.i18n.i18nTranslated.confirm_delete_all )) {
                    $scope.removeAllNumber();
                }
            };
        }]);
    }
);