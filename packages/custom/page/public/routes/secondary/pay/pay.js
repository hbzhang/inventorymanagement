/**
 * Created by hbzhang on 3/1/17.
 */
'use strict';

angular.module('mean.page').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('paypublicmenu', {
                url: '/public/menu/pay',
                views:{
                    '':{
                        templateUrl: 'page/views/layout/pagelayout.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@employeepublicmenu':{
                        templateUrl: 'page/views/page/pay/payleftnavmenu.html'
                    },
                    'righttabs@employeepublicmenu':{

                        templateUrl: 'page/views/page/pay/paycontent.html'
                    }

                }

            });
    }
]);
