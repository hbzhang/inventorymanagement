/**
 * Created by hbzhang on 3/29/16.
 */
angular.module('mean.front').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('detail', {
                url: '/detail',
                templateUrl: 'front/views/pages/bootcards/DSAPortal/templates/detailview.html'
            }).state('choose_feed', {
                url: '/choose_feed',
                templateUrl: 'choose_feed.html'
            });
    }
]);
