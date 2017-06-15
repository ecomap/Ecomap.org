/**
 * Created by bogdan on 14.06.17.
 */
define(['./module'],function(directives){
    directives.directive('problemFiltersSimple', function(){
        return {
            restrict: 'A',
            templateUrl: 'app/templates/filtersProblem.html'
        }
    });
});