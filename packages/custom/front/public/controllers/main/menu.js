/**
 * Created by hbzhang on 3/17/15.
 */
'use strict';

angular.module('mean.front').controller('MenuController', [
    '$location','$rootScope',
    '$scope','Global','$http','Program',
    'formtoaster','Restangular','MenuFactory','Menus',
    function($location,$rootScope,$scope,Global,$http,Program,formtoaster,
             Restangular,MenuFactory,Menus) {
        $scope.global = Global;

        $scope.getClass = function (path) {
            return ($location.path().substr(0, path.length) === path) ? 'activelink' : '';
        };

        $scope.setActive = function(menuItem) {
            $scope.activeMenu = menuItem
        };

        $scope.rootprogram = $location.path().split('/')[3];

        var items = Restangular.all('item');

        var programs = Restangular.all('program');

        var createteam = (function () {

        Restangular.all('team').getList().then(function(teams) {
              _.each(teams, function(value) {
                  $scope.loggedinlandingpagepath =value.teamloggedinlandingpagepath;
                  $scope.teamlandingpagepath = value.teamlandingpagepath;

              });
              if(teams.length === 0){
                  //console.log(user.roles)
                  //user.roles.indexOf('admin') === 0
                  if(user.roles.includes('admin')) {
                      var teams = Restangular.all('team');
                      var team = {};
                      team.user = $scope.global.user._id;
                      team.name = "Pace";
                      team.teamlandingpagepath = 'front/views/pages/bootcards/PaceProject/welcome.html';
                      team.teamloggedinlandingpagepath = 'front/views/pages/bootcards/PaceProject/loggedinhomepage.html';
                      /*
                      team.name = "Manage";
                      team.teamlandingpagepath = 'front/views/pages/bootcards/Manage/welcome.html';
                      team.teamloggedinlandingpagepath = 'front/views/pages/bootcards/Manage/loggedinhomepage.html';
                       */
                      teams.post(team);
                  }
              }
          }, function(response) {
              console.log("Error with status code", response.status);

          });
        })();

        $scope.getprograms = function() {
            $scope.allPrograms = []; $scope.allProgramNames = [];
            $scope.secondaryPorgrams = []; var el;
            $scope.uniqueAllPrograms = [];
            Restangular.all('program').getList().then(function(programs) {
                $scope.dd = programs;
                _.each(programs, function(value) {
                    _.each(value.name, function(singlevalue) {

                        items.getList().then(function(items) {
                            $scope.displayonmenu = false;
                            //$scope.allItems = [];
                            _.each(items, function(value) {

                                if(value.itemprogam.name === singlevalue.name && value.itemprogam.display ==='Display' && value.itemcontrol.published ===true){

                                    $scope.displayonmenu = true;
                                }

                            });

                            if($scope.displayonmenu === true) {

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
                                    el = {
                                        'name': singlevalue.name,
                                        'first_child': Program.get_first_child_program($scope.programarray, singlevalue.name)
                                    };
                                    $scope.allProgramNames.push(singlevalue.name);
                                    $scope.allPrograms.push(el);
                                }

                            }

                            //http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
                            $scope.allPrograms = $scope.allPrograms.filter(function(item, pos) {
                                return  $scope.allProgramNames.indexOf(item.name) == pos;
                            });

                            $scope.uniqueAllPrograms=  $scope.allPrograms; //.slice(0);

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




            });
        }();

        var defaultMainMenu = [{
            title: 'front example page',
            link: 'front example page',
            roles: ['authenticated'],
            menu: 'main'
        }];


        $scope.getprograms_both_display_not_display = function() {
            $scope.allPrograms_d_n = []; $scope.allProgramNames_d_n = [];
            var el; $scope.uniqueAllPrograms_d_n = [];
            Restangular.all('program').getList().then(function(programs) {
                //$scope.dd = programs;
                _.each(programs, function(value) {
                    _.each(value.name, function(singlevalue) {

                        $scope.programarray_d_n = Program.programarray(singlevalue.name, '-');

                         if (singlevalue.name.indexOf('-') !== -1) {
                            el = {
                                'name': singlevalue.name.substr(0, singlevalue.name.indexOf('-')),
                                'first_child': Program.get_first_child_program($scope.programarray_d_n, singlevalue.name)
                            };
                            $scope.allProgramNames_d_n.push(singlevalue.name.substr(0, singlevalue.name.indexOf('-')));
                            $scope.allPrograms_d_n.push(el);

                        }
                        else {

                            el = {
                                'name': singlevalue.name,
                                'first_child': Program.get_first_child_program($scope.programarray, singlevalue.name)
                            };

                            $scope.allProgramNames_d_n.push(singlevalue.name);
                            $scope.allPrograms_d_n.push(el);

                        }
                        //http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
                        //$scope.allPrograms_d_n = $scope.allPrograms_d_n.filter(function(item, pos) {
                        //    return  $scope.allProgramNames_d_n.indexOf(item.name) == pos;
                        //});

                        $scope.uniqueAllPrograms_d_n=  $scope.allPrograms_d_n; //.slice(0);

                        $scope.uniqueAllPrograms_d_n.sort(
                            function(a,b){
                                // return $scope.uniqueAllPrograms[a]-$scope.uniqueAllPrograms[b]
                                var x = a.name.toLowerCase();
                                var y = b.name.toLowerCase();
                                return x < y ? -1 : x > y ? 1 : 0;

                            }
                        );



                    });
                });

              queryMenu('main',defaultMainMenu);

            });

        }();


        //$scope.getprograms();
        //$scope.uniqueAllPrograms = MenuFactory.uniqueAllPrograms();
       // Query menus added by modules. Only returns menus that user is allowed to see.
        function queryMenu(name, defaultMenu) {

            Menus.query({
                name: name,
                defaultMenu: defaultMenu
            }, function(menu) {
                $scope.menus[name] = menu;
                $scope.menus_in_programs= [];
                _.each(menu, function(item) {
                    _.each($scope.allProgramNames_d_n, function(item1) {
                        //console.log(item1);
                        //console.log(item.title );
                        if(item.title === item1){
                            var el ={
                                link:item.link,
                                title:item.title,
                                roles:item.roles,
                                menu:item.menu
                            };
                            $scope.menus_in_programs.push(el);

                        }

                    });
                });

            });
        };


       // queryMenu('main', defaultMainMenu);

        $rootScope.$on('loggedin', function() {

            //queryMenu('admin', defaultAdminMenu);

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };

            queryMenu('main',defaultMainMenu);
        });



        //console.log($scope.uniqueAllPrograms);

        //update program drop down list, but not sure why it does not appear to work
        $rootScope.$on('ProrgamUpdated', function(event, args) {

            $scope.getprograms();
        });


        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]);

