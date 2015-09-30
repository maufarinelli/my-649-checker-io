define([
        'guaranteed',
    ],
    function(
        guaranteed
    ) {
        return guaranteed.controller('GuaranteedController', function($scope, $rootScope) {
            // Flag
            $scope.hasMyGuaranteed = false;

            // I18n texts for some UI items
            $scope.guaranteedTitle = translateApp.i18n.i18nTranslated.guaranteed_title;
            $scope.buttonDeleteGuaranteed = translateApp.i18n.i18nTranslated.button_delete;

            /**
             * Checks if we have an Guaranteed prize number saved
             */
            function checkHasMyGuaranteed() {
                if(!_.isEmpty($scope.myGuaranteedNumber)) {
                    $scope.hasMyGuaranteed = true;
                }
            }
            checkHasMyGuaranteed();

            // Watcher: if myGuaranteedNumber model changes
            $rootScope.$watch('myGuaranteedNumber', function() {
                checkHasMyGuaranteed();
            });

            // Event Handler for newGuaranteed event
            $scope.$on('newGuaranteed', function() {
                checkHasMyGuaranteed();
            });

            /**
             * Deletes a Guaranteed prize number
             */
            $scope.deleteGuaranteed = function() {
                if(window.confirm( translateApp.i18n.i18nTranslated.confirm_delete_guaranteed )) {
                    $scope.removeGuaranteed();
                    $scope.hasMyGuaranteed = false;
                }
            };
        });
    }
);