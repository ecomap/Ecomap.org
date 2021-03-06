/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/problem/showProblem/:problemID', {
                templateUrl: 'app/templates/showProblem.html',
                controller: 'showProblemCtrl'
            })
            .when('/problem/addProblem', {
                templateUrl: 'app/templates/addProblem.html',
                controller: 'addProblemCtrl'
            })
            .when('/resources/:name', {
                templateUrl: 'app/templates/resources.html',
                controller: 'resourcesCtrl'
            })
            .when('/addResource', {
                templateUrl: 'app/templates/editorPage.html',
                controller: 'editorCtrl'
            })
            .when('/editResource/:Alias', {
                templateUrl: 'app/templates/editorPage.html',
                controller: 'editorCtrl'
            })
            .when('/chat', {
                templateUrl: 'app/templates/chat.html',
                controller: 'SocketCtrl'
            })
            .when('/statistic', {
                templateUrl: 'app/templates/statistic.html',
                controller: 'statsCtrl'
            })
            .when('/adminRoom', {
                templateUrl: 'app/templates/adminRoom.html',
                controller: 'adminRoomCtrl'
            })
            .otherwise({
                redirectTo: '/map'
            });
    }])
        .config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }])
        .config(['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');//.slashPrefix('');
        }]);
    ;
});
