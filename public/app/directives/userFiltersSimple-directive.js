/**
 * Created by bogdan on 14.06.17.
 */
define(['./module'],function(directives){
    directives.directive('userFiltersSimple', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/templates/filtersUser.html'
        }
    });
});