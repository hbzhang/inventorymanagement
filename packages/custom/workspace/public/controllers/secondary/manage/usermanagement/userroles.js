/**
 * Created by hbzhang on 6/30/17.
 */
angular.module('mean.workspace').controller('UserRolesController', ['$scope', 'Global',
    'Menus', '$rootScope', '$http', 'Users','formtoaster','$location',
    function($scope, Global, Menus,
             $rootScope, $http, Users,
             formtoaster,$location) {
        $scope.global = Global;

        $scope.setuserroles_finish = function(){
            formtoaster.now.success('User Roles Changes Finished.');
        };

        $scope.setroles= function() {

            Users.query({}, function(users) {

                Users.query({}, function(users1) {

                    _.each(users, function(user) {

                        if(user.email === "hbzhang@vt.edu"){
                            user.roles = ['authenticated','admin'];
                            user.$update();
                        }
                        _.each(users1, function(user1) {

                            if (user1.attributes[0]&& user.attributes[0]
                                && user1.attributes[0]['Position Number']
                                && user1.attributes[0]['Position Number'] === user.attributes[0]['Supervisor Position Number ']){

                                if(Array.isArray(user1.roles)) {
                                    //console.log(user1);
                                    if( user1.roles.indexOf('supervisor') <= -1)
                                        user1.roles.push('supervisor');
                                    if( user1.roles.indexOf('authenticated') <= -1)
                                        user1.roles.push('authenticated');

                                }
                                else {
                                    user1.roles = ['authenticated','supervisor'];

                                }
                                user1.$update();

                            }

                            if (user1.attributes[0] && user.attributes[0]
                                && user1.attributes[0]['Position Number']
                                && user1.attributes[0]['Position Number'] === user.attributes[0]['Reviewer Position Number']){


                                if(Array.isArray(user1.roles)) {
                                    //console.log(user1)
                                    if (user1.roles.indexOf('reviewer')  <= -1)
                                        user1.roles.push('reviewer');
                                    if (user1.roles.indexOf('authenticated')  <= -1)
                                        user1.roles.push('authenticated');
                                }
                                else{

                                    user1.roles = ['authenticated','reviewer'];

                                }
                                user1.$update();
                            }

                        });
                    });
                    $scope.setuserroles_finish();
                });

            });
        };

        $scope.setroles();

    }
]);