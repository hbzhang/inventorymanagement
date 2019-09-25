/**
 * Created by hbzhang on 7/5/17.
 */

'use strict';

angular.module('mean.workspace').config(['$stateProvider',
    '$urlRouterProvider', '$locationProvider','$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
        $stateProvider
            .state('userrolemanagement', {
                url: '/workspace/manage/userroles',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@userrolemanagement':{
                        templateUrl: 'workspace/views/layout/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@userrolemanagement':{

                        templateUrl: 'workspace/views/page/usermanagement/userroles.html',
                        controller: 'UserRolesController'
                    }

                },
                authenticate: true

            });


    }
]);


