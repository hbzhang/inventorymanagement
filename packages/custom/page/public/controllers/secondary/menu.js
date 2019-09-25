/**
 * Created by hbzhang on 11/4/16.
 */
'use strict';

angular.module('mean.page').controller('PageMenuController', [
    '$location','$rootScope',
    '$scope','Global','$http','Program',
    'formtoaster','Restangular','PageMenuData',
    function($location,$rootScope,$scope,Global,$http,Program,formtoaster,
             Restangular,PageMenuData) {
        $scope.global = Global;

        $scope.rootprogram = $location.path().split('/')[3];

        $scope.menus = PageMenuData.menu;

        // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
            });
        };

        $rootScope.$on('loggedin', function() {

            //queryMenu('admin', defaultAdminMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

        //update program drop down list, but not sure why it does not appear to work
        $rootScope.$on('ProrgamUpdated', function(event, args) {

            $scope.getprograms();
        });

        //var programs = Restangular.all('program');

        $scope.getprograms = function() {
            $scope.allPrograms = []; $scope.allProgramNames = [];
            $scope.secondaryPorgrams = []; var el;
            $scope.uniqueAllPrograms = [];
            Restangular.all('program').getList().then(function(programs) {
                //$scope.dd = programs;
                _.each(programs, function(value) {
                    _.each(value.name, function(singlevalue) {

                            $scope.programarray = Program.programarray(singlevalue.name, '-');

                            if (singlevalue.name.indexOf('-') !== -1) {
                                el = {
                                    'name': singlevalue.name.substr(0, singlevalue.name.indexOf('-')),
                                    'first_child': Program.get_first_child_program($scope.programarray, singlevalue.name)
                                };
                                $scope.allProgramNames.push(singlevalue.name.substr(0, singlevalue.name.indexOf('-')));
                                $scope.allPrograms.push(el);

                            }
                            else {

                                $scope.allProgramNames.push(singlevalue.name);
                                $scope.allPrograms.push(el);

                            }

                            //http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
                            $scope.allPrograms = $scope.allPrograms.filter(function(item, pos) {
                                return  $scope.allProgramNames.indexOf(item.name) == pos;
                            });

                            $scope.uniqueAllPrograms=  $scope.allPrograms; //.slice(0);

                            console.log($scope.uniqueAllPrograms);
                            console.log('$scope.uniqueAllPrograms');

                            $scope.uniqueAllPrograms.sort(
                                function(a,b){
                                    // return $scope.uniqueAllPrograms[a]-$scope.uniqueAllPrograms[b]
                                    var x = a.name.toLowerCase();
                                    var y = b.name.toLowerCase();
                                    return x < y ? -1 : x > y ? 1 : 0;

                                }
                            );
                    });
                });




            });
        }();


        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]);

