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
      'FOO *',
      'CARAT ^',
      'POUND #',
      'DOLLAR $'
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

    it('Matches appropriate patterns containing a ^', function() {
      expect(PatternMatcher.isMatch('CARAT', patterns)).to.be.true;
      expect(PatternMatcher.isMatch('CARAT EXTRA', patterns)).to.be.true;
      expect(PatternMatcher.isMatch('BAD CARAT', patterns)).to.be.false;
    });


  });

  describe('.matchPatterns', function() {
    const patterns = [
      'FOO *',
      'FOO ^',
      'FOO'
    ];

    const greedyMatch = [
      'FOO *',
      'FOO * *'
    ];

    it('returns an array of ranked patterns, based on specificity', function() {
      const matchedPatterns = PatternMatcher.findMatches('FOO BAR', patterns);
      expect(matchedPatterns.length).to.equal(2);
      expect(matchedPatterns[0]).to.equal('FOO ^');
    });

    it.skip('matches against multiple words when needed', function() {
      expect(PatternMatcher.findMatches('FOO BAR', greedyMatch).length).to.equal(1);
      expect(PatternMatcher.findMatches('FOO BAR BAZ', greedyMatch).length).to.equal(2);
      expect(PatternMatcher.findMatches('FOO HERE IS A REALLY LONG SENTENCE', greedyMatch).length).to.equal(2);
    });
  });
});
