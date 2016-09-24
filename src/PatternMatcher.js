"use strict";

/**
 *
 * @param searchTerm
 * @param patterns
 * @returns {Array.<*>}
 */
export function findMatches(searchTerm, patterns = []) {
  return patterns.filter((pattern) => {
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
