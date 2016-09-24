"use strict";

const expect = require('chai').expect;

import * as PatternMatcher from '../src/PatternMatcher';

describe('PatternMatcher', function() {
  describe('.isMatch', function() {
    const patterns = [
      'FOO',
      'FOO BAR',
      'FOO *'
    ];

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

  describe('.matchPatterns', function() {
    const patterns = [
      'FOO *',
      'FOO'
    ];

    it('returns an array of ranked patterns, based on specificity', function() {
      const matchedPatterns = PatternMatcher.findMatches('FOO', patterns);
      expect(matchedPatterns.length).to.equal(2);
      expect(matchedPatterns[0]).to.equal('FOO');
    });
  });
});
