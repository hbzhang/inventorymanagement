/**
 * Created by hbzhang on 3/21/17.
 */
angular.module('mean.page').controller('EmployeeSubmissionContentController', ['$scope','Global',
    'Restangular','Program','$location','$builder',
    '$validator','formtoaster','URLStateTrack','LocalStorageData',
    function($scope,Global,Restangular,Program,$location,
             $builder,$validator,
             formtoaster,URLStateTrack,LocalStorageData) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Your submission was just updated.');
        };
        //$scope.preurl = URLStateTrack.geturlstate();

        $scope.preurl = LocalStorageData.geturlData('employeeform');

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };

        var getRegistrationID = function(){

            var program = $location.path().split('/')[3];

            var programarray = Program.programarray(program, '-');

            $scope.registrationid = programarray[programarray.length-1];

            $scope.itemid = programarray[programarray.length-2];

        };
        getRegistrationID();


        $builder.removeAllObjects('registeredform');
        $scope.input = [];
        $scope.registeredvalue = {};

        $scope.addFormObject = function(item){
            for (var j = 0; j < item.itemformbuilder.length; j++) {
                //item.itemformbuilder[j].id = 'itembuiltinforms' + j;
                item.itemformbuilder[j].id = 'item' + j;
                $builder.addFormObject('registeredform', item.itemformbuilder[j]);
            }
        };


        var registers = Restangular.all('registration');

        $scope.getregisters = function() {
            registers.getList().then(function(registers) {
                _.each(registers, function(value) {
                    if(value._id ===  $scope.registrationid ){

                        if( typeof value.supervisor_edit!== "undefined")
                        $scope.supervisor_edit = value.supervisor_edit._id;
                        if( typeof value.users!== "undefined")
                        $scope.users = value.users._id;
                        _.each(value.information,function(item) {
                            $scope.registeredvalue[item.id] = item.value;
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
                        $scope.getregisters();
                        //$rootScope.$broadcast('addbuiltinform', {data: newValue, elementid:'formprogramtextbox'});
                        $scope.addFormObject(value);

                    }});
            })
            //$state.forceReload();
        };

        $scope.getcreateditems();

        $scope.updateregister = function(){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'registeredform').success(function() {
                Restangular.one('registration/' + $scope.registrationid).get().then(function(register) {
                    //register.supervisor_edit = $scope.supervisor_edit;
                    register.users = $scope.users;
                    register.information = $scope.input;
                    register.reasonforregister = $scope.itemid;
                    register.qrcode = [];
                    register.save();
                    $scope.pop();
                });
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            });

        };


    }]);
