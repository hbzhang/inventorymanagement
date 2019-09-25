/**
 * Created by hbzhang on 3/25/16.
 */

//http://jsfiddle.net/scyrizales/pC9dH/

angular.module('mean.front').controller('InstagramController', [
    '$location','$rootScope',
    '$scope','Global','$http','Program',
    'formtoaster','Restangular','InstagramFactory',
    function($location,$rootScope,$scope,Global,$http,Program,formtoaster,Restangular,InstagramFactory) {
        $scope.global = Global;
        $scope.package = {
            name: 'front'
        };

        $scope.layout = 'grid';
        $scope.setLayout = function(layout){
            $scope.layout = layout;
        };

        $scope.isLayout = function(layout){
            return $scope.layout == layout;
        };

        $scope.pics = [];

        // Usamos el servicio q construimos
        InstagramFactory.fetchPopular(function(data){

         $scope.pics = data;

        });
        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);
