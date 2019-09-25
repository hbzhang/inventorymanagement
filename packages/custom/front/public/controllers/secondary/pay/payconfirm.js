/**
 * Created by hbzhang on 3/30/15.
 */
angular.module('mean.front').controller('PayConfirmController', ['$scope','Global',
    'Restangular','Program','$location','$builder','$validator','formtoaster','$rootScope',
    '$http','$window','LocalStorageData','md5','sha256',
    function($scope,Global,Restangular,Program,$location,$builder,$validator,formtoaster,$rootScope,
             $http,$window,LocalStorageData,md5,sha256) {
        $scope.global = Global;

        $scope.pop = function(){
            formtoaster.now.success('Thank you for registering Jerry Colyer Memorial Classic!');
        };

        $scope.pop_error = function(){
            formtoaster.now.error('There are errors in your submission. Likely you have forgot to fill out all required fields' +
                ' You have to fix them before you can submit.');
        };


        $scope.SendData = function () {

            var body = '<p><strong>This is your payment receipt information</strong></p><br /><br /> ' +
                '<strong>OrderNumber</strong>:' + $location.search().orderNumber +' <br /><br />'+
                '<strong>TransactionID</strong>:' + $location.search().transactionId+'</p> <br /><br />'+
                '<strong>TransactionTotalAmount</strong>:' +  Number($location.search().transactionTotalAmount)/100 +' USD<br /><br />'+
                '<strong>Team Name</strong>:' +  LocalStorageData.getpayData('item1')+'<br /><br />' +
                '<strong>Contact First/Last Name</strong>:' +  LocalStorageData.getpayData('item2')+'<br /><br />' +
                '<strong>Email</strong>:' +  LocalStorageData.getpayData('item3')+'<br /><br />' +
                '<strong>Age Group(s)</strong>:' +  LocalStorageData.getpayData('item4')+'<br /><br />' +
                '<strong>Gender</strong>:' +  LocalStorageData.getpayData('item5')+'<br /><br />' +
                '<strong>Cell Phone</strong>:' +  LocalStorageData.getpayData('item6')+'<br /><br />' +
                '<strong>Number of Teams</strong>:' +  LocalStorageData.getpayData('item7')+'<br /><br />'


            var data = $.param({
                emailpersonname: LocalStorageData.getpayData('item2'),
                emailsubject: 'Jerry Colyer Memorial Classic',
                emailbody: body,
                emailaddress:LocalStorageData.getpayData('item3')
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            var url = "https://checkin.recsports.vt.edu/api/v1/send/sendmail";

            $http.post(url, data, config)
                .success(function (data, status, headers, config) {
                    $scope.PostDataResponse = data;
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
        };

        var registers = Restangular.all('registration');

        $scope.updateregister = function(registrationid){
            //console.log('USERID: ' + $scope.global.user._id);
            return $validator.validate($scope, 'registerform').success(function() {
                Restangular.one('registration/' + registrationid).get().then(function(register) {
                    //console.log(register);
                    register.information = $scope.input;
                    register.reasonforregister = $scope.itemid;
                    register.users = $scope.global.user._id;
                    register.qrcode = [];
                    register.save();
                    $scope.pop();
                });
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            })};


        $scope.createnewregister = function(registrationid){
            //console.log('USERID: ' + $scope.global.user._id);

            $scope.SendData();

            var orderNumber = $location.search().orderNumber;
            var transactionAcountType = $location.search().transactionAcountType;
            var transactionId = $location.search().transactionId;
            var transactionStatus=$location.search().transactionStatus;
            var transactionTotalAmount = $location.search().transactionTotalAmount;
            var d = new Date();
            var timestamp = d.setTime($location.search().timestamp);

            console.log(LocalStorageData.getpayData('item1'));
            console.log(LocalStorageData.getpayData('item4'));

            $scope.payinformation = {};
            $scope.payinformation.orderNumber = orderNumber;
            $scope.payinformation.transactionAcountType = transactionAcountType;
            $scope.payinformation.transactionId = transactionId;
            $scope.payinformation.transactionStatus = transactionStatus;
            $scope.payinformation.transactionTotalAmount = Number(transactionTotalAmount)/100;
            $scope.payinformation.timestamp = timestamp;

            $scope.payinformation.item1 = LocalStorageData.getpayData('item1');
            $scope.payinformation.item2 = LocalStorageData.getpayData('item2');
            $scope.payinformation.item3 = LocalStorageData.getpayData('item3');
            $scope.payinformation.item4 = LocalStorageData.getpayData('item4');
            $scope.payinformation.item5 = LocalStorageData.getpayData('item5');
            $scope.payinformation.item6 = LocalStorageData.getpayData('item6');
            $scope.payinformation.item7 = LocalStorageData.getpayData('item7');
            $scope.payinformation.formid = LocalStorageData.getpayData('formid');


            return $validator.validate($scope, 'registerform').success(function() {
                var register = {};
                register.information =  $scope.payinformation;
                register.reasonforregister =  $scope.payinformation.formid ;
                //register.users = 'admin';//$scope.global.user._id;
                register.qrcode = [];
                registers.post(register);
                $scope.pop();
            }).error(function() {
                $scope.pop_error();
            })};

        $scope.createnewregister();

        $scope.saveregisteries = function() {

            exist =false;
            registers.getList().then(function(registers) {
                _.each(registers, function(value) {
                    if(value.reasonforregister ===  $scope.formid){

                        $scope.updateregister(value._id);
                        exist =true;
                        return;
                    }
                });

            });

            if( exist ===false){
                $scope.createnewregister();
            }

        };


        // $scope.pt = SlidePanelContentData.getMeds($route.current.params.id);

    }]);
