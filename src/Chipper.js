"use strict";

import bunyan from "bunyan";
import fs from 'fs';
import Promise from "bluebird";
import _ from "lodash";

import ChatSession from "./ChatSession";
import Environment from "./Environment";
import processTemplate from "./Aiml/ProcessTemplate";
import inputProcessor from "./Aiml/InputProcessor";
import * as PatternMatcher from "./PatternMatcher";

class Chipper {

  constructor(options = {}) {
    let aimlSource = (options.aiml) ? options.aiml : 'data/aiml_simple/simple.aiml';
    let logger = undefined;
    let environment = undefined;
    let session = new ChatSession();

    if (options.logger) {
      logger = options.logger;
    } else {
      logger = bunyan.createLogger({name: 'Chipper'});
    }

    if (options.environment) {
      environment = options.environment;
    } else {
      environment = new Environment();
    }

    environment.importAIML(fs.readFileSync(aimlSource), logger);

    this.logger = function() {
      return logger;
    };

    this.environment = function() {
      return environment;
    };

    this.session = function() {
      return session;
    };
  }

  talk(rawInput) {
    return new Promise((resolve, reject) => {
      resolve(parse(rawInput, this.session(), this.environment(), this.logger()));
    });
  }
}

export default Chipper;

/**
 * Takes raw string input and processes it with a brain object to determine bot response.
 * @param rawInput
 * @param session
 * @param environment
 * @param logger
 * @returns string output.
 */
function parse(rawInput, session, environment, logger) {
  const processedInput = inputProcessor(rawInput);

  let responsePatterns = PatternMatcher.findMatches(processedInput.normalized, _.keys(environment.brain));

  processedInput.template = environment.brain[responsePatterns[0]];
  processedInput.wildcards = getWildCardValues(processedInput.normalized, responsePatterns[0]);

  return processTemplate(processedInput, session, environment, logger);
}

// @TODO: Move to tested method.
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
