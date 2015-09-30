'use strict';

define([
        'addNumbers',
        'Add_Numbers/addnumbers.service'
    ],
    function(
        addGuaranteed
        ) {
        return addGuaranteed.directive('addNumbersDirective', ['addNumbersServices', function(addNumbersServices) {
            return {
                restrict: 'EA',
                scope: {
                    isKeyboardActivated: '=isActivate',
                    isSelectedNumbersExceeded: '=isSelectedExceeded',
                    buttonsSelectedModel: '=',
                    deleleAllNumbersSet: '&',
                    saveNumbers: '&'

                },
                templateUrl: 'js/Add_Numbers/add_numbers.html',
                link: function($scope, element, attrs) {
                    // I18n texts for some UI items
                    $scope.addNumbersButton = translateApp.i18n.i18nTranslated.button_add_numbers;
                    $scope.deleteAllNumbersButton = translateApp.i18n.i18nTranslated.button_delete_all;
                    $scope.saveNumbersButton = translateApp.i18n.i18nTranslated.button_save;
                    $scope.errorMessageSetNumbers = translateApp.i18n.i18nTranslated.error_message_set_numbers;

                    // Array containing all buttons' objects
                    $scope.buttonsChooseNumbers = addNumbersServices.buttonsChooseNumbersConstructor();

                    // All selected number's buttons will be pushed on it
                    $scope.buttonsSelectedModel = [];

                    /**
                     * Selects or unselects a numbers
                     * {event} $event - The click event
                     */
                    $scope.selectedNumber = function($event) {
                        var button = $event.currentTarget,
                            selectedStatus = angular.element(button).data('button-selected'),
                            value = angular.element(button).val();

                        // If clicked button was already selected, reset it
                        if(selectedStatus) {
                            $scope.resetAChooseNumberButton(button);
                            addNumbersServices.removeButtonFromModel($scope.buttonsSelectedModel, value);
                        }
                        else {
                            // Select a button
                            angular.element(button).data('button-selected', true);
                            angular.element(button).removeClass('btn-default').addClass('btn-success');

                            // Insert its value into the buttonsSelectedModel and sort ASC too
                            $scope.buttonsSelectedModel.push(parseInt(value, 10));
                            $scope.buttonsSelectedModel = _.sortBy($scope.buttonsSelectedModel);
                        }

                        $scope.isSelectedNumbersExceeded = addNumbersServices.checkSelectedNumbersExceeded($scope.buttonsSelectedModel);
                    };

                    /**
                     * Toggles the choose numbers keyboard
                     */
                    $scope.toggleKeyboard = function() {
                        $scope.addNumbersButton = translateApp.i18n.i18nTranslated.button_add_numbers;
                        if(!$scope.isKeyboardActivated) {
                            $scope.addNumbersButton = translateApp.i18n.i18nTranslated.button_hide;
                        }
                        $scope.isKeyboardActivated = !$scope.isKeyboardActivated;
                    };

                    /**
                     * SCOPE OR PRIVATE?
                     * Resets all choose numbers buttons
                     */
                    $scope.resetChooseNumbersButtons = function() {
                        $('.btn-choose-numbers').each(function(index, button) {
                            $scope.resetAChooseNumberButton(button);
                        });
                    };

                    /**
                     * SCOPE OR PRIVATE?
                     * Resets a choose numbers button
                     */
                    $scope.resetAChooseNumberButton = function(button) {
                        angular.element(button).data('button-selected', false);
                        angular.element(button).removeClass('btn-success').addClass('btn-default');
                    };

                    $scope.$on('reset', function() {
                        $scope.resetChooseNumbersButtons();
                    });
                }
            }
        }]);
    }
);