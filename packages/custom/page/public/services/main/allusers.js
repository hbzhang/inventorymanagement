/**
 * Created by hbzhang on 11/17/16.
 */
angular.module('mean.page').factory("AllUsers", ['$resource',
    function($resource) {
        return $resource('/supervisor/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
