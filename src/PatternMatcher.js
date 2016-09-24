"use strict";

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
          return '.*';
        default:
          return `\\b${word}\\b`;
      }
    });

    let wordsString = words.join('');

    const regex = new RegExp(wordsString, 'i');
    return searchTerm.match(regex);
  });

  return rankPatterns(searchTerm, matchedPatterns);
}

function rankPatterns(searchTerm, patterns) {
  return patterns.sort((a, b) => {
    if (searchTerm == a) {
      return -1;
    }
    if (searchTerm == b) {
      return 1;
    }
    return 0;
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
