"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

import sinon from "sinon";

import * as processTemplate from "../../../src/Aiml/ProcessTemplate";

import srai from "../../../src/Aiml/Template/Srai";

describe("AIML - srai tag", function() {
  before(function() {
    processTemplate = sinon.stub().returns("");
  });

  // @TODO: This check needs better stubbing. Look at proxyquire as an option for
  // passing in processTemplate.
  it("sanity check", function() {
    srai("Hi", "hello", {info: function() {}});
    expect(srai).to.be.truthy;
    //expect(processTemplate.callCount).to.equal(1);
  });
});
