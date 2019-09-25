'use strict';

angular.module('mean.report').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('report example page', {
      url: '/report/example',
      templateUrl: 'report/views/index.html'
    });
  }
]);
