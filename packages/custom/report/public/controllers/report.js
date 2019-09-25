'use strict';

angular.module('mean.report').controller('ReportController', ['$scope', 'Global', 'Report',
  function($scope, Global, Report) {
    $scope.global = Global;
    $scope.package = {
      name: 'report'
    };
  }
]);
