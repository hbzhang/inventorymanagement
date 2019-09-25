/**
 * Created by hbzhang on 3/17/15.
 */
angular.module('mean.front').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('memorialtournament', {
                url: '/memorialtournament',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@memorialtournament':{
                        templateUrl: 'front/views/pages/bootcards/pay/leftpanel.html'
                    },
                    'righttabs@memorialtournament':{

                        templateUrl: 'front/views/pages/bootcards/pay/rightpanel.html'
                    }

                }

            });
    }
]);
