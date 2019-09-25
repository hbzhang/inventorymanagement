/**
 * Created by hbzhang on 3/19/17.
 */
/**
 * Created by hbzhang on 3/7/17.
 */
angular.module('mean.page').controller('ReviewerSubmissionController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator',
    'formtoaster','$rootScope','$state','URLStateTrack','AllUsers',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster,
             $rootScope,$state,URLStateTrack,AllUsers) {
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

        URLStateTrack.seturlstate($location.absUrl());

        var getcontentID = function(){
            $scope.wholeprogramforform = $location.path().split('/')[3];
            var programarray = Program.programarray($scope.wholeprogramforform, '-');
            $scope.employeename = programarray[programarray.length-2];
            $scope.reviewerformid = programarray[programarray.length-1];

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

                AllUsers.query({}, function(users) {

                _.each(registers, function(value) {

                        _.each(users, function(user) {

                            if($scope.employeename === user.name){

                                if(value.users && value.otherinformation && value.reasonforregister ===  $scope.reviewerformid && is_belongto_user(value.users) && value.otherinformation.revieweremployeeuserid === user._id) {
                                    var el = {
                                        value: value
                                    };
                                    $scope.allRegisteredItems.push(el);
                                }

                            }
                        });
                    });

                });

            });
        };

        $scope.getregisters();

        /* $scope.updateregisters = function() {

         $state.reload();
         }; */

        $scope.removeRegister = function(item){
            //console.log('USERID: ' + $scope.global.user._id);
            //console.log(item);
            Restangular.one("registration", item.value._id).remove().then(function() {
                $scope.getregisters();
                $scope.pop_removed();
            });
        };
    }]);


