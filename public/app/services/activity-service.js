define(['./module'], function (services) {
    'use strict';
    /**
     *  - addVoteToDbAndToCookie
     *  - addCommentToDB
     *  - deleteCommentFromDB
     *
     *
     *
     *
     */

    services.factory('ActivityService', function ($http, ipCookie) {
        return{
            addVoteToDbAndToCookie: function (problemID,userID,userName,userSurname) {

                return $http.post('/api/vote', {idProblem: problemID, userId: userID, userName: userName,userSurname:userSurname})
                .then(function onSuccess (data, status, headers, config) {
                    ipCookie('vote' + problemID, true);
                },function onError (data, status, headers, config) {
                    throw error;
                });
             },
            addCommentToDB:function(userID,userName,userSurname,problemID,comment,updateScope) {
                if(comment==""|| comment == undefined){
                    alert("Неможливо відправити пусте повідомлення");
                    return;
                }
                var data = {data: {userId: userID, userName: userName,userSurname:userSurname, Content: comment}};
                return $http.post('/api/comment/' + problemID, JSON.stringify(data))
                .then(function onSuccess (data, status, headers, config) {

                         updateScope(data);

                    },function onError (data, status, headers, config) {
                    throw error;
                });
            },
            deleteCommentFromDB:function(id){
                return $http.delete('/api/activity/' + id)
                    .then(function onSuccess (data, status, headers, config) {
                          },function onError (data, status, headers, config) {
                       throw error;
                });
            }

        }


    });

});