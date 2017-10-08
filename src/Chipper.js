"use strict";

import bunyan from "bunyan";
import libxmljs from "libxmljs";
import fs from 'fs';
import Promise from "bluebird";

import ChatSession from "./ChatSession";
import Environment from "./Environment";
import processTemplate from "./Aiml/ProcessTemplate";
import inputProcessor from "./Aiml/InputProcessor";

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

    this.logger = function() {
      return logger;
    };

    this.environment = function() {
      return environment;
    };

    this.session = function() {
      return session;
    };

    this.brain = buildBrain(fs.readFileSync(aimlSource), logger);
  }

  talk(rawInput) {
    return new Promise((resolve, reject) => {
      // @TODO: Add brain to environment.
      resolve(parse(rawInput, this.session(), this.brain, this.logger()));
    });
  }
}

export default Chipper;

function buildBrain(xmlDoc, logger) {
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

  return brain;
}

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
  return processTemplate(processedInput, session, environment, logger);
}
