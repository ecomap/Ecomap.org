define(['./module'],function(controllers){
	'use strict';
	controllers.controller('datePicker',['$scope','$rootScope','todayTime','$locale', function ($scope,$rootScope, todayTime, $locale){

		$scope.todayTime = todayTime;

		$scope.clear = function () {
			$scope.dt = null;
		};

		$scope.toggleMin = function() {
			$scope.minDate = new Date(2014,2,18);
		};
		$scope.toggleMin();

		$scope.toggleDt = function($event, which) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.datepickers[which]= !$scope.datepickers[which];
			which === "dt"? $scope.datepickers['dtSecond'] = false :
                $scope.datepickers['dt'] = false;
		};

		$scope.formDataToday = new Date();

		$scope.dateOptions = {
            formatMonth: 'MMM',
            formatYear: 'yy',
            showWeeks: false,
			startingDay: 1
		};

		$scope.datepickers = {
	        dt: false,
	        dtSecond: false
	    };

		$scope.text = {
            close: 'Закрити',
            clear: 'Очистити',
            today: 'Сьогодні'
        };

		$scope.format = 'dd MMM yyyy';
	}]);
});