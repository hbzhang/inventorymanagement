'use strict';

//Setting up route
angular.module('mean.system').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        controller : 'MenuController',
          resolve:{
          },
        templateUrl: 'front/views/index.html' //'system/views/index.html'
      });
  }
]).config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]).run(function ($rootScope, $state, AuthService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate &&!AuthService.isAuthenticated()){
      // User isn’t authenticated
      console.log('going home');
      $state.transitionTo("home");
      event.preventDefault();
    }
  });
});
