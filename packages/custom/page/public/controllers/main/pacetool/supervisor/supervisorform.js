/**
 * Created by hbzhang on 3/30/15.
 */
angular.module('mean.front').controller('SupervisorFormController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope','AllUsers',
    function($scope,Global,Restangular,Program,$location,
             $builder,$validator,formtoaster,$rootScope,AllUsers) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Your form was just submitted. You can find your submission in the submission Tab');
        };

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };

        var getcontentID = function(){

            var program = $location.path().split('/')[3];

            var programarray = Program.programarray(program, '-');

            $scope.contentid = programarray[programarray.length-1];

            $scope.supervisorformid = programarray[programarray.length-2];

            $scope.employeename = programarray[1];

            AllUsers.query({}, function(users) {
                _.each(users, function(user) {

                    if($scope.employeename === user.name){
                        $scope.userid = user._id;
                    }
                });
            });

            $rootScope.$broadcast('wholeprogramforform', {id:program});

        };
        getcontentID();


        $scope.removeallsupervisorobjects = function() {

            $builder.removeAllObjects('supervisorform');
        };

        $builder.removeAllObjects('supervisorform');

        $scope.input = [];

        $scope.addFormObject = function(form){

            for (var j = 0; j < form.length; j++) {
                form[j].id = 'item' + j;
                $builder.addFormObject('supervisorform', form[j]);
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

        $scope.getitems = function() {
            $scope.content = [];
            items.getList().then(function(items) {
                $scope.allItems = [];
                _.each(items, function(value) {

                    if(value._id ===  $scope.contentid){

                        //value.itemassociatedforms[0].supervisorforms[0].id
                        //if(value.itemassociatedforms[0].supervisorforms[0].id ===  'Supervisor' ){
                        items.getList().then(function(items1) {
                            _.each(items1, function(value1) {
                            if(value1._id === $scope.supervisorformid && value1.itemcontrol.published ===true) {
                                $scope.formid = value1._id;
                                var el = {
                                    valueid: value1._id,
                                    value: value1
                                };
                                $scope.content.push(el);

                                $scope.addFormObject(value1.itemformbuilder);

                            }

                            });

                        });

                    }

                });

            });
        };

        $scope.getitems();

        $scope.form = $builder.forms['supervisorform'];
        $scope.input = [];
        $scope.defaultValue = {};

        $scope.updateregister = function(registrationid){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'registerform').success(function() {
                Restangular.one('registration/' + registrationid).get().then(function(register) {
                    //console.log(register);
                    register.information = $scope.input;
                    register.otherinformation = {};
                    register.otherinformation.supervisoremployeeform = $scope.contentid;
                    register.reasonforregister = $scope.supervisorformid;
                    register.users = $scope.global.user._id;
                    register.qrcode = [];
                    register.otherinformation.supervisoremployeeuserid = $scope.userid;
                    register.save();
                    $scope.pop();
                });
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            })};


        $scope.createnewregister = function(registrationid){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'reviewerform').success(function() {
                var register = {};
                register.information = $scope.input;
                register.otherinformation = {};
                register.otherinformation.supervisoremployeeform = $scope.contentid;
                register.reasonforregister = $scope.supervisorformid;
                register.users = $scope.global.user._id;
                register.qrcode = [];
                register.otherinformation.supervisoremployeeuserid = $scope.userid;
                registers.post(register);
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            })};

        $scope.saveregisteries = function() {

            exist =false;
            registers.getList().then(function(registers) {
                _.each(registers, function(value) {
                    if(value.users &&  value.otherinformation && value.reasonforregister ===  $scope.supervisorformid && value.users._id === $scope.global.user._id && value.otherinformation.supervisoremployeeuserid === $scope.userid){

                        if (confirm("You have already filled out this form, you can edit it in the sumbmission Tab. Are you sure you want to overwrite existing submission?")) {
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

        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);
