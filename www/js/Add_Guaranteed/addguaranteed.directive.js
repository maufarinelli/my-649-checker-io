'use strict';

define([
        'addGuaranteed',
    ],
    function(
        addGuaranteed
        ) {
        return addGuaranteed.directive('addGuaranteedDirective', function() {
            return {
                restrict: 'EA',
                scope: {
                    sort: '@',
                    buttonAdd: '=',
                    buttonSave: '@',
                    errorMessage: '@',
                    isInputGuaranteedActivated: '=isActivated',
                    isGuaranteedValid: '=',
                    rawMyGuaranteed: '=',
                    saveGuaranteed: '&'
                },
                templateUrl: 'js/Add_Guaranteed/add_guaranteed.html',
                link: function($scope, element, attrs) {
                    /**
                     * Toggles the show/hide input guaranteed
                     */
                    $scope.toggleGuaranteedExtra = function() {
                        $scope.buttonAddGuaranteed = translateApp.i18n.i18nTranslated.button_add_guaranteed;
                        if(!$scope.isInputGuaranteedActivated) {
                            $scope.buttonAddGuaranteed = translateApp.i18n.i18nTranslated.button_hide_field;
                        }
                        $scope.isInputGuaranteedActivated = !$scope.isInputGuaranteedActivated;
                    };
                }
            }
        });
    }
);