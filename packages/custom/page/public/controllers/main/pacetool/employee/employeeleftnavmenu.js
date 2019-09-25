/**
 * Created by hbzhang on 3/10/17.
 */
angular.module('mean.page').controller('EmployeeLeftNavmenuController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster,$rootScope) {
        $scope.global = Global;

        var getemployeeformname = function(){

            var program = $location.path().split('/')[3];

            var programarray = Program.programarray(program, '-');

            $scope.employeeformname = programarray[0];

        };
        getemployeeformname();




    }]);
