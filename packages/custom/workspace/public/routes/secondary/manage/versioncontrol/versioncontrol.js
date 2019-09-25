/**
 * Created by hbzhang on 6/19/17.
 */
'use strict';

angular.module('mean.workspace').config(['$stateProvider',
    '$urlRouterProvider', '$locationProvider','$provide',
    function($stateProvider, $urlRouterProvider, $locationProvider,$provide) {
        $stateProvider
            .state('simpleversioncontrol', {
                url: '/workspace/manage/simpleversioncontrol',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@simpleversioncontrol':{
                        templateUrl: 'workspace/views/layout/simplenav.html'
                    },
                    'righttabs@simpleversioncontrol':{

                        templateUrl: 'workspace/views/page/submissionhistory/simpleversioncontrol.html',
                        controller: 'AllUsersinSystemController'
                    }

                },
                authenticate: true

            })
            .state('simpleversioncontrolsubmissions', {
                url: '/workspace/manage/simpleversioncontrol/submissions/:userID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@simpleversioncontrolsubmissions':{
                        templateUrl: 'workspace/views/layout/simplenav.html'
                    },
                    'righttabs@simpleversioncontrolsubmissions':{

                        templateUrl: 'workspace/views/page/submissionhistory/simplesubmissions.html',
                        controller: 'SubmissionController'
                    }

                },
                authenticate: true

            }).state('simpleversioncontrolsubmissioncontent', {
                url: '/workspace/manage/simpleversioncontrol/form/:formName/:formID/:userID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@simpleversioncontrolsubmissioncontent':{
                        templateUrl: 'workspace/views/layout/simplenav.html'
                    },
                    'righttabs@simpleversioncontrolsubmissioncontent':{

                        templateUrl: 'workspace/views/page/submissionhistory/simplesubmissioncontent.html',
                        controller: 'SubmissionContentController'
                    }

                },
                authenticate: true

            })
            .state('versioncontrol', {
                url: '/workspace/manage/versioncontrol',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@versioncontrol':{
                        templateUrl: 'workspace/views/layout/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@versioncontrol':{

                        templateUrl: 'workspace/views/page/submissionhistory/versioncontrol.html',
                        controller: 'AllUsersinSystemController'
                    }

                },
                authenticate: true

            }).state('versioncontrolsubmissions', {
                url: '/workspace/manage/versioncontrol/submissions/:userID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@versioncontrolsubmissions':{
                        templateUrl: 'workspace/views/layout/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@versioncontrolsubmissions':{

                        templateUrl: 'workspace/views/page/submissionhistory/submissions.html',
                        controller: 'SubmissionController'
                    }

                },
                authenticate: true

            }).state('versioncontrolsubmissioncontent', {
                url: '/workspace/manage/versioncontrol/form/:formName/:formID/:userID',
                views:{
                    '':{
                        templateUrl: 'product/views/slidepanels/product.html',
                        controller: 'SlidePanelContentController'
                    },
                    'lefttree@versioncontrolsubmissioncontent':{
                        templateUrl: 'workspace/views/layout/product-tree.html',
                        controller: 'WorkspaceSlidePanelContentController'
                    },
                    'righttabs@versioncontrolsubmissioncontent':{

                        templateUrl: 'workspace/views/page/submissionhistory/submissioncontent.html',
                        controller: 'SubmissionContentController'
                    }

                },
                authenticate: true

            });


    }
]);



