/**
 * Created by hbzhang on 2/16/17.
 */
'use strict';

angular.module('mean.helpers').factory('AssociatedFormCommunication',['$resource','$rootScope',
    'ItemData','$timeout',
    function($resource,$rootScope,ItemData,$timeout) {

        var supervisorassociatedforms = [], reviewerassociatedforms = [], embedassociatedforms = [];

        var getsupervisorassociatedforms = function getsupervisorassociatedforms() {

            return supervisorassociatedforms;
        };

        var setsupervisorassociatedforms = function setsupervisorassociatedforms(data){

            supervisorassociatedforms = data;
        };


        var setreviewerassociatedforms = function setreviewerassociatedforms(data){

            reviewerassociatedforms = data;
        };

        var getreviewerassociatedforms = function getreviewerassociatedforms(){

            return reviewerassociatedforms;
        };


        var setembedassociatedforms = function setembedassociatedforms(data){

            embedassociatedforms = data;
        };

        var getembedassociatedforms = function getembedassociatedforms(){

            return embedassociatedforms;
        };


        return {
            setsupervisorassociatedforms: setsupervisorassociatedforms,
            getsupervisorassociatedforms:getsupervisorassociatedforms,
            setreviewerassociatedforms:setreviewerassociatedforms,
            getreviewerassociatedforms:getreviewerassociatedforms,
            setembedassociatedforms:setembedassociatedforms,
            getembedassociatedforms:getembedassociatedforms
        };
    }]);


