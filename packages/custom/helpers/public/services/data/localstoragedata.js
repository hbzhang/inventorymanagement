/**
 * Created by hbzhang on 3/1/17.
 */
'use strict';

angular.module('mean.helpers').factory('LocalStorageData',['$resource','$rootScope',
    'ItemData','$timeout','$window',
    function($resource,$rootScope,ItemData,$timeout,$window) {

        var setpayData = function(key, val) {
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        };
        var getpayData = function(key) {
            return $window.localStorage && $window.localStorage.getItem(key);
        };

        var seturlData = function(key, val) {
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        };
        var geturlData = function(key) {
            return $window.localStorage && $window.localStorage.getItem(key);
        };


        return {
            setpayData: setpayData,
            getpayData:getpayData,
            seturlData: seturlData,
            geturlData:geturlData
        };
    }]);


