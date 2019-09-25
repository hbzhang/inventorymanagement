/**
 * Created by hbzhang on 3/22/17.
 */
angular.module('mean.page').controller('UserApproveController', ['$scope', 'Global',
    'Menus', '$rootScope', '$http', 'Users','formtoaster','$location',
    function($scope, Global, Menus,
             $rootScope, $http, Users,
             formtoaster,$location) {
        $scope.global = Global;

        $scope.user = {};

        $scope.init = function() {
            Users.query({}, function(users) {
                $scope.users = users;
            });
        };

        $scope.submitforreview_sucess = function(){
            formtoaster.now.success('Email sent to Supervisor and Reviewer.');
        };

        $scope.approved = function(){
            formtoaster.now.success('Approved.');
        };

        $scope.disapproved = function(){
            formtoaster.now.success('Approval Retracted.');
        };

        var splitpath = $location.path().split('/')[3];

        $scope.revieweragreed = "no" ; $scope.supervisoragreed ="no";

        var getuser = function(splitpath){

            Users.query({}, function(users) {
                var otherusers = users;
                _.each(users, function(user) {
                    //console.log(user);
                    if(splitpath === user._id){
                        $scope.userapprove = user;

                        if($scope.userapprove.attributes[1] && typeof $scope.userapprove.attributes[1].supervisoragree != 'undefined' )
                            $scope.supervisoragreed = $scope.userapprove.attributes[1].supervisoragree;
                        if($scope.userapprove.attributes[1] && typeof $scope.userapprove.attributes[1].revieweragree != 'undefined' )
                            $scope.revieweragreed = $scope.userapprove.attributes[1].revieweragree;
                    }

                    if($scope.global.user._id === user._id){

                        $scope.employeename = $scope.global.user.name;

                        _.each(otherusers, function(otheruser) {
                            if (otheruser.attributes[0] && user.attributes[0]
                                && user.attributes[0]['Supervisor ID'] === otheruser.attributes[0]['ID#']){
                                $scope.supervisorname = otheruser.attributes[0]['Name'];
                                $scope.supervisortitle = otheruser.attributes[0]['Title'];
                                $scope.supervisoremail = otheruser.attributes[0]['Email'];

                            }
                            if (otheruser.attributes[0] && user.attributes[0]
                                && user.attributes[0]['Reviewer ID'] === otheruser.attributes[0]['ID#']){
                                $scope.reviewername = otheruser.attributes[0]['Name'];
                                $scope.reviewertitle = otheruser.attributes[0]['Title'];
                                $scope.revieweremail = otheruser.attributes[0]['Email'];

                            }
                        });


                    }

                });

            });

        };

        getuser(splitpath);

        $scope.sendemail = function(personname,emailbody,emailaddress,subject){

            var data = $.param({
                emailpersonname: personname,
                emailsubject: subject,
                emailbody: emailbody,
                emailaddress:emailaddress,
                password:'Dsa@2017SendMail!!'
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            };

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

        $scope.submitforreview = function(userid){

            $scope.employeemessage = "Dear: "+ $scope.reviewername +  ', ' + $scope.employeename + "'s Faculty evaluation " +
                 "has been submmited, please proceed to review the submission at pace.dsa.vt.edu";

            $scope.subject = "Employee has submitted faculty evaluation";

            //$scope.userapprove.email,

            $scope.sendemail($scope.employeename,  $scope.employeemessage,'hbzhang@vt.edu', $scope.subject);

            $scope.submitforreview_sucess();

        };


        $scope.supervisorapprove= function() {
            var approve = {};
            approve.supervisoragree = 'yes';
            if(typeof $scope.userapprove.attributes[1] === "undefined")
                $scope.userapprove.attributes[1]=approve;
            else{
                approve = $scope.userapprove.attributes[1];
                approve.supervisoragree = 'yes';
                $scope.userapprove.attributes[1]=approve;
            }
            $scope.userapprove.$update();
            $scope.supervisorapprovemessage = "Dear: "+ $scope.userapprove.name + ", your faculty evaluation has been approved by supervisor";
            $scope.subject = "Supervisor has approved your faculty evaluation submission";
            $scope.sendemail($scope.userapprove.name,  $scope.supervisorapprovemessage, $scope.userapprove.email, $scope.subject);
            $scope.approved();
        };

        $scope.supervisordisapprove= function() {
            var approve = {};
            approve.supervisoragree = 'no';
            if(typeof $scope.userapprove.attributes[1] === "undefined")
                $scope.userapprove.attributes[1]=approve;
            else{
                approve = $scope.userapprove.attributes[1];
                approve.supervisoragree = 'no';
                $scope.userapprove.attributes[1]=approve;
            }
            $scope.userapprove.$update();
            $scope.supervisordisaapprovemessage = "Dear:"+ $scope.userapprove.name + ",your faculty evaluation has been opened by supervisor for continue of evaluation";
            $scope.subject = "Supervisor has reopened your faculty evaluation submission";
            $scope.sendemail($scope.userapprove.name,  $scope.supervisordisaapprovemessage, $scope.userapprove.email,$scope.subject);
            $scope.disapproved();
        };

        $scope.reviewerapprove= function() {
            var approve = {};
            approve.revieweragree = 'yes';
            if(typeof $scope.userapprove.attributes[1] === "undefined")
                $scope.userapprove.attributes[1]=approve;
            else{
                approve = $scope.userapprove.attributes[1];
                approve.revieweragree = 'yes';
                $scope.userapprove.attributes[1]=approve;
            }
            $scope.reviewerapprovemessage = "Dear:"+ $scope.userapprove.name + ", your faculty evaluation has been approved by reviewer";
            $scope.subject = "Reviewer has approved your faculty evaluation submission";
            $scope.sendemail($scope.userapprove.name,  $scope.reviewerapprovemessage, $scope.userapprove.email,$scope.subject);
            $scope.userapprove.$update();
            $scope.approved();
        };

        $scope.reviewerdisapprove= function(user) {
            var approve = {};
            approve.revieweragree = 'no';
            if(typeof $scope.userapprove.attributes[1] === "undefined")
                $scope.userapprove.attributes[1]=approve;
            else{
                approve = $scope.userapprove.attributes[1];
                approve.revieweragree = 'no';
                $scope.userapprove.attributes[1]=approve;
            }
            $scope.reviewerdisaapprovemessage = "Dear:"+ $scope.userapprove.name + ",your faculty evaluation has been opened by reviewer for continue of evaluation";
            $scope.subject = "Reviewer has reopened your faculty evaluation submission";
            $scope.sendemail($scope.userapprove.name,  $scope.reviewerdisaapprovemessage, $scope.userapprove.email,$scope.subject);
            $scope.userapprove.$update();
            $scope.disapproved();
        };

    }
]);