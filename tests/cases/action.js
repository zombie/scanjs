(function () {
  describe('action attribute (mainly for forms) test', function () {
    context('ignores safe patterns', function () {
      context(null, function () {
        var good = acorn.parse('var action = "static string";', {locations: true});
        it(good, function () {
          chai.expect(ScanJS.scan(good, document.location.pathname)).to.be.empty;
        });
      });
    });
    context('detects dangerous patterns', function () {
      context(null, function () {
        var bad = acorn.parse('var a=document.createElement("form"); a.action="demo_form.asp"; document.body.appendChild(a);', {locations: true});
        it(bad, function () {
          chai.expect(ScanJS.scan(bad, document.location.pathname)).not.to.be.empty;
        });
      });
      context(null, function () {
        // issue 73 - https://github.com/mozilla/scanjs/issues/73
        var bad = acorn.parse('var a=document.createElement("form"); a.setAttribute("action", "demo_form.asp"); document.body.appendChild(a);', {locations: true});
        it.skip(bad, function () {
          chai.expect(ScanJS.scan(bad, document.location.pathname)).not.to.be.empty;
        });
      });
      context(null, function () {
        // issue 74 - https://github.com/mozilla/scanjs/issues/74
        var bad = acorn.parse('var a=document.createElement("div"); a.innerHTML="<form action=\'demo.asp\'></form>"; document.body.appendChild(a);', {locations: true});
        it.skip(bad, function () {
          chai.expect(ScanJS.scan(bad, document.location.pathname)).not.to.be.empty;
        });
      });
    });
  });
})();
