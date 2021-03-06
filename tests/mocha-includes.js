global.acorn = require("acorn");
global.chai = require("chai");
global.assert = chai.assert;
global.should = require("chai").should();
global.expect = require("chai").expect;
global.AssertionError = require("chai").AssertionError;

global.ScanJS = require("../core/scan.js");
var fs = require("fs");
var signatures = JSON.parse(fs.readFileSync("../core/rules.json", "utf8"));
ScanJS.parser(acorn);
ScanJS.loadRules(signatures);
