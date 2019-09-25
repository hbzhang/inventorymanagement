'use strict';

angular.module('mean.page').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider,$provide)  {
    $stateProvider
        .state('supervisorpublicmenu', {
          url: '/public/menu/supervisor',
          views:{
            '':{
              templateUrl: 'page/views/layout/pagelayout.html'
              //controller: 'SlidePanelContentController'
            },
            'lefttree@supervisorpublicmenu':{
              templateUrl: 'page/views/page/pacetool/supervisor/layout/supervisorleftnavmenu.html'
            },
            'righttabs@supervisorpublicmenu':{

              templateUrl: 'page/views/page/pacetool/supervisor/index.html'
            }

          },
          authenticate: true

        })
        .state('supervisedemployeeforms', {
          url: '/supervisedemployeeforms/Employee/:employeeID',
          views:{
            '':{
              templateUrl: 'front/views/frame/index/mainmenu.html'
              //controller: 'SlidePanelContentController'
            },
            'lefttree@supervisedemployeeforms':{
              templateUrl: 'page/views/page/pacetool/supervisor/layout/leftnavmenu.html'
            },
            'righttabs@supervisedemployeeforms':{

              templateUrl: 'page/views/page/pacetool/supervisor/employeeforms.html'
            }

          },
          authenticate: true

        }).state('supervisorapprove', {
          url: '/supervisor/approve/:contentID',
          views:{
            '':{
              templateUrl: 'front/views/frame/index/mainmenu.html'
              //controller: 'SlidePanelContentController'
            },
            'lefttree@supervisorapprove':{
              templateUrl: 'page/views/page/pacetool/supervisor/layout/approveleftnavmenu.html'
            },
            'righttabs@supervisorapprove':{

              templateUrl: 'page/views/page/pacetool/supervisor/supervisorapprove.html'
            }

          },
          authenticate: true

        }).state('supervisorcontent', {
          url: '/supervisor/content/:contentID',
          views:{
            '':{
              templateUrl: 'front/views/frame/index/mainmenu.html'
              //controller: 'SlidePanelContentController'
            },
            'lefttree@supervisorcontent':{
              templateUrl: 'page/views/page/pacetool/supervisor/layout/leftcontentnavmenu.html'
            },
            'righttabs@supervisorcontent':{

              templateUrl: 'page/views/page/pacetool/supervisor/main.html'
            }

          },
          authenticate: true

        }).state('supervisoremployeesubmission', {
          url: '/supervisoremployee/submission/:contentID',
          views:{
            '':{
              templateUrl: 'front/views/frame/index/mainmenu.html'
              //controller: 'SlidePanelContentController'
            },
            'lefttree@supervisoremployeesubmission':{
              templateUrl: 'page/views/page/pacetool/supervisor/layout/leftcontentnavmenu.html'
            },
            'righttabs@supervisoremployeesubmission':{

              templateUrl: 'page/views/page/pacetool/supervisor/form/supervisoremployeesubmissioncontent.html'
            }

          },
          authenticate: true

        }).state('supervisorsubmission', {
          url: '/supervisor/submission/:contentID',
          views:{
            '':{
              templateUrl: 'front/views/frame/index/mainmenu.html'
              //controller: 'SlidePanelContentController'
            },
            'lefttree@supervisorsubmission':{
              templateUrl: 'page/views/page/pacetool/supervisor/layout/leftsubmissionmenu.html'
            },
            'righttabs@supervisorsubmission':{

              templateUrl: 'page/views/page/pacetool/supervisor/form/supervisorsubmissioncontent.html'
            }

          },
          authenticate: true

        });

  }
]);
