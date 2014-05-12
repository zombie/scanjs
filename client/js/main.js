var scanjsModule = angular.module('scanjs', ['ui.bootstrap', 'ngRoute']);

scanjsModule.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/scan', {
        templateUrl: 'partials/scan.html',
        controller: 'ScanCtrl'
      }).
      when('/rules', {
        templateUrl: 'partials/rules.html',
        controller: 'RuleListCtrl'
      }).
      when('/experiment', {
        templateUrl: 'partials/experiment.html',
        controller: 'ExperimentCtrl'
      }).
      otherwise({
        redirectTo: '/scan'
      });
  }]);

scanjsModule.controller('NavigationCtrl', ['$scope', '$location', function NavigationCtrl($scope, $location) {
  $scope.tabBtnClass = function (page) {
    var current = $location.path().substring(1) || 'scan';
    //console.log("l", $location.hash(), "ls", $location.hash().substring(2))
    return page === current ? 'active' : '';
  }
}]);