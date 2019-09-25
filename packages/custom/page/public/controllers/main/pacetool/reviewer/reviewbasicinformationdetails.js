/**
 * Created by hbzhang on 3/22/17.
 */

angular.module('mean.page').controller('ReviewerFormBasicInformationDetailsController', ['$scope','Global',
    'Restangular','Program','$location','URLStateTrack','LocalStorageData',
    function($scope,Global,Restangular,
             Program,$location,URLStateTrack,LocalStorageData) {
        $scope.global = Global;
        $scope.package = {
            name: 'page'
        };

        //$scope.preurl  = URLStateTrack.geturlstate($location.absUrl());

        $scope.preurl = LocalStorageData.geturlData('reviewerform');

        LocalStorageData.seturlData('reviewermainform',$location.absUrl());

        $scope.preurlemployeelist = window.location.origin +"/#!/public/menu/reviewer";

        var splitpath = $location.path().split('/')[3];

        var getformid = function(splitpath){

            var programarray = Program.programarray(splitpath, '-');

            $scope.formid = programarray[programarray.length-1];

            $scope.employeename = programarray[0];

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
