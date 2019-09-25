/**
 * Created by hbzhang on 3/5/15.
 */
angular.module('mean.product').controller('CreateItemController',  [
    '$scope', '$builder',
    '$validator', 'CreateForm',
    '$http','Global',
    'Restangular','$rootScope',
    'toaster','$location',
    '$window','DataCommunication','AssociatedFormCommunication',
    function($scope, $builder,
             $validator,
             CreateForm,$http,
             Global,Restangular,
             $rootScope,toaster,
             $location,$window,
             DataCommunication,AssociatedFormCommunication) {
        $scope.global = Global;

        $scope.clearitems = function(){

            $rootScope.$emit('needtoclearitemlist', {
                data: ''
            });
        };

        $scope.pop = function(){
            toaster.pop('success', "", 'Good Job, ya, the form was just created', 4500, 'trustedHtml', 'goToLink');
        };

        $scope.pop_error = function(){
            toaster.pop('error',
                "", 'There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.'
                , 4500, 'trustedHtml', 'goToLink');
        };


        /*$rootScope.$on('supervisorassociatedforms', function(event, args) {
            $rootScope.supervisorassociatedforms = args;
            console.log('supervisorassociatedforms callback received');
            console.log($scope.supervisorassociatedforms);
        });*/



        var forms = Restangular.all('form');

        $scope.addFormObject = function(form){
            $scope.formname =  $scope.forminformation.formname(form.formbasicinformation);
            //console.log(form.formformbuilder);

            for (var j = 0; j < form.formformbuilder.length; j++) {
                form.formformbuilder[j].id = 'itembuiltinforms' + j;
                $builder.addFormObject('itembuiltinforms', form.formformbuilder[j]);
            }
        };

        $builder.removeAllObjects('itembuiltinforms');

        $scope.form = $builder.forms['itembuiltinforms'];

        $scope.random = Math.random();

        $scope.forminformation = CreateForm.builtinforminformation;

        $scope.formid = $location.path().split('/')[3];

        var builtinformprogramid = [
            {id: 'formprogramtextbox'}
        ];

        $scope.getforms = function() {
            forms.getList().then(function(forms) {

                _.each(forms,function(value) {

                    if(value._id ===  $scope.formid) {

                       $scope.formprogram = _.filter(value.formbasicinformation, function(formbasic){
                            return _.find(builtinformprogramid, function(builtin){
                                return formbasic.id === builtin.id;
                            });
                        });

                        //$rootScope.$broadcast('addbuiltinform', {data: newValue, elementid:'formprogramtextbox'});
                        $scope.addFormObject(value);
                    }});
            })
            //$state.forceReload();
        };

        $scope.getforms();


        var items = Restangular.all('item');
        $scope.saveitem = function(){

            return $validator.validate($scope, 'itembuiltinforms').success(function() {

                var item = {};
                item.itembasicinformation = $scope.input;
                item.itemformbuilder =  $scope.itemform;
                item.itemcreator = $scope.global.user._id;
                var el={
                    published:true
                }
                item.itemcontrol = el;
                item.itemothers = [];
                item.itemcustom = {};
                if($scope.input[4])
                item.itemcustom.name = $scope.input[4].value;
                item.itemcustom.id =  $scope.formid;
                item.itemprogam = {};
                item.itemprogam.name = $scope.formprogram[0].value;
                if($scope.input[3])
                item.itemprogam.display = $scope.input[3].value;
                item.itemprogam.id =  $scope.formid;
                item.itemassociatedforms = [];
                var supervisorformsitem = {};
                //here we do not use assocaited form anymore for now
                supervisorformsitem.supervisorforms = "";//AssociatedFormCommunication.getsupervisorassociatedforms();
                item.itemassociatedforms.push(supervisorformsitem);
                item.itemcreatedtime = new Date().toLocaleString();

                /*var itemcoverphoto = {
                    id:DataCommunication.getFormcoverphoto()
                }
                item.itemothers.push(itemcoverphoto);*/

                items.post(item);
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            });

        };

      /* $scope.init = function () {
            CreateForm.builtinforms();
        };

        $scope.init(); */


        //$builder.removeAllObjects('itembuiltinforms');
        //$scope.builtinform = $builder.forms['itembuiltinforms'];
        $builder.removeAllObjects('itemform');
        $scope.itemform = $builder.forms['itemform'];
        $scope.input = [];
        $scope.defaultValue = {};
        return $scope.submit = function() {
            return $validator.validate($scope, 'itembuiltinforms').success(function() {
                $scope.saveitem();
                //$scope.pop();
                return console.log('success in creating the item');
            }).error(function() {
                return console.log('error');
            });
        };
        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }])
    .controller('ListItemController',  [
        '$scope', '$builder', '$validator', 'CreateForm', '$http','Global','Restangular',
        function($scope, $builder, $validator, CreateForm,$http,Global,Restangular) {
            $scope.global = Global;

            $scope.pop = function(){
                formtoaster.now.success('Your form was just created.');
            };

            var forms = Restangular.all('form');

            var builtinformnameid = [
                {id: 'formnametextbox'}
            ];

            var builtinformprogramid = [
                {id: 'formprogramtextbox'}
            ];

            var builtinformdesciptioneid = [
                {id: 'formdescriptiontextbox'}
            ];


            $scope.getforms = function() {
                forms.getList().then(function(forms) {
                    $scope.allForms = [];
                    _.each(forms, function(value) {

                        var formname = _.filter(value.formbasicinformation, function(formbasic){
                            return _.find(builtinformnameid, function(builtin){
                                return formbasic.id === builtin.id;
                            });
                        });

                        var formprogram = _.filter(value.formbasicinformation, function(formbasic){
                            return _.find(builtinformprogramid, function(builtin){
                                return formbasic.id === builtin.id;
                            });
                        });

                        var formdescription = _.filter(value.formbasicinformation, function(formbasic){
                            return _.find(builtinformdesciptioneid, function(builtin){
                                return formbasic.id === builtin.id;
                            });
                        });

                        var forminformation = {'id' : value._id, 'name':formname, 'program': formprogram, 'description':formdescription};


                        $scope.allForms.push(forminformation);


                    });


                });
            }

            $scope.getforms();

            // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
        }])
    .controller('UpdateCreatedListItemController',  [
        '$scope', '$rootScope',
        function($scope, $rootScope) {

            $scope.updateitems = function(){

                $rootScope.$emit('needtoupdateitemlist', {
                    data: ''
                });
            };

        }])
    .controller('ListCreatedItemController',  [
    '$scope', '$builder', '$validator', 'CreateForm', '$http','Global',
        'Restangular','toaster','$location','$rootScope',
        function($scope, $builder, $validator, CreateForm,
             $http,Global,Restangular,toaster,$location,
             $rootScope) {
        $scope.global = Global;

        $scope.pop_updated = function(){
            toaster.pop('success', "", 'The event was just removed', 4500, 'trustedHtml', 'goToLink');
        };

        $scope.pop_removed = function(){
            toaster.pop('warning', "", 'The event was just removed', 4500, 'trustedHtml', 'goToLink');
        };


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
                _.each(items, function(value) {
                    if(value.itemprogam.id ===  itemid) {
                        var iteminformation = {
                            'id': value._id,
                            'name': getformname(value),
                            'time':value.itemcreatedtime,
                            'programname': value.itemprogam.name,
                            'itemcontrol':value.itemcontrol
                        };

                        $scope.allItems.push(iteminformation);
                    }
                });
            });
        };

        $scope.getitems();

        $rootScope.$on('needtoupdateitemlist', function(event, args) {
            $scope.getitems();
        });


        $rootScope.$on('needtoclearitemlist', function(event, args) {
                $scope.allItems = [];
        });

        $scope.updateitem = function(itemtoupdate){
            //console.log('USERID: ' + $scope.global.user._id);
            //console.log(itemtoupdate);
            Restangular.one('item/' + itemtoupdate.id).get().then(function(item) {
                if (itemtoupdate.itemcontrol.published === true) {
                    var el={
                        published:false
                    }
                    item.itemcontrol = el;
                }
                if (itemtoupdate.itemcontrol.published === false) {
                    var el={
                        published:true
                    }
                    item.itemcontrol = el;
                }
                item.save();
                $scope.getitems();
                $scope.getitems();
                $scope.pop_updated();
            });
        };

        $scope.removeItem = function(item){

            var mongoitem = Restangular.one("item", item.id).remove().then(function() {

            // var mongoitem = Restangular.one("form", '56f2f560ffe613efcd81983b').remove().then(function() {
            //var mongoitem = Restangular.one("item/56c76e2824b4c500006746ac");
            //mongoitem.remove();

            var index = 0;
            _.each($scope.allItems,function(value) {
                if (value.id === item.id) {
                    $scope.allItems.splice(index, 1);
                    return;
                }
                index = index + 1;
            });
            $scope.pop_removed();

            });

        };
        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);
    }]).controller('EditCreatedItemController', [
    '$rootScope','$scope',
     '$builder', '$validator',
     'CreateForm', '$location',
     'Restangular','toaster',
     'Global','DataCommunication','AssociatedFormCommunication',
    function($rootScope, $scope, $builder,
             $validator,CreateForm,$location,
             Restangular,toaster,
             Global,DataCommunication,AssociatedFormCommunication) {

       $scope.global = Global;

       $scope.pop = function(){
            toaster.pop('success', "", 'The item was just updated', 4500, 'trustedHtml', 'goToLink');
        };

        $scope.pop_error = function(){
            toaster.pop('error',
                "", 'There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.'
                , 4500, 'trustedHtml', 'goToLink');
        };

        var items = Restangular.all('item');

        $builder.removeAllObjects('itembuiltinforms');
        //$scope.builtinform = $builder.forms['itembuiltinforms'];
        $builder.removeAllObjects('itemform');
        $scope.itemform = $builder.forms['itemform'];
        $scope.input = [];
        $scope.defaultValue = {};


        $scope.addFormObject = function(item){

            for (var j = 0; j < item.itemformbuilder.length; j++) {
                //item.itemformbuilder[j].id = 'itembuiltinforms' + j;
                $builder.addFormObject('itemform', item.itemformbuilder[j]);
            }

        };

        $scope.createditemid = $location.path().split('/')[3];

        $scope.getcreateditems = function() {
            items.getList().then(function(items) {

                _.each(items,function(value) {

                    if(value._id ===  $scope.createditemid) {

                        _.each(value.itembasicinformation,function(itembasic) {

                            $scope.defaultValue[itembasic.id] = itembasic.value;
                        });

                        //$rootScope.$broadcast('addbuiltinform', {data: newValue, elementid:'formprogramtextbox'});
                        $scope.addFormObject(value);
                    }});
            })
            //$state.forceReload();
        };

        $scope.getcreateditems();


        $scope.addBuiltinItemObject = function(form){
            //$scope.formname =  $scope.forminformation.formname(form.formbasicinformation);
            //console.log(form.formformbuilder);

            for (var j = 0; j < form.formformbuilder.length; j++) {
                form.formformbuilder[j].id = 'itembuiltinforms' + j;
                $builder.addFormObject('itembuiltinforms', form.formformbuilder[j]);
            }
        };


        var forms = Restangular.all('form');


        $scope.getforms = function() {

                    items.getList().then(function(items) {

                        _.each(items,function(itemvalue) {

                         forms.getList().then(function (forms) {

                                _.each(forms, function (value) {

                                 $scope.formid = value._id;

                                 if (itemvalue.itemprogam.id === value._id && itemvalue._id ===  $scope.createditemid ) {

                                  //DataCommunication.SendFormcoverphoto($scope,itemvalue.itemothers[0].id);

                                  return $scope.addBuiltinItemObject(value);
                                }
                               });
                         });
                    });

                });


        };

        $scope.getforms();

        $scope.updateitem = function(){
            return $validator.validate($scope, 'itembuiltinforms').success(function() {
                Restangular.one('item/' + $scope.createditemid).get().then(function(item) {
                item.itembasicinformation = $scope.input;
                if($scope.input[4])
                item.itemcustom.name = $scope.input[4].value;
                //item.itemprogam1 = {};
                //item.itemprogam1.id =  $scope.formid;
                //item.itemprogam.name = 'Employees'; //$scope.input.formbasicinformation[1].value
                if($scope.input[3])
                item.itemprogam.display = $scope.input[3].value;
                item.itemformbuilder =  $scope.itemform;
                item.itemcreator = $scope.global.user._id;
                item.itemcreatedtime = new Date().toLocaleString();
                item.itemassociatedforms = [];
                var supervisorformsitem = {};
                supervisorformsitem.supervisorforms = AssociatedFormCommunication.getsupervisorassociatedforms();
                item.itemassociatedforms.push(supervisorformsitem);
                item.itemcreatedtime = new Date().toLocaleString();
                item.save();
                $scope.pop();

            });
            }).error(function() {
                $scope.pop_error();
            });
        };


        return $scope.submit = function() {
            $scope.updateitem();
        };

    }]);