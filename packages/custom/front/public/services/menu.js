/**
 * Created by hbzhang on 8/25/16.
 */
'use strict';

//http://plnkr.co/edit/QBAB0usWXc96TnxqKhuA?p=preview
angular.module('mean.front').factory('MenuFactory',[
    '$resource','$rootScope','$http','Restangular','Program',
    function($resource,$rootScope,$http,Restangular,Program) {

        var programs = Restangular.all('program');

        var uniqueAllProgramsdata = function() {
           var allPrograms = []; var allProgramNames = []; var secondaryPorgrams = []; var el;
            programs.getList().then(function(programs) {
                //$scope.allPrograms = programs;
                _.each(programs, function(value) {
                    _.each(value.name, function(singlevalue) {

                        var programarray = Program.programarray(singlevalue.name, '-');

                        if(singlevalue.name.indexOf('-')!==-1) {
                            el = {'name': singlevalue.name.substr(0, singlevalue.name.indexOf('-')),
                                'first_child':Program.get_first_child_program(programarray,singlevalue.name)
                            };
                            allProgramNames.push(singlevalue.name.substr(0, singlevalue.name.indexOf('-')));
                            allPrograms.push(el);

                        }
                        else {
                            el = {'name': singlevalue.name,
                                'first_child':Program.get_first_child_program(programarray,singlevalue.name)
                            };
                            allProgramNames.push(singlevalue.name);
                            allPrograms.push(el);
                        }

                    });
                });


                //http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
                allPrograms = allPrograms.filter(function(item, pos) {
                    return  allProgramNames.indexOf(item.name) == pos;
                });

                var uniqueAllPrograms=  allPrograms.slice(0);

                uniqueAllPrograms.sort(
                    function(a,b){
                        // return $scope.uniqueAllPrograms[a]-$scope.uniqueAllPrograms[b]
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        return x < y ? -1 : x > y ? 1 : 0;

                    }
                );

                console.log(uniqueAllPrograms);

                return uniqueAllPrograms;

            });
        };


        return {
            uniqueAllPrograms: uniqueAllProgramsdata
        };
    }]);

