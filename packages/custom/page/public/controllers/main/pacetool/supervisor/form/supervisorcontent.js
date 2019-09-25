/**
 * Created by hbzhang on 3/6/17.
 */
angular.module('mean.page').controller('SupervisorContentDisplayController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster,$rootScope) {
        $scope.global = Global;

        var splitpath = $location.path().split('/')[3];

        var getemployeename = function(splitpath){

            var programarray = Program.programarray(splitpath, '-');

            $scope.employeename = programarray[1];

            $scope.submissionemployeename = programarray[0];

        };
        getemployeename(splitpath);

        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);
