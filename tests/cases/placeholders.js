


describe('Testing placeholders $_any, $_contains etc', function () {
  context('$_any', function () {

    it(" $_any.foo should match something.foo", function () {
      ScanJS.loadRules([{name:"$_any.foo",source:"$_any.foo"}]);
      var results = ScanJS.scan("something.foo;");
      chai.expect(results).to.have.length(1);
    });

    it(" $_any.foo should not match something.bar", function () {
      ScanJS.loadRules([{name:"$_any.foo",source:"$_any.foo"}]);
      var results = ScanJS.scan("something.bar;");
      chai.expect(results).to.have.length(0);
    });

    it(" foo.$_any should match foo.something", function () {
      ScanJS.loadRules([{name:"foo.$_any",source:"foo.something"}]);
      var results = ScanJS.scan("foo.something;");
      chai.expect(results).to.have.length(1);
    });

    it(" foo.$_any should not match bar.something", function () {
      ScanJS.loadRules([{name:"$_any.foo",source:"$_any.foo"}]);
      var results = ScanJS.scan("something.bar;");
      chai.expect(results).to.have.length(0);
    });


  });

  context('$_contains', function () {

    var rule= {name:"foo=$_unsafe",source:"foo=$_unsafe"};

    it(rule.source + " match template callargs", function () {
      var template=ScanJS.parseRule(rule);
      chai.expect("assignment").to.equal(template);
    });

    it(rule.source + "  should match foo=identifier", function () {
      ScanJS.loadRules([rule]);
      var results = ScanJS.scan("foo=identifier;");
      chai.expect(results).to.have.length(1);
    });

    it(rule.source + "  should match foo=identifier", function () {
      ScanJS.loadRules([rule]);
      var results = ScanJS.scan("foo=identifier;");
      chai.expect(results).to.have.length(1);
    });

    it(rule.source + "  should not match bar=identifier", function () {
      ScanJS.loadRules([rule]);
      var results = ScanJS.scan("bar=identifier;");
      chai.expect(results).to.have.length(0);
    });

    it(rule.source + "  should not match foo='literal'", function () {
      ScanJS.loadRules([rule]);
      var results = ScanJS.scan("foo='literal;'");
      chai.expect(results).to.have.length(0);
    });
  });
})
