"use strict";

import libxmljs from "libxmljs";

/**
 * Handles the AIML chat environment. Keeps track of variables, bot attributes,
 * user attributes etc.
 */
module.exports = class Environment {
  constructor () {
    this.state = {};
  }

  /**
   * Get a previous response
   * @param  {Integer} index 1 = previous response, 2 = one before that etc...
   * @return {String}
   */
  getPreviousResponse (index, sentence) {

  }

  /**
   * Get a previous response
   * @param  {Integer} index 1 = previous response, 2 = one before that etc...
   * @return {String}
   */
  getPreviousInput (index, sentence) {

  }

  importState(newState = {}) {
    this.state = newState;
  }

  exportState() {
    return this.state;
  }

  /**
   *
   * @param xmlDoc
   * @param logger
   * @returns {{}}
   */
  importAIML(xmlDoc, logger) {
    let parsed = libxmljs.parseXml(xmlDoc);
    let brain = {};

    let categories = parsed.find('category');

    categories.forEach((item) => {
      let pattern = item.find('pattern')[0].text();
      brain[pattern] = item.find('template')[0].childNodes().reduce(function(a, b) {
        return a + b.toString();
      }, '');
    });

    logger.debug("Brain Size: " + Object.keys(brain).length);

    this.brain = brain;
    return brain;
  }
};
