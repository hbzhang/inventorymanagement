'use strict';

angular.module('mean.theme')
	.controller('ThemeController', ['$scope', 'Global',
		'$location', '$rootScope','$window','$http',
	  function($scope, Global, $location,
			   $rootScope,$window,$http) {
	 		$rootScope.$on('$stateChangeStart',
      	function(event, toState, toParams, fromState, fromParams){
					var toPath = toState.url.replace('/','');
        	$scope.state = toPath;
        	if($scope.state === '' ) {
          	$scope.state = 'firstPage';
        	}
    		});
      // Original scaffolded code.
      $scope.global = Global;
      $scope.package = {
        name: 'theme'
      };

	  //console.log($window.user);
      if(typeof $window.user.username !=='undefined' && typeof $scope.global.user.username ==='undefined') {
		  if( $window.user.username.length>0){
			  $rootScope.$emit('loggedin');

		  }
	  }

	 $scope.frontpageauthenticated  = $scope.global.authenticated;
	 $rootScope.$on('loggedin', function() {
	 $scope.frontpageauthenticated  = true;
	 console.log($scope.frontpageauthenticated);
	 });
    }
  ]);
