/**
 * Created by hbzhang on 6/6/17.
 */
'use strict';

angular.module('mean.system').factory('AuthService',['$resource','$rootScope',
    '$timeout','$http','$state','Global',
    function($resource,$rootScope,$timeout,$http,$state,Global) {

        var isAuthenticated = function isAuthenticated(event) {

            return Global.authenticated;

        };


        return {
            isAuthenticated: isAuthenticated
        };
    }]);


