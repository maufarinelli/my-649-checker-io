define([
        'billboard'
    ],
    function(
        billboard
    ) {
        return billboard.controller('BillboardController', function($scope) {
            // Phrase for myNumbers, Extra and Guaranteed prize
            $scope.phrasesMyNumber = [];
            $scope.phraseExtra = {};
            $scope.phraseGuaranteed = {};

            // Watcher, to handle every change
            $scope.$watch('myNumbers.length', _phrasesMyNumbersConstructor);
            $scope.$watch('myExtra', _phasesExtraConstructor, true);
            $scope.$watch('myGuaranteedNumber', _phasesGuaranteedConstructor, true);

            // Event Handler for deleted-extra event
            $scope.$on('deleted-extra', function() {
                $scope.phraseExtra = {};
            });

            // Event Handler for deleted-guaranteed event
            $scope.$on('deleted-guaranteed', function() {
                $scope.phraseGuaranteed = {};
            });

            /**
             * My Numbers phrases constructor
             */
            function _phrasesMyNumbersConstructor() {
                // Everytime we need to rebuild it, we need to reset the array before
                $scope.phrasesMyNumber = [];

                // Do the job for each set of numbers
                _.each($scope.myNumbers, function(setOfNumbers, index) {
                    var howManyMatches = 0;

                    // Set how many matches we have for a set of number
                    angular.forEach(setOfNumbers, function(number) {
                        if(number.status === true) {
                            howManyMatches++;
                        }
                    });

                    // if 2 or 5 matches, we need to see if we match also the bonus number
                    if(howManyMatches === 2 || howManyMatches === 5) {
                        var bonus = localStorage['bonusLastDraw_' + $scope.sort];

                        angular.forEach(setOfNumbers, function(number) {
                            if(number.n === parseInt(bonus, 10)) {
                                howManyMatches += 'C';
                            }
                        });
                    }

                    // If there is at least one number matched, we push the phrase
                    if(howManyMatches !== 0) {
                        var phrase = translateApp.i18n.i18nTranslated[$scope.sort + '_phrases'][howManyMatches];

                        $scope.phrasesMyNumber.push({
                            index: index,
                            phrase: phrase.format(index)
                        });
                    }
                });
            }

            /**
             * My Numbers phrases constructor
             */
            function _phasesExtraConstructor() {
                var iReverseExtraIndex = 6;
                /**
                * Recursive function to fill aInverse
                **/
                function recurInverseMessage() {
                    if (iReverseExtraIndex === -1) {
                        return;
                    }
                    else if($scope.myExtra[iReverseExtraIndex].status === true) {
                        iReverseExtraCompare++;
                        iReverseExtraIndex--;
                        recurInverseMessage();
                    }
                    else {
                        return;
                    }
                }

                var iExtraIndex = 0;
                /**
                * Recursive function to fill aNormal
                **/
                function recurNormalMessage() {
                    if(iExtraIndex === $scope.myExtra.length) {
                        return;
                    }
                    else if($scope.myExtra[iExtraIndex].status === true) {
                        iExtraCompare++;
                        iExtraIndex++;
                        recurNormalMessage();
                    }
                    else {
                        return;
                    }
                }

                var phraseIndex = $scope.province === 'qc' ? 'Extra' : 'Encore';
                // Do the job only if there is a extra number
                if(!$.isEmptyObject($scope.myExtra)) {
                    var iExtraCompare = 0;
                    var iReverseExtraCompare = 0;
                    if($scope.myExtra[0].status === true && $scope.myExtra[6].status === true) {
                        recurNormalMessage();

                        var messageIdx = iExtraCompare >= 5 ? iExtraCompare : 'X';
                            messageIdx += 'Extra';

                        if(messageIdx !== '1Extra') {
                            $scope.phraseExtra = {
                                index: phraseIndex,
                                phrase: translateApp.i18n.i18nTranslated[$scope.sort + '_phrases'][messageIdx]
                            };
                        }
                    }
                    else if($scope.myExtra[6].status === true) {
                        recurInverseMessage();

                        var messageInverseIdx = iReverseExtraCompare >= 5 ? iReverseExtraCompare : 'X';
                            messageInverseIdx += 'ExtraI';

                        $scope.phraseExtra = {
                            index: phraseIndex,
                            phrase: translateApp.i18n.i18nTranslated[$scope.sort + '_phrases'][messageInverseIdx]
                        };
                    }
                    else if($scope.myExtra[0].status === true) {
                        recurNormalMessage();

                        var messageNormalIdx = iExtraCompare >= 5 ? iExtraCompare : 'X';
                            messageNormalIdx += 'Extra';

                        if(messageNormalIdx !== '1Extra') {
                            $scope.phraseExtra = {
                                index: phraseIndex,
                                phrase: translateApp.i18n.i18nTranslated[$scope.sort + '_phrases'][messageNormalIdx]
                            };
                        }
                    }
                    else {
                        $scope.phraseExtra = {};
                    }
                }
            }

            /**
             * My Numbers phrases constructor
             */
            function _phasesGuaranteedConstructor() {
                // Only if it is the national 649
                if($scope.sort === 'lotto649' && $scope.myGuaranteedNumber.status) {
                    $scope.phraseGuaranteed = {
                        index: 'Guaranteed prize',
                        phrase: translateApp.i18n.i18nTranslated[$scope.sort + '_phrases'].guaranteed
                    };
                }
            }
        });
    }
);