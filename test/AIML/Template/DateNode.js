"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

import bunyan from "bunyan";
import _ from "lodash";

let logger = bunyan.createLogger({name: 'Chipper'});

chai.use(chaiAsPromised);
const expect = chai.expect;

import DateNode from "../../../src/Aiml/Template/DateNode";

describe("AIML - date tag", function() {
  before(function() {
  });

  it("Renders the date on output.", function() {
    const result = DateNode('stub', {}, {}, logger);
    const resultDate = new Date(result);
    expect(_.isDate(resultDate)).to.be.true;
  });
});
