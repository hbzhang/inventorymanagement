/**
 * Created by hbzhang on 6/20/17.
 */
angular.module('mean.workspace').controller('SubmissionController', ['$scope','Global',
    'Restangular','Program','$location','$builder',
    '$validator','formtoaster','$rootScope','$state','URLStateTrack','$location','LocalStorageData',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,
             formtoaster,$rootScope,$state,URLStateTrack,$location,LocalStorageData) {

        $scope.global = Global;

        $scope.package = {
            name: 'page'
        };

        LocalStorageData.seturlData('versioncontrolform',$location.absUrl());

        $scope.preurl = LocalStorageData.geturlData('allusersinsystem');

        $scope.pop_removed = function(){
            formtoaster.now.warning('The registered item was just removed.');
        };

        var registers = Restangular.all('registration');
        var items = Restangular.all('item');
        var backups = Restangular.all('backup');

        $rootScope.$on('wholeprogramforform', function(event, args) {

            //$scope.wholeprogramforform = args.id;
        });

        var getcontentID = function(){
            $scope.userID = $location.path().split('/')[5];
            //var programarray = Program.programarray($scope.wholeprogramforform, '-');
            //$scope.contentid = programarray[programarray.length-1];
        };

        getcontentID();

        var is_belongto_user = function(user){
            var belongto_user = false;
            if( $scope.userID === user.name)
                belongto_user = true;
            return belongto_user;
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

        $scope.allRegisteredItems  = [];

        $scope.getbackups = function() {
            backups.getList().then(function(backups) {
                $scope.allRegisteredItems = [];
                _.each(backups, function(value) {
                    if(typeof value.users !== "undefined" && is_belongto_user(value.users)) {
                        items.getList().then(function(items) {

                            _.each(items,function(value1) {

                                if(value1._id === value.reasonforregister ) {
                                    $scope.formname = getformname(value1);

                                }});

                            var el = {
                                value: value,
                                formname: $scope.formname
                            };
                            $scope.allRegisteredItems.push(el);
                            $scope.allRegisteredItems.sort(function(a, b) {
                                return a.formname.localeCompare(b.formname);
                            });

                        })

                    }

                });



            });
        };

        $scope.getbackups();


    }]);

