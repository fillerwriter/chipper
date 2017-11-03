"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

import bunyan from "bunyan";

let logger = bunyan.createLogger({name: 'Chipper'});

chai.use(chaiAsPromised);
const expect = chai.expect;

import Uppercase from "../../../src/Aiml/Template/Uppercase";


describe("AIML - uppercase tag", function() {
  before(function() {
  });

  it("returns content as uppercase.", function() {
    const result = Uppercase('hello', {}, {}, logger);
    expect(result).to.equal('HELLO');
  });
});
