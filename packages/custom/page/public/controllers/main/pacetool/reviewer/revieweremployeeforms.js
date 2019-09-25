/**
 * Created by hbzhang on 12/7/16.
 */
angular.module('mean.page').controller('ReviewerEmployeeFormController', ['$scope','Global','Restangular',
    'Program','$location',
    function($scope,Global,Restangular,Program,$location) {
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


        var splitpath = $location.path().split('/')[2];

        $scope.wholename = 'Employee';//splitpath;


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
            $scope.founditems = [];  $scope.founditemnames = [];
            items.getList().then(function(items) {
                _.each(items, function(value) {

                    if(value.itemprogam.name ===  'Reviewer'&& value.itemcontrol.published ===true){

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

                });
                $scope.allItems = $scope.founditems.filter(function(item, pos) {
                    return  $scope.founditemnames.indexOf(item.name) == pos;
                });

            });
        }

        $scope.getitems();

    }]);

