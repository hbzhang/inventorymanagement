/**
 * Created by hbzhang on 3/21/17.
 */
angular.module('mean.page').controller('EmployeeSubmissionController', ['$scope','Global',
    'Restangular','Program','$location','$builder',
    '$validator','formtoaster','$rootScope','$state','URLStateTrack','$location',
    '$window',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,
             formtoaster,$rootScope,
             $state,URLStateTrack,$location,$window) {

        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'page'
        };

        $scope.pop_removed = function(){
            formtoaster.now.warning('The registered item was just removed.');
        };


        var registers = Restangular.all('registration');

        $rootScope.$on('wholeprogramforform', function(event, args) {

            //$scope.wholeprogramforform = args.id;
        });

        var getcontentID = function(){
            $scope.wholeprogramforform = $location.path().split('/')[3];
            var programarray = Program.programarray($scope.wholeprogramforform, '-');
            $scope.contentid = programarray[programarray.length-1];
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
                    if(typeof value.users !== "undefined" && value.reasonforregister ===  $scope.contentid && is_belongto_user(value.users)) {
                        var el = {
                            value: value
                        };
                        $scope.allRegisteredItems.push(el);
                    }

                });

            });
        };

        //$scope.getregisters();

        /* $scope.updateregisters = function() {

         $state.reload();
         }; */

        $scope.removeRegister = function(item){
            //console.log('USERID: ' + $scope.global.user._id);
            Restangular.one("registration", item.value._id).remove().then(function() {
                $scope.getregisters();
                $scope.pop_removed();
            });
        };
    }]);