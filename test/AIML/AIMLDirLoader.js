"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
const expect = chai.expect;

import path from "path";
import AIMLDirLoader from "../../src/Aiml/AIMLDirLoader";

describe("AIMLDirLoader", function() {
  it("can eventually read and filter AIML spec files", function() {
    return expect(AIMLDirLoader(path.normalize(path.join(__dirname, "../data/aiml-simple")))).to.eventually.become(['foo.aiml']);
  });
});
