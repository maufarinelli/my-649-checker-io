define([
        'myNumbers',
    ], function(
        myNumbers
        ) {
        return myNumbers.controller('MyNumbersController', function($scope) {
            // I18n texts for some UI items
            $scope.myNumbersTitle = translateApp.i18n.i18nTranslated.setOfNumbers_title;
            $scope.buttonDelete = 'x';

            // On load, needs to compare numbers again, probably to refrash model
            $scope.compare();

            /**
             * Deletes a set of numbers
             * @param {Event} $event
             */
            $scope.deleteSetOfNumbers = function($event) {
                var id = angular.element($event.currentTarget).attr('id'),
                    index = id.substr(id.lastIndexOf('-')+1);

                // Confirm message before delete Set of Numbers
                if(window.confirm( translateApp.i18n.i18nTranslated.confirm_delete_setOfNumbers )) {
                    $scope.removeNumbers(index);
                    $scope.compare();
                };
            };
        });
    }
);