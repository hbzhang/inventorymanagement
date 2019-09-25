/**
 * Created by hbzhang on 3/23/17.
 */
angular.module('mean.page').controller('IsApprovedController', ['$scope', 'Global',
    'Menus', '$rootScope', '$http', 'Users','formtoaster','$location',
    function($scope, Global, Menus,
             $rootScope, $http, Users,
             formtoaster,$location) {
        $scope.global = Global;

        $scope.approved = function(){
            formtoaster.now.success('Approved.');
        };

        $scope.disapproved = function(){
            formtoaster.now.success('Approval Retracted.');
        };

        var splitpath = $location.path().split('/')[3];

        $scope.revieweragreed = "no"; $scope.supervisoragreed ="no";

        $scope.approved= function() {

            Users.query({}, function(users) {
                _.each(users, function(user) {

                    if(splitpath === user.name){
                        $scope.userapprove = user;

                        if($scope.userapprove.attributes[1] && typeof $scope.userapprove.attributes[1].supervisoragree != 'undefined' )
                        {
                            $scope.supervisoragreed = $scope.userapprove.attributes[1].supervisoragree;
                        }
                        if($scope.userapprove.attributes[1] && typeof $scope.userapprove.attributes[1].revieweragree != 'undefined' )
                        {
                            $scope.revieweragreed = $scope.userapprove.attributes[1].revieweragree;
                        }
                    }
                });

            });
        };

        $scope.approved();

    }
]);