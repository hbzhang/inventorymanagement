/**
 * Created by hbzhang on 3/1/17.
 */
angular.module('mean.page').controller('PayMainMenuController', ['$scope','Global','Restangular','Program','$location',
    function($scope,Global,Restangular,Program,$location) {
        $scope.global = Global;
        // $scope.checked;
        $scope.package = {
            name: 'front'
        };

        $scope.customname = 'pay';

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

                    if(value.itemcustom && value.itemcustom.name ===   $scope.customname){
                        console.log('value.itemprogam.name');
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
                $scope.allItems = $scope.founditems.filter(function(item, pos) {
                    return  $scope.founditemnames.indexOf(item.name) == pos;
                });


            });
        }

        $scope.getitems();

    }]);

