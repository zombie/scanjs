scanjsModule.factory('ScanSvc', function($rootScope) {
  var ScanService = {
    //results:[],
    ready:false,
    rules:null,
    init:function(rules){
      this.rules=rules;
      this.ready=true;
    },
    newScan: function(file,source) {
      var fileName = file || 'inline';
      if (location.protocol == "resource:") { // get AST from add-on (async)
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent("ast-request", true, true, {'source': source, 'filename': fileName});
        document.documentElement.dispatchEvent(event);
      }
      else {
        this.scanWorker.postMessage({call: 'scan', arguments: [source, fileName]});
      }
    },
    addResults: function(results) {
      $rootScope.$broadcast('NewResults', results);
    },
    loadRules:function(ruleData){
      this.rules=ruleData;
      this.scanWorker.postMessage({call: 'updateRules', rules: ruleData});
    }
  };
  if (location.protocol == "resource:") {
    ScanService.astResponseHandler = function(event) {
      //FIXME handle parse-errors if the add-on experiences those!
      //FIXME use `$rootScope.$broadcast('ScanError', evt.data.findings[0])` as below.
      var ast = event.detail.ast;
      var fileName = event.detail.filename
      ScanService.scanWorker.postMessage({call: 'scan', arguments: [ast, fileName]});
    };
    document.documentElement.addEventListener("ast-parsed", ScanService.astResponseHandler, false);
  }
  ScanService.scanWorker = new Worker("js/scanworker.js");
  ScanService.scanWorker.addEventListener("message", function (evt) {
    if (('findings' in evt.data) && ('filename' in evt.data)) {
      if (evt.data.findings.length > 0) {
        if (evt.data.findings[0].type == 'error') {
          $rootScope.$broadcast('ScanError', evt.data.findings[0])
          return;
        }
      }
      ScanService.addResults(evt.data);
    }
    else if ('error' in evt.data) {
      // This is for errors in the worker, not in the scanning.
      // Exceptions (like SyntaxErrors) when scanning files
      // are in the findings.
      var exception = evt.data.error;
      if (e instanceof SyntaxError) {
        $rootScope.$broadcast('ScanError', {filename: evt.data.filename, name: exception.name, loc: exception.loc, message: exception.message })
      } else {
        throw e; // keep throwing unexpected things.
      }
    }
  });

  ScanService.scanWorker.onerror = function (e) { console.log('ScanWorker Error: ', e) };
  return ScanService;
});
