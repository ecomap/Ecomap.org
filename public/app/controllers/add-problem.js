define(['./module'],function (controllers){
    'use strict';
    controllers.controller('addProblemCtrl', function ($scope,$rootScope,$window,windowWidth){
        $scope.tabs = [
            {heading: "Точка", icon: "fa fa-map-marker", content: "app/templates/addMarker.html"},
            {heading: "Опис", icon: "fa fa-info-circle", content: "app/templates/addInfo.html"},
            {heading: "Фото", icon: "fa fa-file-photo-o", content: "app/templates/addPhotos.html"}
        ];

        $scope.fileSizeLeft = 20;
        $scope.fileCountLeft = 10;

        $scope.getActive = function() {
            if(typeof $scope.tabs.active === "undefined")
                return null;
            return $scope.tabs[$scope.tabs.active].heading;
        };

        $scope.getWindowDimensions = windowWidth.getWindowDimensions;
        var width = $scope.getWindowDimensions();

        $scope.$watch($scope.getWindowDimensions, function (newValue) {
            if (newValue > 1000) {
                $rootScope.style = function () {
                    return { 
                        'height': 'calc (100% - 52px);'
                    };
                };
            } else {
                $rootScope.style = function () {
                    return {
                        'height': 'auto',
                        'padding-bottom' : '0'
                    };
                };
            }
        });

        $scope.$watch($scope.getActive, function (newValue) {
            width = $scope.getWindowDimensions();
            if (width <= 1000) {
                if (newValue === "Точка") {
                    $rootScope.style = function () {
                        return { 
                            'height': 'auto',
                            'padding-bottom' : '0'
                        };
                    };
                } else {
                    $rootScope.style = function () {
                        return { 
                            'height': 'calc (100% - 52px);'
                        };
                    };
                }
            } else {
                $rootScope.style = function () {
                    return { 
                        'height': 'calc (100% - 52px);'
                    };
                };
            }
        });

        $scope.problemData = {
            title: "",
            content: "",
            proposal: "",
            latitude: "",
            longtitude: "",
            type: ""
        };

        $scope.requiredData = function() {
            if ($scope.problemData.title === "" || $scope.problemData.type === "" || $scope.problemData.latitude === "" || $scope.problemData.longtitude === "") {
                return true;
            }
        };

        $rootScope.$broadcast('Update',"_problem");
        //function that places marker on the map
        function getCoordinates(e) {
            $scope.$apply(function(){$scope.problemData.latitude = e.latlng.lat;});        // binds latln values to the input on the form
            $scope.$apply(function(){$scope.problemData.longtitude = e.latlng.lng;});      

            var tempMarker = L.marker(e.latlng, {draggable: true}).on('drag', function(e) { // onDrag listener for Marker that binds lat & lng values to the input on the form
                $scope.$apply(function() { 
                    $scope.latitude = e.target._latlng.lat;
                }); 
                $scope.$apply(function() { 
                    $scope.longtitude = e.target._latlng.lng;
                }); 
            });
                        
                     
            $scope.geoJson.addLayer(tempMarker);                               // adding marker to the map
                                
            $rootScope.tempMarker = tempMarker;
            
            $scope.clearGetCoordinatesListener();                              // disable onMapClickListener that binds eventListener "click" & function that places marker on the map
        }

        $scope.clearGetCoordinatesListener = function() {                      // function with disabling onMapClickListener functionality
            $scope.geoJson.off('click', getCoordinates);
        };

        $scope.geoJson.on('click', getCoordinates); // enable onMapClickListener that binds eventListener "click" & function that places marker on the map

        $scope.showRegFormButtonClick = function () {
            $scope.showRegForm = true;
        };

        $scope.dropzoneConfig = {
            'options':{autoProcessQueue:false,
                url:'/api/problempost',
                method:"POST",
                uploadMultiple:true,
                maxFilesize:10,
                parallelUploads:10,
                thumbnailWidth:100,
                thumbnailHeight:100,
                acceptedFiles:'.jpg,.jpeg,.img',
                dictInvalidFileType:"Невірний формат файлу. Допустимі формати : jpg,jpeg,img",
                clickable:".previews",
                previewsContainer:".previews",
                dictFileTooBig: "Файл великого розміру ({{filesize}}MB). Максимальний розмір файлу: {{maxFilesize}}MB."
            }
        };

        $scope.submitProblem = function() {
            location.href = "#/map";
            $rootScope.getProblemsAndPlaceMarkers();
            console.log("addProblem -> submitProblem");
            $scope.getUserProblems($scope.userId);
        };

        $scope.$on('$routeChangeStart', function() {
            $scope.clearGetCoordinatesListener();
        });

    });
});
