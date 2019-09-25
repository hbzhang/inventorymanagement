/**
 * Created by hbzhang on 6/20/17.
 */
angular.module('mean.workspace').controller('SubmissionContentController', ['$scope','Global',
    'Restangular','Program','$location','$builder',
    '$validator','formtoaster','URLStateTrack','LocalStorageData','Users',
    function($scope,Global,Restangular,Program,$location,
             $builder,$validator,
             formtoaster,URLStateTrack,LocalStorageData,Users) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('The form was just sucessfully reverted.');
        };
        //$scope.preurl = URLStateTrack.geturlstate();

        $scope.preurl = LocalStorageData.geturlData('versioncontrolform');

        $scope.pop_error = function(){
            formtoaster.now.error('Sorry, error encountered.');
        };

        var getRegistrationID = function(){

            $scope.itemid = $location.path().split('/')[5];
            $scope.registrationid = $location.path().split('/')[6];
            $scope.username = $location.path().split('/')[7];

        };
        getRegistrationID();

        $scope.getusers = function() {

            Users.query({}, function(users) {
                _.each(users, function(user) {

                    if($scope.username  === user.name){

                        $scope.userID = user._id;
                    }
                });

            });
        };

        $scope.getusers();

        $builder.removeAllObjects('backupedform');
        $scope.input = [];
        $scope.backupedvalue = {};

        $scope.addFormObject = function(item){
            for (var j = 0; j < item.itemformbuilder.length; j++) {
                //item.itemformbuilder[j].id = 'itembuiltinforms' + j;
                item.itemformbuilder[j].id = 'item' + j;
                $builder.addFormObject('backupedform', item.itemformbuilder[j]);
            }
        };

        var registers = Restangular.all('registration');
        var backups = Restangular.all('backup');

        $scope.getbackups = function() {
            backups.getList().then(function(backups) {
                _.each(backups, function(value) {
                    if(value._id ===  $scope.registrationid ){

                        if( typeof value.supervisor_edit!== "undefined")
                            $scope.supervisor_edit = value.supervisor_edit._id;
                        if( typeof value.users!== "undefined")
                            $scope.users = value.users._id;
                        _.each(value.information,function(item) {
                            $scope.backupedvalue[item.id] = item.value;
                        });
                    }
                });

            });
        };

        var items = Restangular.all('item');

        $scope.getcreateditems = function() {
            items.getList().then(function(items) {

                _.each(items,function(value) {

                    if(value._id === $scope.itemid ) {
                        $scope.getbackups();
                        //$rootScope.$broadcast('addbuiltinform', {data: newValue, elementid:'formprogramtextbox'});
                        $scope.addFormObject(value);

                    }});
            })
        };

        $scope.getcreateditems();

        //create a new registration
        $scope.createnewregister = function(registrationid){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'backupedform').success(function() {
                var register = {};
                register.information = $scope.input;
                register.reasonforregister = $scope.itemid;
                register.users = $scope.userID;
                register.qrcode = [];
                registers.post(register);
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
        })};

        $scope.updatebackup = function(){
            return $validator.validate($scope, 'backupedform').success(function() {
                Restangular.one('backup/' + $scope.registrationid).get().then(function(register) {
                    //register.supervisor_edit = $scope.supervisor_edit;
                    register.users = $scope.userID;
                    register.information = $scope.input;
                    register.reasonforregister = $scope.itemid;
                    register.save();
                    $scope.pop();
                });

                var foundregister = false;

                //update an existing registration
                registers.getList().then(function(registers) {
                    _.each(registers, function(value) {
                        if(value.reasonforregister ===  $scope.itemid && value.users._id === $scope.userID){
                            foundregister = true;
                            Restangular.one('registration/' + value._id).get().then(function(register) {
                                register.users = $scope.userID;
                                register.information = $scope.input;
                                register.reasonforregister = $scope.itemid;
                                register.qrcode = [];
                                register.save();
                                $scope.pop();
                            });
                        }


                    });

                    //create a new registration if there is none.
                    if(foundregister === false){
                        $scope.createnewregister();
                    }

                });

                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            });



        };






    }]);
