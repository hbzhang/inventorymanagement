/**
 * Created by hbzhang on 5/9/17.
 */
'use strict';

angular.module('mean.helpers').factory('UserinformationHelper',['$resource','$rootScope',
    function($resource,$rootScope) {

        var userinformation, supervisorname, supervisortitle;

        var getuserinformation = function getuserinformation() {

            return userinformation;
        };

        var setsuserinformation = function setsuserinformation(data){

            userinformation = data;
        };


        var setsupervisorname = function setsupervisorname(data){

            supervisorname = data;
        };

        var getsupervisorname = function getsupervisorname(){

            return supervisorname;
        };


        var setsupervisortitle= function setsupervisortitle(data){

            supervisortitle = data;
        };

        var getsupervisortitle = function getsupervisortitle(){

            return supervisortitle;
        };


        return {
            setsuserinformation: setsuserinformation,
            getuserinformation:getuserinformation,
            setsupervisorname:setsupervisorname,
            getsupervisorname:getsupervisorname,
            setsupervisortitle:setsupervisortitle,
            getsupervisortitle:getsupervisortitle
        };
    }]);


