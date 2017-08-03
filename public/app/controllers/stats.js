define(['./module'],function(controllers){
    'use strict';
    controllers.controller('statsCtrl',['$scope','$rootScope','$http','StatisticService', function($scope, $rootScope, $http,StatisticService){
       $rootScope.$broadcast('Update', '_full');
       StatisticService.getStatistic4()
           .then(function onSuccess(response) {
               console.log(response);
               $scope.mostPopular = response.data[0];
               $scope.mostImportant = response.data[1];
               $scope.mostComment = response.data[2];

       },function onError (data, status, headers, config) {
               throw error;
           });

       StatisticService.getStatistic3()
           .then(function onSuccess(response) {
               $scope.votes = response.data[0][0].votes;
               $scope.problems = response.data[0][0].problems;
               $scope.comments = response.data[2][0].comments;
               $scope.photos = response.data[1][0].photos;
       },function onError (data, status, headers, config) {
               throw error;
           });

       Date.prototype.addHours= function(h) {
       var copiedDate = new Date(this.getTime());
       copiedDate.setHours(copiedDate.getHours()+h);
       return copiedDate;
}

  $scope.chart = StatisticService.getChart;

  $scope.pie = function(val){
    for (var styles in $scope.style) {
      if ($scope.style[styles] === 'currentPeriod') $scope.style[styles] = undefined;
        }
        $scope.style[val] = 'currentPeriod';
      StatisticService.getPie(val);

  };
    }]);
});