define([
    'addExtra',
    'Add_Extra/addextra.controller',
    'Add_Extra/addextra.directive',

    'addGuaranteed',
    'Add_Guaranteed/addguaranteed.controller',
    'Add_Guaranteed/addguaranteed.directive',

    'addNumbers',
    'Add_Numbers/addnumbers.controller',
    'Add_Numbers/addnumbers.directive',

    'billboard',
    'Billboard/billboard.controller',
    'Billboard/billboard.directive',

    'extra',
    'Extra/extra.controller',
    'Extra/extra.directive',

    'guaranteed',
    'Guaranteed/guaranteed.controller',
    'Guaranteed/guaranteed.directive',

    'lastdraw',
    'Last_Draw/lastdraw.controller',

    'myNumbers',
    'My_Numbers/mynumbers.controller',
    'My_Numbers/mynumbers.directive',

    'mlcApp'
    ], function(
        mlcApp
    ) {
        return mlcApp.controller('Core649Controller', ['$scope', '$rootScope', '$controller', function($scope, $rootScope, $controller) {

            // init LastDRawController before call its template
            $controller('LastDrawController', {$scope: $scope});
            $scope.templateLastDraw = 'js/Last_Draw/last_draw.html';

            /**
            * Add a new set of numbers
            * @param {array} newNumbers - array with a set of numbers
            **/
            $scope.addNewNumbers = function(newNumbers) {
                $scope.myNumbers.push(newNumbers);
                localStorage['myNumbers_'+ $scope.sort] = angular.toJson($scope.myNumbers);
            };

            /**
            * Delete a set of numbers
            * @param {int} idx - the set of numbers' index we need to delete from myNumbers array
            **/
            $scope.removeNumbers = function(idx) {
                $scope.myNumbers.splice(idx, 1);
                localStorage['myNumbers_'+ $scope.sort] = angular.toJson($scope.myNumbers);
            };

            /**
             * Delete all set of numbers
             **/
            $scope.removeAllNumber = function() {
                localStorage.removeItem('myNumbers_'+ $scope.sort);
                $scope.myNumbers = [];
            };

            /**
            * Add a new extra number
            * @param {string} newExtra - string with extra number
            **/
            $scope.addNewExtra = function(newExtra) {
                $scope.myExtra = newExtra;
                localStorage['myExtra_'+ $scope.sort] = angular.toJson($scope.myExtra);
                $scope.$broadcast('newExtra');
            };

            /**
            * Delete an extra number
            **/
            $scope.removeExtra = function() {
                $scope.myExtra = {};
                localStorage.removeItem('myExtra_'+ $scope.sort);
                $scope.$broadcast('deleted-extra');
            };

            /**
            * To get the last draw
            **/
            $scope.getLastDraw = function() {
                var sort = $scope.sort,

                    date = new Date(),
                    day = date.getDate().toString().length == 1 ? '0' + date.getDate().toString() : date.getDate(),
                    month = date.getMonth() !== 9 && date.getMonth().toString().length == 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
                    dataformated = date.getFullYear() +''+ month +''+ day;

                if(typeof localStorage['lastDraw_' + sort] !== 'undefined' && typeof localStorage['shortdateLastDraw_' + sort] !== 'undefined') {
                    var howManyDays = dataformated - localStorage['shortdateLastDraw_' + sort].replace(/-/g, '');

                    // Sunday after 23h
                    if(howManyDays === 3 && date.getDay() === 6 && date.getHours() >= 23) {
                        _ajaxCallLastDraw();
                    }
                    // Monday and the user has not check it sunday
                    else if(howManyDays === 4 && date.getDay() === 0) {
                        _ajaxCallLastDraw();
                    }
                    // Wednesday after 23h
                    else if(howManyDays === 4 && date.getDay() !== 0 && date.getHours() >= 23) {
                        _ajaxCallLastDraw();
                    }
                    // More the 5 days without consult
                    else if (howManyDays >= 5) {
                        _ajaxCallLastDraw();
                    }
                    // Otherwise, Last Draw is in localStorage
                    else {
                        $scope.readyLastDraw = true;
                    }
                }
                else {
                    _ajaxCallLastDraw();
                }
            };

            /**
             * Gets the Last Draw from the server side
             * @private
             */
            function _ajaxCallLastDraw() {
                var url = 'http://farinelliwebdesign.com/lottery/lotto649/lastdraw_649.php',
                    lastdraw = [],
                    sort = $scope.sort;

                $.ajax({
                    url: url,
                    type: 'GET',
                    success: function(data) {
                        var decoded = angular.fromJson(data);

                        var sorted = decoded[sort];

                        // Pushing all 6 numbers inside lastdraw array
                        for(var i=0; i < 6; i++) {
                            lastdraw.push(parseInt(sorted['Number'+i], 10));
                        }

                        /**
                         * Sets/Updates all last draw scope values and Sets/Updates localStorage
                         */
                        function lastDrawCreateLocalStorage() {
                            $scope.lastDraw = lastdraw;
                            $scope.dateLastDraw = sorted.Date;
                            $scope.shortdateLastDraw = sorted.Shortdate;
                            $scope.bonusLastDraw = sorted.Bonus;

                            localStorage['lastDraw_' + sort] = angular.toJson($scope.lastDraw);
                            localStorage['bonusLastDraw_' + sort] = $scope.bonusLastDraw;
                            localStorage['shortdateLastDraw_' + sort] = $scope.shortdateLastDraw;
                            localStorage['dateLastDraw_' + sort] = $scope.dateLastDraw;

                            if(sorted.Extra) {
                                $scope.extraLastDraw = sorted.Extra.slice(0, 7);
                                localStorage['extraLastDraw_'+ sort] = $scope.extraLastDraw;
                            }

                            if(sorted.Encore) {
                                $scope.encoreLastDraw =  sorted.Encore.slice(0, 7);
                                localStorage['encoreLastDraw_'+ sort] = $scope.encoreLastDraw;
                            }

                            // only if it has Guaranteed prize number
                            if(sorted.Guaranteed) {
                                $scope.guaranteedLastDraw = sorted.Guaranteed.trim();
                                localStorage['guaranteedLastDraw_' + sort] = $scope.guaranteedLastDraw;
                            }

                            // set flag readyLastDraw to true
                            $scope.readyLastDraw = true;
                            $rootScope.$apply();

                            // Compare everything again
                            $scope.compare();
                            if(!_.isEmpty($scope.myExtra)) {
                                $scope.compareExtra();
                            }

                            if($scope.sort === 'lotto649') {
                                $scope.compareGuaranteed();
                            }

                        }

                        // If there is no lastDraw on localStorage, we set and create it
                        if( typeof localStorage['lastDraw_' + sort] === 'undefined') {
                            lastDrawCreateLocalStorage();
                        }
                        // If we receive the same numbers that we have on localStorage, it means that website if new numbers is not updated yet.
                        // In this case, there is no last draw yet, so we do not update anything for it
                        else if( !lastdraw.compare(angular.fromJson(localStorage['lastDraw_' + sort])) ) {
                            lastDrawCreateLocalStorage();
                        }

                        // / Other
                        /*else {
                            $scope.readyLastDraw = true;
                        }*/

                    },
                    // Error probably if there is no internet connection
                    error: function(data, errorString) {
                        if(errorString) {
                            window.alert('An error occurred and the last draw has not be fetched. Please check your internet connection.');
                        }
                    }
                });
            }

            /**
             * Compares each set of numbers with the last draw
             **/
            $scope.compare = function() {
                var myNumbers = $scope.myNumbers;

                for(var i = 0; i < myNumbers.length; i++) {

                    for(var j = 0; j < myNumbers[i].length; j++) {
                        myNumbers[i][j].status = false;

                        for(var l = 0; l < $scope.lastDraw.length; l++) {
                            if(myNumbers[i][j].n === $scope.lastDraw[l]) {
                                myNumbers[i][j].status = true;
                            }
                        }
                    }
                }

                $scope.myNumbers = myNumbers;
                localStorage['myNumbers_' + $scope.sort] = angular.toJson($scope.myNumbers);
            };

            /**
             * Compares the extra number with the extra of the last draw
             **/
            $scope.compareExtra = function() {
                var sort = $scope.sort,
                    province = $scope.province,
                    myExtra = $scope.myExtra,
                    aExtraLastDraw = $scope.province === 'on' ? $scope.encoreLastDraw.split('') : $scope.extraLastDraw.split('');

                // Comparing with aExtraLastDraw
                for(var i = 0; i < aExtraLastDraw.length; i++) {
                    if(parseInt(myExtra[i].n, 10) === parseInt(aExtraLastDraw[i], 10)) {
                        myExtra[i].status = true;
                    }
                    else {
                        myExtra[i].status = false;
                    }
                }

                /**
                 * Arrays to compare Extra
                 **/
                // Array to be filled from 0 to 6, index start from 0
                var aNormal = [],
                    idx = 0,

                // Array to be filled from 6 to 0, index start from 6
                    aInverse = [],
                    inverseIdx = myExtra.length - 1;

                /**
                 * Recursive function to fill aInverse
                 **/
                function recurInverseEvaluate() {
                    if (inverseIdx === -1) {
                        return;
                    }
                    else if(myExtra[inverseIdx].status === true) {
                        aInverse.push(inverseIdx);
                        inverseIdx--;
                        recurInverseEvaluate();
                    }
                    else {
                        return;
                    }
                }

                /**
                 * Recursive function to fill aNormal
                 **/
                function recurNormalEvaluate() {
                    if(idx === myExtra.length) {
                        return;
                    }
                    else if(myExtra[idx].status === true) {
                        aNormal.push(idx);
                        idx++;
                        recurNormalEvaluate();
                    }
                    else {
                        return;
                    }
                }

                recurInverseEvaluate();
                recurNormalEvaluate();

                if(province === 'qc') {
                    $scope.compareExtraQC(myExtra, aNormal, aInverse);
                }
                else if(province === 'on') {

                }

                $scope.myExtra = myExtra;
                localStorage['myExtra_' + sort] = JSON.stringify($scope.myExtra);
            };

            /**
             * Comparing both arrays. The one that has less values, it means we have matched more numbers in another sense.
             * Ex: aNormal has 4 values and aInverse has 2. So as the prize is better for 4 numbers matched, we set a false the numbers of the other sense.
             * Note: if we have equal length for both array, we can have 3 = 3, 0 = 0 or the full number 7 = 7. In those cases we keep true of those numbers
             **/
            $scope.compareExtraQC = function(myExtra, aNormal, aInverse) {
                if(aNormal.length > aInverse.length) {
                    for (var j = 0; j < aInverse.length; j++) {
                        myExtra[aInverse[j]].status = false;
                    }

                    // To the case of we have the 6th number as true, we need to put it a false
                    if(aInverse.length === 0 && aNormal.length !== 6 && myExtra[5].status === true) {
                        myExtra[5].status = false;
                    }
                }
                else if(aInverse.length > aNormal.length) {
                    for (var l = 0; l < aNormal.length; l++) {
                        myExtra[aNormal[l]].status = false;
                    }

                    // To the case of we have the 2nd number as true, we need to put it a false
                    if(aNormal.length === 0 && aInverse.length !== 6 && myExtra[1].status === true) {
                        myExtra[1].status = false;
                    }
                }
            };
        }]);
    }
);