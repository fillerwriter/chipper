"use strict";

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const aiml = `<?xml version="1.0" encoding="utf-8"?>
<aiml>
	<category>
		<pattern>HELLO</pattern>
		<template>Foo<br />Bar</template>
	</category>
	<category>
	  <pattern>HI</pattern>
	  <template><srai>HELLO</srai></template>
	</category>
</aiml>`;

chai.use(chaiAsPromised);
const expect = chai.expect;

import AIMLFileParser from "../../src/Aiml/AIMLFileParser";

describe("AIMLFileParser", function() {
  it("sanity check", function() {
    return expect(AIMLFileParser).to.exist;
  });

  it("can parse a simple AIML file", function() {
    let brain = AIMLFileParser(aiml);

    expect(Object.keys(brain).length).to.equal(2);
    expect(brain['HELLO']).to.exist;
    expect(brain['HI']).to.exist;
  });
});
