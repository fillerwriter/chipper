"use strict";

const _ = require('lodash');

/**
 * PatternMatcher provides a set of functions to filter responses based on pattern matching as
 * described by the AIML 2.0 draft doc.
 *
 * https://docs.google.com/document/d/1wNT25hJRyupcG51aO89UcQEiG-HkXRXusukADpFnDs4/pub
 * (See 5. (AIML Pattern Language)
 */

/**
 *
 * @param searchTerm
 * @param patterns
 * @returns {Array.<*>}
 */
export function findMatches(searchTerm, patterns = []) {
  const matchedPatterns = patterns.filter((pattern) => {
    let words = pattern.split(' ').map((word) => {
      switch (word) {
        case '*':
        case '_':
          return '.+';
        case '^':
        case '#':
        case '$':
          return '.*';
        default:
          return `${word}`;
      }
    });

    let wordsString = `^${words.join(' ')}$`;

    const regex = new RegExp(wordsString, 'i');
    return searchTerm.match(regex);
  });

  return rankPatterns(searchTerm, matchedPatterns);
}

function rankPatterns(searchTerm, patterns) {
  const searchPatternsRankings = [
    (searchTerm, pattern) => {
      return pattern.indexOf('$') !== -1;
    },
    (searchTerm, pattern) => {
      return pattern.indexOf('#') !== -1;
    },
    (searchTerm, pattern) => {
      return pattern.indexOf('_') !== -1;
    },
    (searchTerm, pattern) => {
      return searchTerm === pattern;
    },
    (searchTerm, pattern) => {
      return pattern.indexOf('^') !== -1;
    },
    (searchTerm, pattern) => {
      return pattern.indexOf('*') !== -1;
    }
  ];

  return patterns.sort((a, b) => {
    let itemA = _.findIndex(searchPatternsRankings, function(fn) {
      return fn(searchTerm, a);
    });
    let itemB = _.findIndex(searchPatternsRankings, function(fn) {
      return fn(searchTerm, b);
    });

    return itemA - itemB;
  });
}

/**
 *
 * @param searchTerm
 * @param patterns
 * @returns {boolean}
 */
export function isMatch(searchTerm, patterns = []) {
  if (!searchTerm) {
    return false;
  }

  let matches = findMatches(searchTerm, patterns);

  return matches.length > 0;
}

/**
 *
 * @param input
 * @param pattern
 * @returns {Array}
 */
export function getWildCardValues (input, pattern) {
  let replace_array = pattern.split('*');

  for(let replacementItem in replace_array) {
    input = input.replace(replace_array[replacementItem], '|');
  }

  // split by pipe and we're left with values and empty strings
  input = input.trim().split('|');

  let output = [];
  let chunk = '';

  for (let i = 0; i < input.length; i++) {
    chunk = input[i].trim();

    if (chunk === '') continue;

    if (chunk.charAt(chunk.length - 1) === '?') {
      chunk = chunk.substr(0, chunk.length - 1);
    }

    output.push(chunk);
  }

  return output;
}
