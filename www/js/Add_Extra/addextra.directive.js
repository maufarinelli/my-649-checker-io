'use strict';

define([
    'addExtra'
    ],
    function(
        addExtra
    ) {
        return addExtra.directive('addExtraDirective', function() {
            return {
                restrict: 'EA',
                transclude: true,
                scope: {
                    province: '@',
                    buttonAdd: '=',
                    buttonSave: '@',
                    errorMessage: '@',
                    isInputExtraActivated: '=isActivated',
                    isExtraValid: '=',
                    rawMyExtra: '=',
                    saveExtra: '&'
                },
                templateUrl: 'js/Add_Extra/add_extra.html',
                link: function($scope, element, attrs) {
                    /**
                     * Toggles the show/hide input extra
                     */
                    $scope.toggleInputExtra = function() {
                        $scope.buttonAdd = translateApp.i18n.i18nTranslated.button_add_extra;
                        if($scope.province === 'on') {
                            $scope.buttonAdd = translateApp.i18n.i18nTranslated.button_add_encore;
                        }
                        
                        if(!$scope.isInputExtraActivated) {
                            $scope.buttonAdd = translateApp.i18n.i18nTranslated.button_hide_field;
                        }
                        $scope.isInputExtraActivated = !$scope.isInputExtraActivated;
                    };
                }
            }
        });
    }
);