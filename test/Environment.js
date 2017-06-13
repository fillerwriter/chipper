"use strict";

const expect = require('chai').expect;

import Environment from '../src/Environment';

describe('Environment', function() {
  let env;
  beforeEach(function() {
    env = new Environment();
  });

  it("Expects the ability to dump and importState a working copy of the environment state.", function() {
    const envState = {
      substitutions: [
        ['foo', 'foofoo'],
        ['bar', 'barbar'],
        ['baz', 'bazbaz']
      ]
    };

    env.importState(envState);
    expect(env.exportState()).to.deep.equal(envState);
  });
});
