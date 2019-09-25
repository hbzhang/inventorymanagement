/**
 * Created by hbzhang on 5/7/15.
 */

'use strict';

angular.module('mean.helpers').factory('PrivilegeData',['$resource','$rootScope', function($resource,$rootScope) {

 var treedata_example = [
        {
            label: 'North America',
            children: [
                {
                    label: 'Canada',
                    data: {
                        definition: "",
                        data_can_contain_anything: true
                    },
                    onSelect: item_selected,
                     children: ['Toronto', 'Vancouver']
                }, {
                    label: 'USA',
                    data:'leftadminmenu',
                    onSelect: function (branch) {  return $scope.output = branch.data.definition},
                    children: ['New York', 'Los Angeles']
                }, {
                    label: 'Mexico',
                    children: ['Mexico City', 'Guadalajara']
                }
            ]
        }
 ];

  var treedata = [
        {
            label: 'Right Admin Menu',
            data: [],
            package:'PACKAGE-COLLECTION',
             children: [
                {
                    label: 'Workspace',
                    data: [],
                    package:'workspace',
                    children: [
                        {
                            label: 'Items',
                            data: [],
                            package:'workspace'
                        },
                        {
                            label: 'Auxiliary',
                            data: [],
                            package:'workspace'
                        }
                    ]
                },
                {
                    label: 'Builder',
                    data: [],
                    package:'product',
                    children: [
                        {
                            label: 'Items',
                            data: [],
                            package:'product'
                         },
                        {
                            label: 'Auxiliary',
                            data: [],
                            package:'product'
                        }
                    ]
                },
                {
                    label: 'Admin',
                    data: [],
                    package:'admin',
                    children: [
                        {
                            label: 'Factory',
                            data: [],
                            package:'admin',
                            children: [
                                {
                                    label: 'Program',
                                    data: [],
                                    package:'admin'
                                },
                                {
                                    label: 'Form',
                                    data: [],
                                    package:'admin'
                                },
                                {
                                    label: 'Widget',
                                    data: [],
                                    package:'admin'
                                },
                                {
                                    label: 'Agreement',
                                    data: [],
                                    package:'admin'
                                }
                            ]
                        },
                        {
                            label: 'User',
                            data: [],
                            package:'admin'
                        },
                        {
                            label: 'Privilege',
                            data: [],
                            package:'admin'
                        }
                    ]

                }]
        },
        {
          label: 'Account',
          data: [],
          package:'PACKAGE-COLLECTION',
          children: [
              {
                  label: 'Orders',
                  data: [],
                  package:'account'
              },
              {
                  label: 'Shopping Cart',
                  data: [],
                  package:'account'
              }
          ]
      },

    ];

    var hie_tree_data =
    [
        {
            label: 'DSA Vice President',
            data: [],
            children: [
                {
                    label: 'DSA Heath Director',
                    data: [],
                    children: [
                        {
                            label: 'Recreational Sports',
                            data: [],
                            children: [
                                {
                                    label: 'RecSports Director',
                                    data: [],
                                    children: [
                                        {

                                            label: 'RecSports Facilities Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'RecSports Facilities Coordinator',
                                                    data: []
                                                },
                                                {
                                                    label: 'RecSports McComas Hall Manager',
                                                    data: []
                                                },
                                                {
                                                    label: 'RecSports War Hall Manager',
                                                    data: []
                                                }
                                            ]
                                        },
                                        {

                                            label: 'RecSports Fitness Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'RecSports Fitness Coordinator',
                                                    data: []
                                                }
                                            ]
                                        },
                                        {

                                            label: 'RecSports Aquatics Assistant Director',
                                            data: []
                                        },
                                        {

                                            label: 'RecSports Intramural Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'RecSports Intramural Coordinator',
                                                    data: []
                                                }
                                            ]
                                        },
                                        {

                                            label: 'RecSports Sport Club Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'RecSports Sport Club Coordinator',
                                                    data: []
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            label: 'Cook Counseling',
                            data: [],
                            children: [
                                {
                                    label: 'Cook Counseling Director',
                                    data: [],
                                    children: [
                                        {

                                            label: 'Cook Counseling Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'Cook Counseling Coordinator',
                                                    data: []
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }


                    ]

                },
                {
                    label: 'DSA Professional Director',
                    data: [],
                    children: [
                        {
                            label: 'Career Services',
                            data: [],
                            children: [
                                {
                                    label: 'Career Services Director',
                                    data: [],
                                    children: [
                                        {

                                            label: 'Career Services Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'Career Services Coordinator',
                                                    data: []
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                },
                {
                    label: 'DSA IT and Communication Director',
                    data: [],
                    children: [
                        {
                            label: 'IT',
                            data: [],
                            children: [
                                {
                                    label: 'IT Director',
                                    data: [],
                                    children: [
                                        {

                                            label: 'IT Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'System Admins',
                                                    data: []
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        },
                        {
                            label: 'Communication',
                            data: [],
                            children: [
                                {
                                    label: 'Communication Director',
                                    data: [],
                                    children: [
                                        {

                                            label: 'Communication Assistant Director',
                                            data: [],
                                            children: [
                                                {
                                                    label: 'Communication Coordinator',
                                                    data: []
                                                }
                                            ]
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                }


            ]
        }
];



    return {
        treedata: treedata,
        hie_tree_data: hie_tree_data
    };

}]);






