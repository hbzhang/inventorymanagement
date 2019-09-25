/**
 * Created by hbzhang on 3/19/17.
 */
/**
 * Created by hbzhang on 3/19/17.
 */
angular.module('mean.front').controller('ReviewerSubmissionContentController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator',
    'formtoaster','URLStateTrack','AllUsers','LocalStorageData',
    function($scope,Global,Restangular,Program,
             $location,$builder,$validator,
             formtoaster,URLStateTrack,AllUsers,LocalStorageData) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Your submission was just updated.');
        };

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };

        //$scope.preurl = URLStateTrack.geturlstate();

        $scope.preurl = LocalStorageData.geturlData('reviewermainform');


        var getRegistrationID = function(){

            var program = $location.path().split('/')[3];

            var programarray = Program.programarray(program, '-');

            $scope.itemid = programarray[programarray.length-1];

            $scope.employeename = programarray[0];

        };
        getRegistrationID();


        $builder.removeAllObjects('reviewerregisteredform');
        $scope.input = [];
        $scope.reviewerregisteredformvalue = {};

        $scope.addFormObject = function(item){
            for (var j = 0; j < item.itemformbuilder.length; j++) {
                //item.itemformbuilder[j].id = 'itembuiltinforms' + j;
                item.itemformbuilder[j].id = 'item' + j;
                $builder.addFormObject('reviewerregisteredform', item.itemformbuilder[j]);
            }
        };


        var registers = Restangular.all('registration');

        $scope.getregisters = function() {
            registers.getList().then(function(registers) {
                _.each(registers, function(value) {

                    AllUsers.query({}, function(users) {
                        _.each(users, function(user) {

                            if($scope.employeename === user.name){

                                if(value.otherinformation && value.otherinformation.revieweremployeeuserid === user._id) {
                                    if(value.reasonforregister ===  $scope.itemid ){

                                        $scope.registrationid = value._id;

                                        _.each(value.information,function(item) {
                                            $scope.reviewerregisteredformvalue[item.id] = item.value;
                                        });
                                    }
                                }

                            }
                        });
                    });


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
            return $validator.validate($scope, 'reviewerregisteredform').success(function() {
                Restangular.one('registration/' + $scope.registrationid).get().then(function(register) {
                    register.information = $scope.input;
                    register.reasonforregister = $scope.itemid;
                    register.users = $scope.global.user._id;
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
