"use strict";

/**
 *
 * @param userInput
 * @returns {string}
 */
export default function NormaliseInput(userInput) {
  let output = userInput.toUpperCase();

  output = output.replace(/[^a-z0-9' ]+/gi, '');

  return output;
}
