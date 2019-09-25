/**
 * Created by hbzhang on 11/4/16.
 */
angular.module('mean.helpers').factory('PageMenuData',['$resource','$rootScope', function($resource,$rootScope) {

    var menu = [
        {
            title: 'Supervisor',
            link: 'public/menu/supervisor',
            roles: ['authenticated','supervisor'],
            menu: 'main'
        },
        {
            title: 'Reviewer',
            link: 'public/menu/reviewer',
            roles: ['authenticated','reviewer'],
            menu: 'main'
        },
        {
            title: 'Employee',
            link: 'public/menu/employee',
            roles: ['authenticated'],
            menu: 'main'
        }
    ];

    return {
        menu:menu
    };

}]);


