"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

import bunyan from "bunyan";

let logger = bunyan.createLogger({name: 'Chipper'});

chai.use(chaiAsPromised);
const expect = chai.expect;

import Formal from "../../../src/Aiml/Template/Formal";


describe("AIML - formal tag", function() {
  before(function() {
  });

  it("returns content in formal case.", function() {
    const result = Formal({normalized: 'HeLLo DarkNess My OlD Friend. It\'s COME to me again'}, {}, {}, logger);
    expect(result).to.equal('Hello Darkness My Old Friend. It\'s Come To Me Again');
  });
});
