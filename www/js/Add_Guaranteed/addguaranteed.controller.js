'use strict';

define([
        'addGuaranteed',
        'Add_Guaranteed/addguaranteed.services'
    ],
    function(
        addGuaranteed
    ) {
        return addGuaranteed.controller('AddGuaranteedController', ['$scope', 'addGuaranteedServices', function($scope, addGuaranteedServices) {
            // Flags
            $scope.isInputGuaranteedActivated = false;
            $scope.isGuaranteedValid = true;

            // I18n texts for some UI items
            $scope.buttonAddGuaranteed = translateApp.i18n.i18nTranslated.button_add_guaranteed;
            $scope.errorMessageGuaranteed = translateApp.i18n.i18nTranslated.error_message_guaranteed;
            $scope.buttonSaveGuaranteed = translateApp.i18n.i18nTranslated.button_save;

            // The Guaranteed collected from the input entry
            $scope.rawMyGuaranteed = '';

            /**
             * Saves the Guaranteed prize number
             */
            $scope.saveGuaranteed = function() {
                var validate = addGuaranteedServices.extraValidation($scope.rawMyGuaranteed);

                if(validate) {
                    if(localStorage['myGuaranteedNumber_' + $scope.sort]) {
                        if(window.confirm(translateApp.i18n.i18nTranslated.confirm_override_guaranteed)) {
                            _actionAddNewGuaranteed();
                        }
                    }
                    else {
                        _actionAddNewGuaranteed();
                    }
                    $scope.isInputGuaranteedActivated = false;
                    $scope.buttonAddGuaranteed = translateApp.i18n.i18nTranslated.button_add_guaranteed;
                }
                else {
                    $scope.isGuaranteedValid = false;
                }
            };

            /**
             * Adds a new guaranteed prize number
             * @private
             */
            function _actionAddNewGuaranteed() {
                var oGuaranteed = addGuaranteedServices.formatsGuaranteed($scope.rawMyGuaranteed);

                $scope.isGuaranteedValid = true;
                $scope.addNewGuaranteed(oGuaranteed);
                $scope.compareGuaranteed();
            }

        }]);
    }
);