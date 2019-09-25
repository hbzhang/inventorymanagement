'use strict';
angular.module('mean.mean-admin').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('users', {
                url: '/admin/users',
                templateUrl: 'mean-admin/views/users.html',
                authenticate: true

            }).state('themes', {
                url: '/admin/themes',
                templateUrl: 'mean-admin/views/themes.html',
                authenticate: true
            }).state('settings', {
                url: '/admin/settings',
                templateUrl: 'mean-admin/views/settings.html',
                authenticate: true
            }).state('modules', {
                url: '/admin/modules',
                templateUrl: 'mean-admin/views/modules.html',
                authenticate: true
            });
    }
]).config(['ngClipProvider',
    function(ngClipProvider) {
        ngClipProvider.setPath('../mean-admin/assets/lib/zeroclipboard/dist/ZeroClipboard.swf');
    }
]);