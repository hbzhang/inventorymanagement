/**
 * Created by hbzhang on 2/7/17.
 */
'use strict';

angular.module('mean.page').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('reviewerpublicmenu', {
                url: '/public/menu/reviewer',
                views:{
                    '':{
                        templateUrl: 'page/views/layout/pagelayout.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@reviewerpublicmenu':{
                        templateUrl: 'page/views/page/pacetool/reviewer/reviewerleftnavmenu.html'
                    },
                    'righttabs@reviewerpublicmenu':{

                        templateUrl: 'page/views/page/pacetool/reviewer/index.html'
                    }

                },
                authenticate: true

            })
            .state('revieweremployeeforms', {
                url: '/revieweremployeeforms/:programID/:employeeID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@revieweremployeeforms':{
                        templateUrl: 'page/views/page/pacetool/reviewer/layout/leftnavmenu.html'
                    },
                    'righttabs@revieweremployeeforms':{

                        templateUrl: 'page/views/page/pacetool/reviewer/employeeforms.html'
                    }

                },
                authenticate: true

            }).state('reviewerapprove', {
                url: '/reviewer/approve/:contentID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@reviewerapprove':{
                        templateUrl: 'page/views/page/pacetool/reviewer/layout/approveleftnavmenu.html'
                    },
                    'righttabs@reviewerapprove':{

                        templateUrl: 'page/views/page/pacetool/reviewer/reviewerapprove.html'
                    }

                },
                authenticate: true

            }).state('reviewercontent', {
                url: '/reviewer/content/:contentID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@reviewercontent':{
                        templateUrl: 'page/views/page/pacetool/reviewer/layout/leftnavmenu.html'
                    },
                    'righttabs@reviewercontent':{

                        templateUrl: 'page/views/page/pacetool/reviewer/main.html'
                    }

                },
                authenticate: true

            }).state('reviewersubmission', {
                url: '/reviewer/submission/:contentID',
                views:{
                    '':{
                        templateUrl: 'front/views/frame/index/mainmenu.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@reviewersubmission':{
                        templateUrl: 'page/views/page/pacetool/reviewer/layout/leftnavmenu.html'
                    },
                    'righttabs@reviewersubmission':{

                        templateUrl: 'page/views/page/pacetool/reviewer/form/reviewersubmissioncontent.html'
                    }

                },
                authenticate: true

            });

    }
]);
