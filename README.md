scanjs
======

ScanJS is a Static analysis tool for javascript code. ScanJS was created as an aid for security review, to help identify security issues in client-side web applications. The 

Scanjs uses Acorn to convert sources to AST, then walks AST looking for source patterns

ScanJS Rules
------------------------
Rules are specified in JSON format - for an example see ```/common/template_rules.json```

At a minimum, each must have rule is made up of 2 attributes:
- name: the name of the rule
- source: javascript source which matches one of the patterns below

The following statements are supported:

identifier: matches any identifier , e.g. "foo"
property: matches any property 
 
Optionally a rule may have the following attirbutes:
- testhit: one more JavaScript statements (seperate by semi-colons) that the rule will match
- testmiss: the rule should not match any of these statements
- desc: description of the rule
- threat: for catgorizing rules by threat



Run ScanJS in the browser
------------------------
- Install [node.js](http://nodejs.org/)
- ```npm install -g mozilla/scanjs```
- ```scanjs-server```
- Navigate to http://127.0.0.1:4000/client/ or see our [example page](http://mozilla.github.io/scanjs/client/)

Run ScanJS from the command line
------------------------
- Install [node.js](http://nodejs.org/)
- ```npm install -g mozilla/scanjs```
- ```scanjs -t DIRECTORY_PATH```

Testing instructions
------------------------
Tests use the mocha testing framework.

- ```scanjs-server```
- ```http://127.0.0.1:4000/tests/```

Tests are included in the rules declaration (see common/rules.json) by specifying the following two attributes, which are specified in the form of a series of javascript statements:

- _testhit_: The rule should match each of these statements individualy. 
- _testmiss_: The rule should not match all of these statements.


