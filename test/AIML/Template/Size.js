"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

import bunyan from "bunyan";

let logger = bunyan.createLogger({name: 'Chipper'});

chai.use(chaiAsPromised);
const expect = chai.expect;

import Size from "../../../src/Aiml/Template/Size";

describe("AIML - size tag", function() {
  const environment = {
    brain: {
      "foo": "foo",
      "bar": "bar",
      "baz": "baz"
    }
  };

  before(function() {
  });

  it("Counts the categories in the environment..", function() {
    const result = Size('stub', {}, environment, logger);
    expect(result).to.equal(3);
  });
});
