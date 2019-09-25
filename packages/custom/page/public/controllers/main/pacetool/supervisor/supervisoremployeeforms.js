/**
 * Created by hbzhang on 12/7/16.
 */
angular.module('mean.page').controller('SupervisorEmployeeFormController', ['$scope','Global',
    'Restangular','Program','$location','URLStateTrack','LocalStorageData',
    function($scope,Global,Restangular,
             Program,$location,URLStateTrack,LocalStorageData) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'page'
        };

        var getsubmissionusername = function(splitpath){
            $scope.submissionusername = $location.path().split('/')[3];
            if($scope.submissionusername.indexOf(splitpath)!==-1)
                $scope.submissionusername = $scope.submissionusername.substr(0, $scope.submissionusername.indexOf(splitpath));

        };
        getsubmissionusername('-');

        //URLStateTrack.seturlstate($location.absUrl());

        LocalStorageData.seturlData('supervisorapprove',$location.absUrl());

        var splitpath = $location.path().split('/')[3];

        $scope.wholename = 'Employee-'+ splitpath;

        var getrootprogram = function(splitpath){

            var programarray = Program.programarray(splitpath, '-');

            $scope.rootprogram = programarray[0];

        };
        getrootprogram(splitpath);


        $scope.employeenamefromlist = splitpath;


        var getprogramname = function(value){

            var programarray = Program.programarray(value, '-');

            return programarray[programarray.length-1];

        };

        var getformname = function(value){

            var formname = '';

            _.map(value.itembasicinformation, function(item){
                _.map(item.data,function(data){

                    if(data.componentname==='formname' && data.visible === false){
                        formname = item.value;
                    }

                });
            });
            return formname;

        };


        var getformcoverphoto = function(value){

            var formcoverphoto = '';

            _.map(value.itembasicinformation, function(item){
                _.map(item.data,function(data){

                    if(data.componentname==='formcoverphotoupload'){
                        formcoverphoto = item.value;
                    }

                });
            });
            return formcoverphoto;

        };

        var items = Restangular.all('item');

        $scope.getitems = function() {
            $scope.founditems = [];  $scope.founditemnames = [];
            items.getList().then(function(items) {
                //$scope.allItems = [];
                _.each(items, function(value) {
                     if(Program.is_contains_program(getprogramname(value.itemprogam.name), 'Employee')
                         && value.itemcontrol.published ===true){

                        var el = {
                            wholeprogram:$scope.wholename,
                            value:value,
                            name:getformname(value),
                            coverphoto:getformcoverphoto(value),
                            id:value._id,
                            supervisorformid:'100000'//value.itemassociatedforms[0].supervisorforms[0].id
                            //We do not use seperate supervisor form anymore, so we have to hardcode the formID for now
                            //getprogramname(value.itemprogam.name)
                        };
                        $scope.founditemnames.push(getformname(value));
                        $scope.founditems.push(el);

                    }
                    /*   var iteminformation = {
                     'id': value._id,
                     'name': value.itemcreatedtime,
                     'programname': value.itemprogam.name
                     };

                     $scope.allItems.push(iteminformation); */

                });
                $scope.allItems = $scope.founditems.filter(function(item, pos) {
                    return  $scope.founditemnames.indexOf(item.name) == pos;
                });

                $scope.allItems.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });

            });
        }

        $scope.getitems();

    }]);
