"use strict";

const expect = require('chai').expect;

import Environment from '../src/Environment';

describe('Environment', function() {
  let env;
  beforeEach(function() {
    env = new Environment();
  });

  it("test", function() {
    expect(Environment).to.be.defined;
    expect(env).to.be.defined;
  });
});