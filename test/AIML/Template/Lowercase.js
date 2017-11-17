"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

import bunyan from "bunyan";

let logger = bunyan.createLogger({name: 'Chipper'});

chai.use(chaiAsPromised);
const expect = chai.expect;

import Lowercase from "../../../src/Aiml/Template/Lowercase";


describe("AIML - lowercase tag", function() {
  before(function() {
  });

  it("returns content as lowercase.", function() {
    const result = Lowercase({normalized: 'HELLO'}, {}, {}, logger);
    expect(result).to.equal('hello');
  });
});
