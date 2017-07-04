/**
 * Created by bogdan on 13.06.17.
 */
define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('adminRoomCtrl', ['$scope', '$rootScope', 'ProblemService', 'AdminService', function ($scope, $rootScope, ProblemService, AdminService) {
        var newProblems, users, tempUsers;
        $rootScope.$broadcast('Update', '_full');
        $scope.filters = {newUserChecked: true};
        $scope.problemsToShow = [];
        $scope.usersToShow = [];
        // users = [{name: 'Name1', surname: "Surname1", email: "user1@email.com", UserRoles_Id: 2, new_user: true},
        //     {name: 'Name2', surname: "Surname2", email: "user2@email.com", UserRoles_Id: 2, new_user: false},
        //     {name: 'Name3', surname: "Surname3", email: "user3@email.com", UserRoles_Id: 1, new_user: false},
        //     {name: 'Name4', surname: "Surname4", email: "user4@email.com", UserRoles_Id: 3, new_user: false}];
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
        };
        $scope.getNewProblems = function () {
            ProblemService.getNewProblemsFromDb()
                .then(function onSuccess (response) {
                    newProblems = response.data;
                    $scope.updateProblemsList();
                },function onError(error) {
                    throw error;
                });
        };
        $scope.getNewProblems();



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

        $scope.getUsers = function () {
            AdminService.getUsers()
                .then(function onSuccess (response) {
                    users = response.data;
                    console.log(users);
                    $scope.updateUsersList();
                },function onError(error) {
                    throw error;
                });
        };
        $scope.getUsers();

        $scope.getUserRole = function (id) {
            return $scope.userRoles.filter(function (role) {
                return role.id === id
            })[0].name;
        };

    }]);
});