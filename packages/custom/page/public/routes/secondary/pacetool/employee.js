/**
 * Created by hbzhang on 2/7/17.
 */
'use strict';

angular.module('mean.page').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('employeepublicmenu', {
                url: '/public/menu/Employee',
                views:{
                    '':{
                        templateUrl: 'page/views/layout/pagelayout.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@employeepublicmenu':{
                        templateUrl: 'page/views/page/pacetool/employee/employeeleftnavmenu.html'
                    },
                    'righttabs@employeepublicmenu':{

                        templateUrl: 'page/views/page/pacetool/employee/employeecontent.html'
                    }

                },
                authenticate: true

            })
            .state('employeeforms', {
                url: '/employeeforms/:programID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@employeeforms':{
                        templateUrl: 'page/views/page/pacetool/employee/employeeleftnavmenu.html'
                    },
                    'righttabs@employeeforms':{

                        templateUrl: 'page/views/page/pacetool/employee/employeeforms.html'
                    }

                },
                authenticate: true

            }).state('employeeapproved', {
                url: '/employee/approved/:userID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@employeeapproved':{
                        templateUrl: 'page/views/page/pacetool/employee/layout/employeeapprovedleftnavmenu.html'
                    },
                    'righttabs@employeeapproved':{

                        templateUrl: 'page/views/page/pacetool/employee/employeeapproved.html'
                    }

                },
                authenticate: true

            }).state('employeecontent', {
                url: '/employee/content/:contentID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@employeecontent':{
                        templateUrl: 'page/views/page/pacetool/employee/layout/employeeletnavmenu.html'
                    },
                    'righttabs@employeecontent':{

                        templateUrl: 'page/views/page/pacetool/employee/employeeformcontent.html'
                    }

                },
                authenticate: true

            }).state('employeesubmittedforms', {
                url: '/employee/submission/:contentID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@employeesubmittedforms':{
                        templateUrl: 'page/views/page/pacetool/employee/layout/employeesubmissionleftnavmenu.html'
                    },
                    'righttabs@employeesubmittedforms':{

                        templateUrl: 'page/views/page/pacetool/employee/employeesubmissioncontent.html'
                    }

                },
                authenticate: true

            });

    }
]);
