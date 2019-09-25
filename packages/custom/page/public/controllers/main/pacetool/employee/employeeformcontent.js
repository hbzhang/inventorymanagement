/**
 * Created by hbzhang on 3/5/17.
 */
angular.module('mean.page').controller('EmployeeformContentController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope',
    '$window',
    function($scope,Global,Restangular,Program,$location,$builder,
             $validator,formtoaster,$rootScope,$window) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Your form was just submitted. You can find your submission in the Update Saved Form Tab');
        };

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };

        var getcontentID = function(){

            var program = $location.path().split('/')[3];

            var programarray = Program.programarray(program, '-');

            $scope.contentid = programarray[programarray.length-1];

            $scope.formid = programarray[programarray.length-1];

            $scope.employeeformname = programarray[0];
            $rootScope.$broadcast('wholeprogramforform', {id:program});

        };
        getcontentID();

        $builder.removeAllObjects('registerform');

        $scope.input = [];

        $scope.addFormObject = function(form){
            //console.log(form);
            for (var j = 0; j < form.length; j++) {
                form[j].id = 'item' + j;
                $builder.addFormObject('registerform', form[j]);
            }

        };

        $scope.is_display_the_item = function(value){

            var do_not_display = true;

            _.map(value.data,function(data){

                if(data.visible === false){
                    do_not_display = false;
                }

            });
            return do_not_display;

        };

        var items = Restangular.all('item');
        var registers = Restangular.all('registration');
        var backups = Restangular.all('backup');


        $scope.getitems = function() {
            $scope.content = [];
            items.getList().then(function(items) {
                $scope.allItems = [];
                _.each(items, function(value) {
                    if(value._id ===  $scope.contentid && value.itemcontrol.published ===true ){

                        $scope.formid = value._id;
                        var el = {
                            valueid:value._id,
                            value:value
                        };
                        $scope.content.push(el);
                        $scope.addFormObject(value.itemformbuilder);
                    }

                    /*   var iteminformation = {
                     'id': value._id,
                     'name': value.itemcreatedtime,
                     'programname': value.itemprogam.name
                     };

                     $scope.allItems.push(iteminformation); */

                });

            });
        };

        $scope.getitems();

        $scope.form = $builder.forms['registerform'];
        $scope.input = [];
        $scope.defaultValue = {};

        $scope.updateregister = function(registrationid){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'registerform').success(function() {
                Restangular.one('registration/' + registrationid).get().then(function(register) {
                    //console.log(register);
                    register.information = $scope.input;
                    register.reasonforregister = $scope.formid;
                    register.users = $scope.global.user._id;
                    register.qrcode = [];
                    register.save();
                    $scope.pop();
                });
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            })};


        $scope.createnewregister = function(registrationid){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'registerform').success(function() {
                var register = {};
                register.information = $scope.input;
                register.reasonforregister = $scope.formid;
                register.users = $scope.global.user._id;
                register.qrcode = [];
                registers.post(register);
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            })};


        $scope.createanewbackup = function(backupid){
            return $validator.validate($scope, 'registerform').success(function() {
                var register = {};
                register.information = $scope.input;
                register.reasonforregister = $scope.formid;
                register.users = $scope.global.user._id;
                backups.post(register);
                //$scope.pop();
            }).error(function() {
                $scope.pop_error();
            })};

        $scope.saveregisteries = function() {

            exist =false;
            $scope.createanewbackup();
            registers.getList().then(function(registers) {
                _.each(registers, function(value) {
                    if(value.users && value.reasonforregister ===  $scope.formid && value.users._id === $scope.global.user._id){
                        if (confirm("You have already filled out this form, you can edit it in the Update Saved Form Tab. Are you sure you want to overwrite existing submission?")) {
                            $scope.updateregister(value._id);
                            exist =true;
                            return;

                        }
                        exist =true;
                        return;

                    }
                });
                if( exist ===false){
                    $scope.createnewregister();

                }

            });


        };

    }]);
