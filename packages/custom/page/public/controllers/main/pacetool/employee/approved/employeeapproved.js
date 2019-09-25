/**
 * Created by hbzhang on 3/6/17.
 */
angular.module('mean.page').controller('EmployeeApprovedController', ['$scope','Global',
    'Restangular','Program','$location',
    '$builder','$validator','formtoaster','LocalStorageData','Users','UserinformationHelper',
    function($scope,Global,Restangular,Program
        ,$location,$builder,$validator,
         formtoaster,LocalStorageData,Users,UserinformationHelper) {
        $scope.global = Global;


        $scope.pop = function(){
            formtoaster.now.success('Your registration result was just updated.');
        };

        $scope.employeeformlisturl = window.location.origin +"/#!/public/menu/Employee";

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };

        $scope.registrationid =  $scope.global.user._id;


        Users.query({}, function(users) {
            var otherusers = users;
            _.each(users, function(user) {

                if( $scope.registrationid  === user._id){
                    $scope.userinformation = user;
                    UserinformationHelper.setsuserinformation($scope.userinformation);
                    _.each(otherusers, function(otheruser) {
                    if (otheruser.attributes[0] && user.attributes[0]
                        && user.attributes[0]['Supervisor ID'] === otheruser.attributes[0]['ID#']){
                                $scope.supervisorname = otheruser.attributes[0]['Name'];
                                $scope.supervisortitle = otheruser.attributes[0]['Title'];
                                UserinformationHelper.setsupervisorname($scope.supervisorname);
                                UserinformationHelper.setsupervisortitle($scope.supervisortitle);
                    }
                    });

                }
            });
        });

        var today = new Date();
        $scope.thisyear = today.getFullYear();


        $scope.preurl = LocalStorageData.geturlData('employeeapproved');

        //query nested http://stackoverflow.com/questions/19380738/mongoose-nested-query-on-model-by-field-of-its-referenced-model

        var registers = Restangular.all('registration');

        var items = Restangular.all('item');

        $scope.employeeregistered =[[]];
        $scope.employeeregisteredforms = [];
        $scope.rawdata =[];


        var registeredform = -1, form = -1, employeefinished = 0, supervisorfinished = 0;
        $scope.numberofforms = -1;

        $scope.getemployeeregisters = function() {
        registers.getList().then(function(registers) {

                $scope.rawdata  = registers;
                _.each(registers, function(value) {

                    //first we need to scan how many forms are in the system
                    if(value.users && value.users._id ===  $scope.registrationid ){ //employee form adding started

                        if(value.otherinformation && typeof value.otherinformation.supervisoremployeeform === "undefined" && typeof value.otherinformation.revieweremployeeuserid==="undefine"|| typeof value.otherinformation === "undefined")
                        items.getList().then(function(items) {
                            _.each(items,function(value1) {
                                if(value1._id === value.reasonforregister ) {
                                    registeredform += 1;
                                    $scope.numberofforms = registeredform;
                                    var forminformation = {};
                                    forminformation.value =  value1.itembasicinformation[0].value;
                                    forminformation.label  = "";
                                    forminformation.id  = value.reasonforregister;
                                    $scope.employeeregisteredforms[registeredform]=forminformation;
                                }
                            });

                            //sort the forms in the system
                            $scope.employeeregisteredforms.sort(function(a, b) {
                                return a.value.localeCompare(b.value);
                            });

                            //Here we have to clear the array, otherwise it will be contaminated.
                            $scope.employeeregistered =[[]];
                            form = -1;

                            //add the entries of the form
                            _.each($scope.employeeregisteredforms,function(value1) {

                                _.each($scope.rawdata, function(value) {

                                    if(value.users && value.users._id ===  $scope.registrationid ){ //employee form adding started

                                        if(value.otherinformation && typeof value.otherinformation.supervisoremployeeform === "undefined" && typeof value.otherinformation.revieweremployeeuserid==="undefine"|| typeof value.otherinformation === "undefined")

                                            if(value1.id === value.reasonforregister ) {

                                                var formregisters = -1
                                                form += 1;
                                                $scope.numberofforms = form;
                                                var forminformation = {};
                                                forminformation.value =  value1.value;
                                                forminformation.label  = "";

                                                $scope.employeeregistered[form]= [];
                                                formregisters +=1;

                                                $scope.employeeregistered[form][formregisters]=forminformation;

                                                _.each(value.information,function(item) {

                                                    if(item.value.length !== 0 && item.value !== 'Not Evaluated Yet' && item.value !== 'Please make a selection') {
                                                        formregisters +=1;
                                                        var employeeregisteredcontent = {};
                                                        employeeregisteredcontent.component = item.data[0].componentname;
                                                        employeeregisteredcontent.value = item.value;
                                                        employeeregisteredcontent.label  = item.label;
                                                        $scope.employeeregistered[form][formregisters]=employeeregisteredcontent;

                                                        /* if(item.value.length === 0 && employeeregisteredcontent.component!=='label' && employeeregisteredcontent.component.search('SELECTED Goal')!==-1){
                                                         employeeregisteredcontent.value = 'NA';
                                                         }*/

                                                    }

                                                });

                                            }

                                    } //employee form adding finished


                                });

                            });

                       });


                } //employee form basic inforamtion adding finished

                });
         });

          /*  registers.getList().then(function(registers) {
                //supervisor form adding started
                _.each(registers, function(value) {

            if(value.otherinformation && value.otherinformation.supervisoremployeeuserid ===  $scope.registrationid ){

                items.getList().then(function(items) {

                    _.each(items,function(value1) {
                        if(value1._id === value.reasonforregister ) {

                            var formregisters = -1
                            form += 1;
                            $scope.numberofforms = form;
                            var forminformation = {};
                            forminformation.value =  value1.itembasicinformation[0].value + " Comments";
                            forminformation.label  = "Supervisor ";

                            $scope.employeeregistered[form]= [];
                            formregisters +=1;

                            $scope.employeeregistered[form][formregisters]=forminformation;
                            _.each(value.information,function(item) {
                                formregisters +=1;
                                var employeeregisteredcontent = {};
                                employeeregisteredcontent.component = item.data[0].componentname;
                                employeeregisteredcontent.value = item.value;
                                employeeregisteredcontent.label  = item.label;

                                if(item.value.length === 0 && employeeregisteredcontent.component!=='label'){
                                    employeeregisteredcontent.value = 'NA';
                                }
                                $scope.employeeregistered[form][formregisters]=employeeregisteredcontent;
                            });

                        }
                    });
                });

            }

              });

            });//supervisor form adding finished  , comment out for now, may add back in the future

            */


            registers.getList().then(function(registers) { //revewer form started
                _.each(registers, function(value) {

                    if (value.otherinformation && value.otherinformation.revieweremployeeuserid ===  $scope.registrationid) {

                        items.getList().then(function(items) {

                            _.each(items,function(value1) {
                                if(value1._id === value.reasonforregister ) {

                                    var formregisters = -1
                                    form += 1;
                                    $scope.numberofforms = form;
                                    var forminformation = {};
                                    forminformation.value =  value1.itembasicinformation[0].value + " Comments";
                                    forminformation.label  = "Reviewer Section: ";

                                    $scope.employeeregistered[form]= [];
                                    formregisters +=1;

                                    $scope.employeeregistered[form][formregisters]=forminformation;
                                    _.each(value.information,function(item) {
                                        formregisters +=1;
                                        var employeeregisteredcontent = {};
                                        employeeregisteredcontent.component = item.data[0].componentname;
                                        employeeregisteredcontent.value = item.value;
                                        employeeregisteredcontent.label  = item.label;
                                        if(item.value.length === 0 && employeeregisteredcontent.component!=='label'){
                                            employeeregisteredcontent.value = 'NA';
                                        }
                                        $scope.employeeregistered[form][formregisters]=employeeregisteredcontent;
                                    });

                                }
                            });
                        });

                    }
                });
            }); //reviewer form finised



        };

        $scope.getemployeeregisters();






    }]);


