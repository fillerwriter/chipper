"use strict";

const expect = require('chai').expect;

import * as PatternMatcher from '../src/PatternMatcher';

const patterns = [
  'FOO',
  'FOO BAR',
  'FOO *'
];

describe('PatternMatcher', function() {
  it('Matches exact matches', function() {
    expect(PatternMatcher.isMatch('FOO', patterns)).to.be.true;
    expect(PatternMatcher.isMatch('NOTFOO', patterns)).to.be.false;
    expect(PatternMatcher.isMatch('NOT A MATCH', patterns)).to.be.false;
  });

  it('Matches against word boundaries', function() {
    expect(PatternMatcher.isMatch('FOO BAR', patterns)).to.be.true;
  });

  it('Matches appropriate patterns containing a *', function() {
    expect(PatternMatcher.isMatch('FOO BAZ', patterns)).to.be.true;
    expect(PatternMatcher.isMatch('NOT A MATCH', patterns)).to.be.false;
  });
});
