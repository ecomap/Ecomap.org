define(['./module'],function(controllers){
    'use strict';

    controllers.controller('SocketCtrl', function ($log, $scope, SocketService,$rootScope,$interval,$http,ipCookie) {
        $rootScope.$broadcast('Update',"_problem");
        // $rootScope.$emit('showSlider','false');
        $scope.deleteItem="clear";
        // $scope.message="";
        $scope.currentItemNews=-1;
        $scope.messageLogHide="_hide";
        $scope.nickName = $scope.name;
        var i = 0;
        $scope.message = {
            text: "",
            logs : []
        };

        SocketService.getNewsFromDb(updateScopeAfterGettingNews);
        function updateScopeAfterGettingNews(data){
            $scope.message.logs=data.news;
            for(var i=0;i<$scope.message.logs.length;i++){
                $scope.message.logs[i].show="none";
            }
            if($scope.message.logs[0]){$scope.showNewsContainer=false;}

        }

        $scope.sendMessage = function(messageValue) {
            console.log(messageValue);
            console.log($scope.message.text);
            if($scope.message.text === "" && messageValue < 0||
                messageValue === $scope.message.text && !isNaN(messageValue)||
                $scope.message.text === undefined && messageValue < 0) {
                alert("Повідомлення не може состояти лише із ціфр або бути пустим!");
                $scope.placeHolder = "Напишіть тут текст повідомлення...";
            }
            else{
                $log.debug('sending message', messageValue);
                SocketService.socket.emit('message', ipCookie('token'), messageValue);
                if (isNaN(messageValue)) {
                    SocketService.addNewsToDb(messageValue);
                }
                $scope.message.text = "";
            }
        };
        $scope.$on('socket:broadcast', function(event, data) {
            $log.debug('got a message', event.name);
            if (!data.payload) {
                $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
                return;
            }
            $scope.$apply(function() {
                var news={};
                $scope.message.text = "";
                if(!isNaN(data.payload)){
                    SocketService.deleteOneNewsItem($scope.message.logs[data.payload-1].Content)
                        .then(function(){
                        $scope.message.logs.splice(data.payload - 1, 1);
                    });

                }else {
                      if(data.payload.trigger !== true) {
                        news.show = "none";
                        news.Content = data.payload;

                        $scope.message.logs.push(news);

                    }
                }
            });
        });
    });
});