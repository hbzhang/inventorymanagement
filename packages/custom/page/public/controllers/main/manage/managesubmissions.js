/**
 * Created by hbzhang on 5/2/17.
 */
angular.module('mean.page').controller('ManageSubmissionController', ['$scope','Global',
    'Restangular','Program','$location','$builder',
    '$validator','formtoaster','$rootScope','$state','URLStateTrack','$location',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,
             formtoaster,$rootScope,$state,URLStateTrack,$location) {

        $scope.global = Global;
        $scope.package = {
            name: 'page'
        };

        $scope.pop_removed = function(){
            formtoaster.now.warning('The registered item was just removed.');
        };

        var registers = Restangular.all('registration');

        var getcontentID = function(){
            $scope.wholeprogramforform = $location.path().split('/')[3];
            var programarray = Program.programarray($scope.wholeprogramforform, '-');
            $scope.contentid = programarray[programarray.length-1];
        };

        getcontentID();

        $scope.getregisters = function() {
            registers.getList().then(function(registers) {
                $scope.allRegisteredItems = [];
                _.each(registers, function(value) {

                    if(typeof value.users !== "undefined" && value.reasonforregister ===  $scope.contentid) {
                        var el = {
                            value: value
                        };
                        $scope.allRegisteredItems.push(el);
                    }

                });

            });
        };

        $scope.removeRegister = function(item){
            Restangular.one("registration", item.value._id).remove().then(function() {
                $scope.getregisters();
                $scope.pop_removed();
            });
        };
    }]);