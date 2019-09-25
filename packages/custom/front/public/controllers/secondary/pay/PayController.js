/**
 * Created by hbzhang on 3/30/15.
 */
angular.module('mean.front').controller('PayController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope',
    '$http','$window','LocalStorageData','md5','sha256',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster,$rootScope,
             $http,$window,LocalStorageData,md5,sha256) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Your register was just submitted. You can find your submission in the results Tab');
        };

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };

        $builder.removeAllObjects('registerform');

        $scope.input = [];

        $scope.addFormObject = function(form){
            //console.log(form);
            for (var j = 0; j < form.length; j++) {
                form[j].id = 'item' + j;
                $builder.addFormObject('registerform', form[j]);
            }

        };

        $scope.is_display_the_item = function(value){

            var do_not_display = true;

            _.map(value.data,function(data){

                if(data.visible === false){
                    do_not_display = false;
                }

            });
            return do_not_display;

        };

        var items = Restangular.all('item');

        var registers = Restangular.all('registration');

        $scope.getitems = function() {
            $scope.content = [];
            items.getList().then(function(items) {
                $scope.allItems = [];
                //console.log(items);
                _.each(items, function(value) {

                    if(value.itemcustom && value.itemcustom.name ===  'pay' ){
                        // console.log(value);
                        $scope.formid = value._id;
                        var el = {
                            valueid:value._id,
                            value:value
                        };

                        $scope.content.push(el);
                        $scope.addFormObject(value.itemformbuilder);
                    }


                    /*   var iteminformation = {
                     'id': value._id,
                     'name': value.itemcreatedtime,
                     'programname': value.itemprogam.name
                     };

                     $scope.allItems.push(iteminformation); */

                });

            });
        };

        $scope.getitems();

        $scope.form = $builder.forms['registerform'];
        $scope.input = [];
        $scope.defaultValue = {};


        $scope.payit = function() {

            return $validator.validate($scope, 'registerform').success(function() {
                var rand = 1;
                $scope.initRand = function(){
                    rand = Math.floor((Math.random()*10000000)+1)
                }

                $scope.initRand();

                $scope.getRandomSpan = function(){
                    return rand;
                }

                var orderType = "VTRecSportsMemorialTournament";//"VTRecSportsMemorialTournament";
                var orderNumber = $scope.getRandomSpan();
                LocalStorageData.setpayData('orderNumber',orderNumber);
                LocalStorageData.setpayData('orderType',orderType);
                LocalStorageData.setpayData('item1',$scope.input[0].value);
                LocalStorageData.setpayData('item2',$scope.input[1].value);
                LocalStorageData.setpayData('item3',$scope.input[2].value);
                LocalStorageData.setpayData('item4',$scope.input[3].value);
                LocalStorageData.setpayData('item5',$scope.input[4].value);
                LocalStorageData.setpayData('item6',$scope.input[5].value);
                LocalStorageData.setpayData('item7',$scope.input[6].value);
                LocalStorageData.setpayData('formid', $scope.formid);

                var amount = $scope.input[6].value*150*100; // we have to multiply here by 100 because the payment processor expects amount in cents.
                var userChoice1,userChoice2;
                if($scope.input[0])
                    userChoice1 = $scope.input[1].value;
                else
                    userChoice1 ='';
                if($scope.input[1])
                    userChoice2 = $scope.input[0].value;
                else
                    userChoice2 ='';
                var redirectURL = "http://pay.recsports.vt.edu/#!/memorialtournament";//'http://pay.recsports.vt.edu/memorialtournament';
                var redirectParameters ="orderNumber, transactionAcountType, transactionResultCode, accountHolderName, transactionId,  transactionStatus, transactionTotalAmount";
                var retriesAllowed = "5";
                var d = new Date();
                var timestamp = Math.floor(d.getTime());
                var secretKey = 'ZKygp,sP\\IAO:YE*T:n*+$As7"H^^f<~|*j}3!\'p.5GtO.b14!JKZEdHtODeWUon'; //goto_key;
// Create hash
                var hash = "";
                hash = orderType;
                hash  += orderNumber;
                hash += amount;
                hash += userChoice1;
                hash += userChoice2;
                hash += redirectURL;
                hash += redirectParameters;
                hash += retriesAllowed;
                hash += timestamp;
                hash += secretKey;
                hash =  sha256.convertToSHA256(hash);//md5.createHash(hash);


                //http://stackoverflow.com/questions/332872/encode-url-in-javascript
                var href ="https://quikpayasp.com/vt/commerce_manager/payer.do?orderType=VTRecSportsMemorialTournament";


                //var href = "https://quikpayasp.com/vt/commerce_manager/payer.do?orderType=VTRecSportsVentureOut";

                href += "&orderNumber=" + escape(orderNumber);
                href += "&amount=" + escape(amount);
                href += "&userChoice1=" + escape(userChoice1);
                href += "&userChoice2=" + escape(userChoice2);
                href += "&redirectUrl=" + escape(redirectURL);
                href += "&redirectUrlParameters=" + redirectParameters;
                href += "&retriesAllowed=" + escape(retriesAllowed);
                href += "&timestamp=" + escape(timestamp);
                href += "&hash=" + escape(hash);

                $window.location.href = href;
            }).error(function() {
                $scope.pop_error();
            });


            /*$http.get('http://www.viudadesoubrier.com/angular/model.php')
                .success(function(data) {
                    $scope.names = eval(data);
                    console.log(data)
                })
                .error(function(data) {
                    alert(data);
                    console.log('Error: ' + data);
                });
             */

        };

        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);
