/**
 * Created by hbzhang on 6/19/17.
 */
angular.module('mean.workspace').controller('AllUsersinSystemController', ['$scope',
    'Global', 'Menus', '$rootScope', '$http',
    'AllUsers','Users','LocalStorageData','$location',
    function($scope, Global, Menus,
             $rootScope, $http, AllUsers,Users,
             LocalStorageData,$location) {
        $scope.global = Global;
        LocalStorageData.seturlData('allusersinsystem',$location.absUrl());
        $scope.userSchema = [{
            title: 'Email',
            schemaKey: 'email',
            type: 'email',
            inTable: true
        }, {
            title: 'Name',
            schemaKey: 'name',
            type: 'text',
            inTable: true
        }, {
            title: 'Username',
            schemaKey: 'username',
            type: 'username',
            inTable: true
        }, {
            title: 'Roles',
            schemaKey: 'roles',
            type: 'select',
            options: ['authenticated', 'admin'],
            inTable: true
        }, {
            title: 'Password',
            schemaKey: 'password',
            type: 'password',
            inTable: false
        }, {
            title: 'Repeat password',
            schemaKey: 'confirmPassword',
            type: 'password',
            inTable: false
        }];
        $scope.user = {};
        $scope.users = [];

        $scope.getemployees= function() {

            Users.query({}, function(users) {
                _.each(users, function(user) {

                    $scope.users.push(user);
                });
                $scope.users.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                });

            });
        };


        $scope.init = function() {

            $scope.getemployees();
            /*AllUsers.query({}, function(users) {
             $scope.users = users;
             });*/
        };

}]);
