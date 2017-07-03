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
        // newProblems = [{photo: 'a0cc21481a1ef66506d2d6c1e917bf49.jpg', Title: 'Problem5', Id: 194, ProblemTypes_Id: 7, Content: "Some description about project"},
        //     {photo: '04a5cfa5082ee096f96094568be1c30a.jpg', Title: 'Долина нарцисів', Id: 47, ProblemTypes_Id: 5, Content: "Вчені відзначають значні зміни рослинного покрову впродовж останніх 25 років, зокрема, зменшення площ справжніх лук[8]. Колись гостролистий нарцис вкривав сотні гектарів землі, тепер щороку площа його зростання меншає. Наукові дослідження, спрямовані на покращення охорони цінних екосистем, стали можливими завдяки проекту Світового банку «Збереження біорізноманіття Карпат» "},
        //     {photo: 'efcd78165b8f300b1e771e13f05a2a82.jpg', Title: 'Незаконне полювання в околицях с. Липовиця', Id: 82, ProblemTypes_Id: 6, Content: "Місцеві жителі не приховують, що в їхньому селі значна частина місцевих жителів відкрито промишляє браконьєрством. Кримінальні \"мисливці\" настільки нахабні, що розстрілюють охоронні знаки заповідних об\'єктів. Особливо їх багато в малолюдних гірських районах Ґорґан."},
        //     {photo: '8a90be72626227d8716f6b679c30b217.jpg', Title: '"Сирітська хатка" на березі Південного Бугу', Id: 69, ProblemTypes_Id: 3, Content: "Побудований маєток на березі річки взагалі без врахування прибережної зони"},
        //     {photo: '6ce0a7d84b7e992ecae648d87974a70b.jpg', Title: 'Знакає річка', Id: 14, ProblemTypes_Id: 4, Content: "Річка Мала Тернівка - колись гарна й мальовнича ріка. Нині вона під загрозою висихання та замулення. 15 років тому вона була повноводною і стрімкою. Зараз вона майже зникла, подекуди  її русла узагалі невидно. Проблема почалася у радянські часи, коли непродумане випасання овець знищило грунтовий покрив у деяких місцях і оголило глину, яку з дощами змиває у русло, деякі круті береги також знищені, на мілині що утворилась розрісся надмірний очерет. Тепер ситуацію погіршує глобальне потепління."},
        //     {photo: '4b9661d434523edc0403961b7da327e5.jpg', Title: 'Сміття', Id: 199, ProblemTypes_Id: 2, Content: "Some description"}];
        users = [{name: 'Name1', surname: "Surname1", email: "user1@email.com", UserRoles_Id: 2, new_user: true},
            {name: 'Name2', surname: "Surname2", email: "user2@email.com", UserRoles_Id: 2, new_user: false},
            {name: 'Name3', surname: "Surname3", email: "user3@email.com", UserRoles_Id: 1, new_user: false},
            {name: 'Name4', surname: "Surname4", email: "user4@email.com", UserRoles_Id: 3, new_user: false}];
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
        $scope.getNewProblems = function () {
            ProblemService.getNewProblemsFromDb()
                .then(function onSuccess (response) {
                    console.log(response);
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

        $scope.updateUsersList();

        $scope.getUserRole = function (id) {
            return $scope.userRoles.filter(function (role) {
                return role.id === id
            })[0].name;
        };

    }]);
});