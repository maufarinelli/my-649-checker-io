define([
        'extra'
    ],
    function(
        extra
    ) {
        return extra.controller('ExtraController', ['$scope', '$rootScope', function($scope, $rootScope) {
            // Flag
            $scope.hasMyExtra = false;

            // I18n texts for some UI items
            $scope.extraTitle = translateApp.i18n.i18nTranslated.extra_title[$scope.province];
            $scope.buttonDeleteExtra = translateApp.i18n.i18nTranslated.button_delete;

            /**
             * Checks if we have an extra number saved
             */
            function checkHasMyExtra() {
                if(!_.isEmpty($scope.myExtra)) {
                    $scope.hasMyExtra = true;
                }
            }
            checkHasMyExtra();

            // Watcher: if myExtra model changes
            $rootScope.$watch('myExtra', function() {
                checkHasMyExtra();
            });

            // Event Handler for newExtra event
            $scope.$on('newExtra', function() {
                checkHasMyExtra();
            });

            /**
             * Deletes a Extra number
             */
            $scope.deleteExtra = function() {
                if(window.confirm( translateApp.i18n.i18nTranslated.confirm_delete_extra )) {
                    $scope.removeExtra();
                    $scope.hasMyExtra = false;
                }
            };

        }]);
    }
);