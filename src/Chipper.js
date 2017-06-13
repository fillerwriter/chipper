"use strict";

import bunyan from "bunyan";
import libxmljs from "libxmljs";
import fs from 'fs';

import ChatSession from "./ChatSession";
import Environment from "./Environment";
import processTemplate from "./Aiml/ProcessTemplate";

class Chipper {

  constructor(options = {}) {
    let aimlSource = (options.aiml) ? options.aiml : 'data/aiml_simple/simple.aiml';
    let logger = undefined;
    let environment = undefined;

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

    this.brain = buildBrain(fs.readFileSync(aimlSource));
  }

  talk(input) {
    return parse(input, this.brain, this.logger());
  }
}

export default Chipper;

function buildBrain(xmlDoc) {
  let parsed = libxmljs.parseXml(xmlDoc);
  let brain = {};

  let categories = parsed.find('category');

  categories.forEach((item) => {
    let pattern = item.find('pattern')[0].text();
    brain[pattern] = item.find('template')[0].childNodes().reduce(function(a, b) {
      return a + b.toString();
    }, '');

    //console.log(item.find('template')[0].childNodes().length);
  });

  return brain;
}

/**
 * Takes raw string input and processes it with a brain object to determine bot response.
 * @param input
 * @param brain
 * @param logger
 * @returns string output.
 */
function parse(input, brain, logger) {
  let processedInput = input.toUpperCase();
  return processTemplate(processedInput, brain, logger);
}
