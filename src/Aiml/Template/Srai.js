"use strict";

var BaseNode = require('../BaseNode');
var Surly = require('../../Surly');

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-srai
 *
 * The srai element instructs the AIML interpreter to pass the result of
 * processing the contents of the srai element to the AIML matching loop, as if
 * the input had been produced by the user (this includes stepping through the
 * entire input normalization process). The srai element does not have any
 * attributes. It may contain any AIML template elements.
 *
 * As with all AIML elements, nested forms should be parsed from inside out, so
 * embedded srais are perfectly acceptable.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:srai>
 *    <!-- Contents: aiml-template-elements -->
 * </aiml:srai>
 */
module.exports = class Srai extends BaseNode {

  /**
   * Constructor method
   * @param  {Node} node Xmllibjs node object
   */
  constructor (node, surly) {
    super(node, surly);
    this.type = 'srai';
    this.content = node.text().toString();
  }

  /**
   * Return content as text
   * @return {String}
   */
  getText (callback) {
    this.surly.talk(this.content, callback);
  }
};
