/**
 * Created by hbzhang on 2/13/17.
 */
/**
 * Created by hbzhang on 3/5/15.
 */
angular.module('mean.product').controller('ListAssocaitedSupervisorItemController',  [
        '$scope', '$builder', '$validator', 'CreateForm', '$http','Global',
        'Restangular','toaster','$location','$rootScope','AssociatedFormCommunication',
        function($scope, $builder, $validator, CreateForm,
                 $http,Global,Restangular,toaster,$location,
                 $rootScope,AssociatedFormCommunication) {
            $scope.global = Global;


            var items = Restangular.all('item');

            var itemid = $location.path().split('/')[3];


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

            $scope.getitems = function() {
                items.getList().then(function(items) {
                    $scope.inputAssociatedSupervisor = [];
                    //$scope.supervisorassociatedforms = [];
                    _.each(items, function(value) {
                        if(value.itemprogam.name ===  'Supervisor') {
                            var iteminformation = {
                                'id': value._id,
                                'name': getformname(value),
                                'ticked':true
                            };
                            $scope.inputAssociatedSupervisor.push(iteminformation);
                            //$scope.supervisorassociatedforms.push(iteminformation);
                        }
                    });
                });
            };

            $scope.getitems();


            /*  the call back function of multiple select
               $scope.fClick = function( data ) {
                   $rootScope.$emit('supervisorassociatedforms', {
                       data: data
                   });
               };
             */

        $scope.fClose = function() {
                /*$rootScope.$broadcast('supervisorassociatedforms', {
                    data: $scope.supervisorassociatedforms
                });*/
                AssociatedFormCommunication.setsupervisorassociatedforms($scope.supervisorassociatedforms);
                //console.log($scope.supervisorassociatedforms);

        };


        }]).controller('ListAssocaitedReviewerItemController',  [
        '$scope', '$builder', '$validator', 'CreateForm', '$http','Global',
        'Restangular','toaster','$location','$rootScope',
        function($scope, $builder, $validator, CreateForm,
                 $http,Global,Restangular,toaster,$location,
                 $rootScope) {
            $scope.global = Global;


            var items = Restangular.all('item');

            var itemid = $location.path().split('/')[3];


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

            $scope.getitems = function() {
                items.getList().then(function(items) {
                    $scope.inputAssocaitedReviewer = [];
                    _.each(items, function(value) {
                        if(value.itemprogam.name ===  'Reviewer') {
                            var iteminformation = {
                                'id': value._id,
                                'name': getformname(value)
                            };

                            $scope.inputAssocaitedReviewer.push(iteminformation);
                        }
                    });
                });
            };

            $scope.getitems();


            $rootScope.$emit('reviewerassociatedforms', {
                data: $scope.supervisorassociatedforms
            });

        }]).controller('ListAssocaitedEmbedItemController',  [
    '$scope', '$builder', '$validator', 'CreateForm', '$http','Global',
    'Restangular','toaster','$location','$rootScope',
    function($scope, $builder, $validator, CreateForm,
             $http,Global,Restangular,toaster,$location,
             $rootScope) {
        $scope.global = Global;


        var items = Restangular.all('item');

        var itemid = $location.path().split('/')[3];


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

        $scope.getitems = function() {
            items.getList().then(function(items) {
                $scope.inputAssocaitedEmbed = [];
                _.each(items, function(value) {
                    if(value.itemprogam.name ===  'Embed') {
                        var iteminformation = {
                            'id': value._id,
                            'name': getformname(value)
                        };

                        $scope.inputAssocaitedEmbed.push(iteminformation);
                    }
                });
            });
        };

        $scope.getitems();


    }]).controller('OtherFormMultipleSelectController',  [
        '$scope', '$builder', '$validator', 'CreateForm', '$http','Global',
        'Restangular','toaster','$location','$rootScope',
        function($scope, $builder, $validator, CreateForm,
                 $http,Global,Restangular,toaster,$location,
                 $rootScope) {
            $scope.global = Global;


            var items = Restangular.all('item');

            var itemid = $location.path().split('/')[3];


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

            $scope.getitems = function() {
                items.getList().then(function(items) {
                    $scope.allItems = [];
                    $scope.inputAssocaitedOther = [];
                    _.each(items, function(value) {
                        if(value.itemprogam.name ===  'Others') {
                            var iteminformation = {
                                'id': value._id,
                                'name': getformname(value)
                            };

                            $scope.inputAssocaitedOther.push(iteminformation);
                        }
                    });
                });
            };

            $scope.getitems();

            // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
        }]);