/**
 * Created by hbzhang on 5/2/17.
 */
'use strict';

angular.module('mean.page').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
        $stateProvider
            .state('managepublicmenu', {
                url: '/public/menu/Manage',
                views:{
                    '':{
                        templateUrl: 'page/views/layout/pagelayout.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@managepublicmenu':{
                        templateUrl: 'page/views/page/manage/layout/manageleftnavmenu.html'
                    },
                    'righttabs@managepublicmenu':{

                        templateUrl: 'page/views/page/manage/managehome.html'
                    }

                }

            }).state('managecontent', {
                url: '/manage/content/:contentID',
                views:{
                    '':{
                        templateUrl: 'page/views/layout/pagelayout.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@managecontent':{
                        templateUrl: 'page/views/page/manage/layout/manageleftnavmenu.html'
                    },
                    'righttabs@managecontent':{

                        templateUrl: 'page/views/page/manage/manageitemcontent.html'
                    }

                }

            }).state('managesubmittedforms', {
                url: '/manage/submission/:contentID',
                views:{
                    '':{
                        templateUrl: 'page/views/layout/pagelayout.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@managesubmittedforms':{
                        templateUrl: 'page/views/page/manage/layout/manageleftnavmenu.html'
                    },
                    'righttabs@managesubmittedforms':{

                        templateUrl: 'page/views/page/manage/managesubmissioncontent.html'
                    }

                }

            }).state('managecreateitem', {
                url: '/manage/create/:contentID',
                views:{
                    '':{
                        templateUrl: 'page/views/layout/pagelayout.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@managecreateitem':{
                        templateUrl: 'page/views/page/manage/layout/manageleftnavmenu.html'
                    },
                    'righttabs@managecreateitem':{

                        templateUrl: 'page/views/page/manage/managecreateitem.html'
                    }

                }

            }).state('editmanageitem', {
                url: '/manage/edit/:itemID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/management.html'
                        //controller: 'SlidePanelContentController'
                    },
                    'lefttree@editmanageitem':{
                        templateUrl: 'page/views/page/manage/layout/manageleftnavmenu.html',
                    },
                    'righttabs@editmanageitem':{

                        templateUrl: 'page/views/page/manage/manageedititem.html'
                    }

                }

            });

    }
]);