define(['./module'], function (controllers) {

   'use strict';
    controllers.controller('resourcesCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope,$http, $routeParams, $rootScope) {
            $http.get('/api/resources/' + $routeParams.name)
                .then(function onSuccess(res) {
                    console.log(res);
                    $scope.resource = res.data[0];
                });
            $rootScope.$broadcast('Update', '_full');
        }])
});


