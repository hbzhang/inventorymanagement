/**
 * Created by hbzhang on 3/29/16.
 */
angular.module('mean.front')
    .directive('listDone', function() {
        return function(scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.listDone);
            }
        }
    })

    .directive('onEnter', function() {
        return function(scope, element, attrs) {
            element.on('keydown', function(event) {
                if (event.which === 13) {
                    scope.$apply(attrs.onEnter);
                }
            })
        }
    })

    .service('rssFeed', function($q, $rootScope) {
        this.get = function(url) {
            var d = $q.defer();
            var feed = new google.feeds.Feed(url);
            feed.setNumEntries(10);
            feed.load(function(result) {
                $rootScope.$apply(d.resolve(result));
            });
            return d.promise;
        }
    })

    .filter('strip_http', function() {
        return function(str) {
            var http = "http://";
            return (str.indexOf(http) == 0) ? str.substr(http.length) : str;
        }
    });