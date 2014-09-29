"use strict";

scanjsModule.controller('ExperimentCtrl', ['$scope', 'ScanSvc', function ExperimentCtrl($scope, ScanSvc) {
  if (!document.getElementById("experiment-mirror").children.length) {
    $scope.codeMirror = new CodeMirror(document.getElementById('experiment-mirror'), {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'mdn-like',
      value: "bar.foo\nfoo=something\nbaz.bar=stuff\nfoo(something)\nfoo.bar\nfoo.bar()\neval(test)\nfoo.innerHTML=danger",
      tabsize: 2,
      styleActiveLine: true
    });
  }
  $scope.results=[];
  $scope.ready=false;
  $scope.rule="eval()"

  var ruleData={
    "name": "manual rule",
    "source": $scope.rule,
    "testhit": $scope.rule,
    "testmiss": "",
    "desc": "Manual input.",
    "threat": "example"
  };

  $scope.runScan = function () {
    $scope.results = [];
    ScanJS.loadRules(ScanSvc.rules);
    var code = $scope.codeMirror.getValue();
    try {
      var ast = acorn.parse(code, { locations: true });
    } catch(e) {
      console.error(e);
    }
    $scope.results = ScanJS.scan(ast);
    $scope.lastScan = $scope.runScan;
  };

  $scope.runManualScan = function () {
    ruleData.source = $scope.rule;
    ScanJS.loadRules([ruleData]);

    $scope.results = [];
    var code = $scope.codeMirror.getValue();
    try {
      var ast = acorn.parse(code, { locations: true });
    } catch(e) {
      console.error(e);
    }
    
    //put ast on global variable for debugging purposes.
    window.ast = ast;

    //ScanJS.setResultCallback(found);
    $scope.results = ScanJS.scan(ast);
    $scope.lastScan = $scope.runManualScan;
  };

  $scope.showResult = function (filename,line, col) {
    document.querySelector("#code-mirror-wrapper").classList.toggle("hidden",false);
    $scope.codeMirror.setCursor(line - 1, col || 0);
    $scope.codeMirror.focus();
  };

  $scope.add_placeholder_char = function() {
    $scope.rule += '$_any';
  }
  $scope.lastScan=$scope.runScan;
  
}]);
