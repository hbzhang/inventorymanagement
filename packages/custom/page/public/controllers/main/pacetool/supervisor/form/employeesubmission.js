/**
 * Created by hbzhang on 3/7/17.
 */
angular.module('mean.page').controller('EmployeeSubmissionController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope','$state',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster,$rootScope,$state) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'page'
        };

        $scope.pop_removed = function(){
            formtoaster.now.warning('Your submission was just removed.');
        };


        var registers = Restangular.all('registration');

        $rootScope.$on('wholeprogramforform', function(event, args) {

            //$scope.wholeprogramforform = args.id;
        });

        var getcontentID = function(){
            $scope.wholeprogramforform = $location.path().split('/')[3];
            var programarray = Program.programarray($scope.wholeprogramforform, '-');
            $scope.contentid = programarray[programarray.length-1];
            $scope.employeesubmissionname = programarray[programarray.length-3];
        };

        getcontentID();

        var is_belongto_user = function(user){
            var belongto_user = false;
            if(Global.user.username ===user.username && Global.user.name === user.name)
                belongto_user = true;
            return belongto_user;
        };

        $scope.getregisters = function() {
            registers.getList().then(function(registers) {
                $scope.allRegisteredItems = [];
                _.each(registers, function(value) {
                    if(value.reasonforregister ===  $scope.contentid && is_belongto_user(value.users)) {
                        var el = {
                            value: value
                        };
                        $scope.allRegisteredItems.push(el);
                    }

                });

            });
        };

        $scope.getregisters();

        /* $scope.updateregisters = function() {

         $state.reload();
         }; */

        $scope.removeRegister = function(item){
            Restangular.one("registration", item.value._id).remove().then(function() {
                $scope.getregisters();
                $scope.pop_removed();
            });
        };
    }]);
