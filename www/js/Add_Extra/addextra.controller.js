'use strict';

define([
    'addExtra',
    'Add_Extra/addextra.services'
    ],
    function(
        addExtra
    ) {
        return addExtra.controller('AddExtraController', ['$scope', 'addExtraServices', function($scope, addExtraServices) {
            // Flags
            $scope.isInputExtraActivated = false;
            $scope.isExtraValid = true;

            // I18n texts for some UI items
            $scope.errorMessageExtra = translateApp.i18n.i18nTranslated.error_message_extra;
            $scope.buttonSaveExtra = translateApp.i18n.i18nTranslated.button_save;

            function setButtonAdd() {
                $scope.buttonAddExtra = translateApp.i18n.i18nTranslated.button_add_extra;
                if($scope.province === 'on') {
                    $scope.buttonAddExtra = translateApp.i18n.i18nTranslated.button_add_encore;
                }
            }
            setButtonAdd();

            // The Extra collected from the input entry
            $scope.rawMyExtra = '';

            /**
             * Saves the extra number
             */
            $scope.saveExtra = function() {
                var validate = addExtraServices._extraValidation($scope.rawMyExtra);

                if(validate) {
                    // If there is a extra number saved, we show a confirm message
                    if(localStorage['myExtra_' + $scope.sort]) {
                        if(window.confirm(translateApp.i18n.i18nTranslated.confirm_override_extra)) {
                            $scope._actionAddNewExtra();
                        }
                    }
                    else {
                        $scope._actionAddNewExtra();
                    }
                    $scope.isInputExtraActivated = false;
                    setButtonAdd();
                }
                else {
                    $scope.isExtraValid = false;
                }
            };

            /**
             * Adds a new extra number
             * @private
             */
            $scope._actionAddNewExtra = function() {
                var formattedExtra = addExtraServices._formatsExtra($scope.rawMyExtra);

                $scope.isExtraValid = true;
                $scope.addNewExtra(formattedExtra);
                $scope.compareExtra();
            };
            
        }]);
    }
);