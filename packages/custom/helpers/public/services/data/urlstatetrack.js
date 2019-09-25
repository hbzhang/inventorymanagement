/**
 * Created by hbzhang on 3/20/17.
 */
'use strict';

angular.module('mean.helpers').factory('URLStateTrack',['$resource','$rootScope',
    'ItemData','$timeout',
    function($resource,$rootScope,ItemData,$timeout) {

        var urlvalue;

        var seturlstate = function seturlstate(url){

            urlvalue = url;
        };

        var geturlstate = function geturlstate(){

            return urlvalue;
        };

        return {
            seturlstate: seturlstate,
            geturlstate:geturlstate
        };
    }]);


