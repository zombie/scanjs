function ExperimentCtrl($scope) {
  $scope.codeMirror = undefined;
  $scope.results=[];

  //TODO $scope.ruleFunction=""

  $scope.customRule={
    "type": "custom",
    "name": "custom",
    "test": "Edit this rule"
  }

  $scope.runManualScan = function (source, filename) {
    console.log('scanning')
    code = $scope.codeMirror.getValue();
    $scope.results = ScanJS.scan(code, ScanJS.rules, "ManualInput");
  }

  $scope.runCustomScan = function (source, filename) {
    console.log('scanning')
    code = $scope.codeMirror.getValue();
    // TODO show $scope.ruleFunction. Requires refactoring of ScanJS.template, probably needs to be its own file.
    $scope.results = ScanJS.scan(code, [$scope.customRule], "CustomRule");
  }

  $scope.showResult = function (filename,line, col) {
    document.querySelector("#code-mirror-wrapper").classList.toggle("hidden",false);
    var file = $scope.inputFiles.find(function(f){return f.name==filename});
    $scope.codeMirror.setValue(file.asText());
    $scope.codeMirror.setCursor(line - 1, col || 0);
    $scope.codeMirror.focus();
  };
  
}
