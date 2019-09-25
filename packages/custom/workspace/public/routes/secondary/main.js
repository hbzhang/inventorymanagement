/**
 * Created by hbzhang on 15/5/2.
 */
'use strict';

angular.module('mean.workspace').config(['$stateProvider',
    '$urlRouterProvider', '$locationProvider','$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
        $stateProvider
            .state('workspace', {
                url: '/workspace',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@workspace':{
                        templateUrl: 'workspace/views/layout/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@workspace':{

                        templateUrl: 'workspace/views/main/index.html',
                        controller: 'SlidePanelContentController'
                    }

                },
                authenticate: true


            })
            .state('auxiliaryworkspace', {
                url: '/auxiliaryworkspace',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@auxiliaryworkspace':{
                        templateUrl: 'workspace/views/layout/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@auxiliaryworkspace':{

                        templateUrl: 'workspace/views/auxiliary/index.html',
                        controller: 'SlidePanelContentController'
                    }

                },
                authenticate: true

            });

    }
]);



