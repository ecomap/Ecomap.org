define(['./module'],function(services){
      'use strict';
    /**
     *  - socket
     *  - addNewsToDb
     *  - getNewsFromDb
     *  - deleteOneNewsItem
     *
     */
      services.factory('SocketService', function (socketFactory,$http) {
      var socket = socketFactory();
      socket.forward('broadcast');
      return {
          socket:socket,
          addNewsToDb:function(message){
              return $http.post('/api/postNews', {news: message})
              .then(function onSuccess (data, status, headers, config) {
              },function onError (data, status, headers, config) {
                  throw error;
              });

          },
          getNewsFromDb:function(uploadScope){
              return $http.get('/api/getNews',{})
              .then(function onSuccess(response){
                  uploadScope(response.data);

              },function onError (data,status,headers,config){
                  throw error;
              });

          },

          deleteOneNewsItem:function(newsContent){
              return $http.post('/api/clearOneNews', {content:newsContent})
              .then(function onSuccess (data, status, headers, config) {
              },function onError (data, status, headers, config) {
                  throw error;
              });

          }
      };
  });
	
});
