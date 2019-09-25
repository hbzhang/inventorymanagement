/**
 * Created by hbzhang on 3/25/17.
 */
angular.module('mean.page').controller('ReviewerEmployeeSubmissionController', ['$scope','Global',
    'Restangular','Program','$location','$builder',
    '$validator','formtoaster','URLStateTrack','LocalStorageData','AllUsers',
    function($scope,Global,Restangular,Program,$location,
             $builder,$validator,
             formtoaster,URLStateTrack,
             LocalStorageData,AllUsers) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Your submission was just updated.');
        };

        $scope.employeeformlisturl = window.location.origin +"/#!/public/menu/Employee";

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };


        //$scope.preurl  = URLStateTrack.geturlstate($location.absUrl());

        $scope.preurl = LocalStorageData.geturlData('reviewerapprove');


        var getinformation = function(){
            $scope.wholeprogramforform = $location.path().split('/')[3];
            var programarray = Program.programarray($scope.wholeprogramforform, '-');
            $scope.username = programarray[0];
            AllUsers.query({}, function(users) {
                _.map(users,function(user){
                    if($scope.username===user.name){
                        $scope.userid = user._id;
                    }

                });
            });


        };

        getinformation();

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
                    if(value.users && value.users._id ===  $scope.userid ){ //employee form adding started

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

                                        if(value.users && value.users._id ===  $scope.userid ){ //employee form adding started

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

                                                        if(item.value.length !== 0 ) {
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
                if($scope.numberofforms >=0)
                    $scope.after_fetching_message = ""
                else
                    $scope.after_fetching_message = "Employee has not made submission yet."

            });

          //supervisor form adding started  -- not used for now
          /*if(value.otherinformation && value.otherinformation.supervisoremployeeuserid ===  $scope.userid ){

                        items.getList().then(function(items) {

                            _.each(items,function(value1) {
                                if(value1._id === value.reasonforregister ) {

                                    var formregisters = -1
                                    form += 1;
                                    $scope.numberofforms = form;
                                    var forminformation = {};
                                    forminformation.value =  value1.itembasicinformation[0].value + " Comments";
                                    forminformation.label  = "Supervisor Section";

                                    $scope.employeeregistered[form]= [];
                                    formregisters +=1;

                                    $scope.employeeregistered[form][formregisters]=forminformation;
                                    _.each(value.information,function(item) {
                                        formregisters +=1;
                                        var employeeregisteredcontent = {};
                                        employeeregisteredcontent.value = item.value;
                                        employeeregisteredcontent.label  = item.label;
                                        $scope.employeeregistered[form][formregisters]=employeeregisteredcontent;
                                    });

                                }
                            });
                        });

                    }//supervisor form adding finished

                });

            }); */

            registers.getList().then(function(registers) { //revewer form started
                _.each(registers, function(value) {

                    if (value.otherinformation && value.otherinformation.revieweremployeeuserid ===  $scope.userid) {

                        items.getList().then(function(items) {

                            _.each(items,function(value1) {
                                if(value1._id === value.reasonforregister ) {

                                    var formregisters = -1
                                    form += 1;
                                    $scope.numberofforms = form;
                                    var forminformation = {};
                                    forminformation.value =  value1.itembasicinformation[0].value + " Comments";
                                    forminformation.label  = "Reviewer Section";

                                    $scope.employeeregistered[form]= [];
                                    formregisters +=1;

                                    $scope.employeeregistered[form][formregisters]=forminformation;
                                    _.each(value.information,function(item) {
                                        formregisters +=1;
                                        var employeeregisteredcontent = {};
                                        employeeregisteredcontent.value = item.value;
                                        employeeregisteredcontent.label  = item.label;
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


