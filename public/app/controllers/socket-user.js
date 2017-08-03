define(['./module'], function (controllers) {
    'use strict';
    ////////////

    controllers.controller('SocketUserCtrl', function ($log, $scope, SocketService, $rootScope, $interval, $http) {

        $scope.messageLogHide = "_hide";
        $scope.trigger = true;
        $scope.showNewsContainer = true;
        $scope.allNews = "";
        $scope.nickName = $scope.name;
        var i = 0;
        var repeat = function () {
            if ($scope.message.logs === undefined) return false;
            for (var j = 0; j < $scope.message.logs.length; j++) {
                if ($scope.message.logs[j]) {
                    $scope.message.logs[j].show = "none";
                }
            }

            if ($scope.message.logs[i]) {
                $scope.message.logs[i].show = "block";

                i++;
                if (i >= $scope.message.logs.length) {
                    i = 0;
                }
            }
        };
        $scope.message = {
            logs: [],
            chat: []
        };
        // $scope.messageLogs = [];
        // $scope.messageChat =[];
        SocketService.getNewsFromDb(updateScopeAfterGettingNews);
        function updateScopeAfterGettingNews(data) {
            $scope.message.logs = data.news;
            if ($scope.message.logs === undefined) return false;
            for (var i = 0; i < $scope.message.logs.length; i++) {
                $scope.message.logs[i].show = "none";
                $scope.allNews += $scope.message.logs[i].Content + ". ";
            }
            if ($scope.message.logs[0] !== undefined) {
                $scope.showNewsContainer = true;
            }
        }

        $scope.interval = $interval(repeat, 5000);
        $scope.$on('socket:broadcast', function (event, data) {
            $scope.showNewsContainer = true;

            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function () {
                var news = {};
                if (!isNaN(data.payload)) {
                    $scope.message.logs.splice(data.payload - 1, 1);
                    $scope.allNews = "";
                    for (var i = 0; i < $scope.message.logs.length; i++) {

                        $scope.allNews += $scope.message.logs[i].Content + ". ";
                    }
                    if ($scope.allNews === "") {
                        $scope.showNewsContainer = false;
                    }

                } else {

                    if (data.payload.trigger !== true) {
                        $scope.trigger = true;
                        news.show = "none";
                        news.Content = data.payload;
                        $scope.allNews += data.payload + ". ";
                        $scope.message.logs.push(news);
                        var i = 0;
                        var repeat = function () {
                            for (var j = 0; j < $scope.message.logs.length; j++) {
                                if ($scope.message.logs[j]) {
                                    $scope.message.logs[j].show = "none";
                                }
                            }
                            if ($scope.message.logs[i]) {
                                $scope.message.logs[i].show = "block";

                                i++;
                                if (i >= $scope.message.logs.length) {
                                    i = 0;
                                }
                            }

                        }
                        $interval.cancel($scope.interval);
                        $scope.interval = $interval(repeat, 5000);

                    } else if ($scope.message.logs.length < 1) {
                        $scope.message.chat.length = 0;
                        var timeOfComment = data.payload.date.substring(0, 10) + " " + data.payload.date.substring(11, 19);
                        $scope.message.chat.push({
                            problemID: data.payload.id,
                            userName: data.payload.user,
                            Content: data.payload.Content,
                            date: timeOfComment
                        });
                        $scope.trigger = false;
                        $scope.interval = $interval(repeat, 5000);


                    }
                }


            });
        });
    });


});
