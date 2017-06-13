"use strict";

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
};
