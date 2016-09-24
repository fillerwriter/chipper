"use strict";

const expect = require('chai').expect;

import NormaliseInput from '../../src/Aiml/NormaliseInput';

describe('NormaliseInput', function() {
  it("Strips punctuation", function() {
    expect(NormaliseInput('Hello!')).to.equal('HELLO');
    expect(NormaliseInput(`Yo, what's up with you?`)).to.equal(`YO WHAT'S UP WITH YOU`);
  });
});