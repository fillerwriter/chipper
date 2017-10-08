"use strict";

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-star
 *
 * The star element indicates that an AIML interpreter should substitute the
 * value "captured" by a particular wildcard from the pattern-specified portion
 * of the match path when returning the template.
 *
 * The star element has an optional integer index attribute that indicates which
 * wildcard to use. The minimum acceptable value for the index is "1" (the first
 * wildcard), and the maximum acceptable value is equal to the number of
 * wildcards in the pattern.
 *
 * An AIML interpreter should raise an error if the index attribute of a star
 * specifies a wildcard that does not exist in the category element's pattern.
 * Not specifying the index is the same as specifying an index of "1".
 *
 * The star element does not have any content.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:star index = single-integer-index />
 */
// module.exports = class Star extends BaseNode {
//   constructor (node, surly) {
//     super(node, surly);
//
//     this.type = 'star';
//
//     if (node.attr('index')) {
//       this.index = node.attr('index').value() - 1;
//     } else {
//       this.index = 0;
//     }
//   }
//
//   getText (callback) {
//     var wildcards = this.surly.environment.wildcard_stack.getLast();
//
//     if (typeof wildcards[this.index] === 'undefined') {
//       this.log.log('ERROR: STAR with no matching * value.');
//       callback('Star with no matching * value.', 'ERROR!');
//     } else {
//       callback(null, wildcards[this.index]);
//     }
//   }
// };

// input - raw
//       - normalized
//       - wildcards
//       - pattern
//       - inputOptions

export default function Star(input, session, environment, logger) {
  console.log("STAR");
  console.log(input);
  let wildcardValues = getWildCardValues(input.normalized, input.pattern);
  return wildcardValues[0];
}

function getWildCardValues (input, pattern) {
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