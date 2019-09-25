/**
 * Created by hbzhang on 3/20/17.
 */

angular.module('mean.page').controller('ReviewerFormBasicInformationController', ['$scope','Global',
    'Restangular','Program','$location','URLStateTrack','AllUsers','LocalStorageData',
    function($scope,Global,Restangular,Program,
             $location,URLStateTrack,AllUsers,LocalStorageData) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'page'
        };

        $scope.preurl = window.location.origin +"/#!/revieweremployeeforms/Employee/admin";

        $scope.preurlemployeelist = window.location.origin +"/#!/public/menu/reviewer";

        LocalStorageData.seturlData('reviewerform',$location.absUrl());

        LocalStorageData.seturlData('reviewerapprove',$location.absUrl());

        var splitpath = $location.path().split('/')[3];

        var getformid = function(splitpath){

            var programarray = Program.programarray(splitpath, '-');

            $scope.formid = programarray[programarray.length-1];

            AllUsers.query({}, function(users) {
                _.each(users, function(user) {

                    if(splitpath === user.name){
                        $scope.userid = user._id;
                    }
                });
            });
            LocalStorageData.seturlData('reviewerform',$location.absUrl());

        };
        getformid(splitpath);

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

        var items = Restangular.all('item');

        $scope.getitems = function() {
            $scope.founditems = [];  $scope.founditemnames = [];
            items.getList().then(function(items) {
                _.each(items, function(value) {
                    if(value._id==$scope.formid && value.itemcontrol.published ===true){

                        $scope.formname = getformname(value);

                        $scope.content = value;

                    }

                });

            });
        };

        $scope.getitems();

    }]);
