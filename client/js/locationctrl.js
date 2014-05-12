function LocationController($scope, $location)
{
  $scope.isActive = function (viewLocation) {
    //debugger;
    return viewLocation === $location.path();
  };
}
