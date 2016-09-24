"use strict";

/**
 * PatternMatcher provides a set of functions to filter responses based on pattern matching as
 * described by the AIML 2.0 draft doc.
 *
 * https://docs.google.com/document/d/1wNT25hJRyupcG51aO89UcQEiG-HkXRXusukADpFnDs4/pub
 * (See 5. (AIML Pattern Language)
 */

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
