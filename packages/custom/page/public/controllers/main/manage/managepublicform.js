/**
 * Created by hbzhang on 5/2/17.
 */

angular.module('mean.page').controller('ManagePublicFormController', ['$scope',
    'Global','Restangular','Program','$location','LocalStorageData','Users',
    function($scope,Global,Restangular,
             Program,$location,LocalStorageData,Users) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'page'
        };

        LocalStorageData.seturlData('employeeapproved',$location.absUrl());

        var splitpath = $location.path().split('/')[2];

        $scope.wholename = 'Manage';//splitpath;

        $scope.userid = $scope.global.user._id;

        $scope.employeename = $scope.global.user.name;

        $scope.supervisoragreed ="no"; $scope.revieweragreed ="no";

        $scope.getreviewapproval= function() {

            Users.query({}, function(users) {
                _.each(users, function(user) {

                    if($scope.employeename === user.name){
                        $scope.userapprove = user;
                        if($scope.userapprove.attributes[1] && typeof $scope.userapprove.attributes[1].supervisoragree != 'undefined' )
                        {
                            $scope.supervisoragreed = $scope.userapprove.attributes[1].supervisoragree;

                        }
                        if($scope.userapprove.attributes[1] && typeof $scope.userapprove.attributes[1].revieweragree != 'undefined' )
                        {
                            $scope.revieweragreed = $scope.userapprove.attributes[1].revieweragree;

                        }
                    }
                });

            });

        };

        $scope.getreviewapproval();

        var getrootprogram = function(splitpath){

            var programarray = Program.programarray(splitpath, '-');

            $scope.rootprogram = programarray[0];

        };
        getrootprogram(splitpath);


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
            $scope.founditems = [];  $scope.founditemnames = [];  $scope.allPublicformItems = [];
            items.getList().then(function(items) {

                _.each(items, function(value) {

                    if(Program.is_contains_program(getprogramname(value.itemprogam.name), getprogramname($scope.wholename)) && value.itemcontrol.published ===true){

                        var el = {
                            wholeprogram:$scope.wholename,
                            value:value,
                            name:getformname(value),
                            coverphoto:getformcoverphoto(value),
                            id:value._id
                            //getprogramname(value.itemprogam.name)
                        };
                        $scope.founditemnames.push(getformname(value));
                        $scope.founditems.push(el);

                    }
                    //console.log($scope.founditems.length);
                    /*   var iteminformation = {
                     'id': value._id,
                     'name': value.itemcreatedtime,
                     'programname': value.itemprogam.name
                     };

                     $scope.allItems.push(iteminformation); */

                });
                $scope.allPublicformItems = $scope.founditems.filter(function(item, pos) {
                    return  $scope.founditemnames.indexOf(item.name) == pos;
                });

            });
        }

        $scope.getitems();

    }]);

