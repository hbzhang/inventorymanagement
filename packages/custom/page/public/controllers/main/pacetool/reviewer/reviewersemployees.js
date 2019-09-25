/**
 * Created by hbzhang on 4/6/17.
 */

angular.module('mean.page').controller('ReviewersEmployeesController', ['$scope',
    'Global', 'Menus', '$rootScope', '$http', 'AllUsers','Users',
    function($scope, Global, Menus, $rootScope, $http, AllUsers,Users) {
        $scope.global = Global;
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

                    if($scope.global.user._id === user._id)

                        Users.query({}, function(users1) {
                            _.each(users1, function(user1) {


                                if (user1.attributes[0] && user.attributes[0]
                                    && user.attributes[0]['Position Number']
                                    && user.attributes[0]['Position Number'] === user1.attributes[0]['Reviewer Position Number']) {

                                    $scope.users.push(user1);
                                }

                            });

                            $scope.users.sort(function(a, b) {
                                return a.name.localeCompare(b.name);
                            });

                        });

                });

            });
        };




        $scope.init = function() {

            $scope.getemployees();
        };

    }
]);