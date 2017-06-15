/**
 * Created by bogdan on 13.06.17.
 */
define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('adminRoomCtrl', ['$scope', '$rootScope', 'ProblemService', function ($scope, $rootScope, ProblemService) {
        var newProblems, users, tempUsers;
        $rootScope.$broadcast('Update', '_full');
        $scope.filters = {newUserChecked: true};
        $scope.problemsToShow = [];
        $scope.usersToShow = [];
        $scope.lastVisit = "12.05 14:54";
        newProblems = [{photo: 'a0cc21481a1ef66506d2d6c1e917bf49.jpg', Title: 'Problem2', Id: 194, ProblemTypes_Id: 2, Content: "Some description about project"},
            {photo: 'a0cc21481a1ef66506d2d6c1e917bf49.jpg', Title: 'Problem1', Id: 194, ProblemTypes_Id: 1, Content: "Some description about project Some description"},
            {photo: 'a0cc21481a1ef66506d2d6c1e917bf49.jpg', Title: 'Problem2', Id: 194, ProblemTypes_Id: 2, Content: "Some description about project"},
            {photo: 'a0cc21481a1ef66506d2d6c1e917bf49.jpg', Title: 'Problem3', Id: 194, ProblemTypes_Id: 3, Content: "Some description about project"},
            {photo: 'a0cc21481a1ef66506d2d6c1e917bf49.jpg', Title: 'Problem3', Id: 194, ProblemTypes_Id: 3, Content: "Some description about project"},
            {photo: 'a0cc21481a1ef66506d2d6c1e917bf49.jpg', Title: 'Problem6', Id: 194, ProblemTypes_Id: 6, Content: "Some description about project"}];
        users = [{name: 'User1', surname: "Surname", email: "user@email.com", UserRoles_Id: 2, new_user: true},
            {name: 'User1', surname: "Surname", email: "user@email.com", UserRoles_Id: 2, new_user: false},
            {name: 'User1', surname: "Surname", email: "user@email.com", UserRoles_Id: 2, new_user: false}];
        tempUsers = [];
        $scope.problemTypes = [
            {name: 'Проблеми лісів', id: 1, selected: true},
            {name: 'Сміттєзвалища', id: 2, selected: true},
            {name: 'Незаконна забудова', id: 3, selected: true},
            {name: 'Проблеми водойм', id: 4, selected: true},
            {name: 'Загрози біорізноманіттю', id: 5, selected: true},
            {name: 'Браконьєрство', id: 6, selected: true},
            {name: 'Інші проблеми', id: 7, selected: true}
        ];
        $scope.userRoles = [{name: "Адміністратор", id: 1, selected: true},
            {name: "Користувач", id: 2, selected: true},
            {name: "Модератор", id: 3, selected: true}];
        $scope.newUserChecked = true;
        $scope.updateProblemsList = function () {
            console.log("updateProblemsList");
            $scope.problemsToShow.length = 0;
            $scope.problemTypes.forEach(function (type) {
                if (type.selected) {
                    newProblems.forEach(function (problem) {
                        if (problem.ProblemTypes_Id === type.id) $scope.problemsToShow.push(problem);
                    });
                }
            });
            console.log("length: " + $scope.problemsToShow.length);
        };
        // $scope.getNewProblems = function () {
        //     ProblemService.getNewProblemsFromDb()
        //         .then(function onSuccess (response) {
        //             newProblems = response.data;
        //             $scope.updateProblemsList();
        //         },function onError(error) {
        //             throw error;
        //         });
        // };
        // $scope.getNewProblems();

        $scope.updateProblemsList();

        $scope.showNewUsers = function () {
            $scope.usersToShow.length = 0;

            console.log($scope.filters.newUserChecked);
            if ($scope.filters.newUserChecked) {
                tempUsers.forEach(function (user) {
                    if (user.new_user) $scope.usersToShow.push(user);
                });
            } else {
                $scope.usersToShow = tempUsers.slice();
            }
        };

        $scope.updateUsersList = function () {
            console.log("updateUsersList");
            $scope.usersToShow.length = 0;
            $scope.userRoles.forEach(function (type) {
                if (type.selected) {
                    users.forEach(function (user) {
                        if (user.UserRoles_Id === type.id) $scope.usersToShow.push(user);
                    });
                }
            });
            tempUsers = $scope.usersToShow.slice();
            $scope.showNewUsers();
        };

        $scope.updateUsersList();

        $scope.getUserRole = function (id) {
            return $scope.userRoles.filter(function (role) {
                return role.id === id
            })[0].name;
        };

    }]);
});