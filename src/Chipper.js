"use strict";

import ChatSession from "./ChatSession";
import bunyan from "bunyan";
import libxmljs from "libxmljs";
import fs from 'fs';

function Chipper(options = {}) {
  let aimlSource = (options.aiml) ? options.aiml : 'data/aiml_simple/simple.aiml';

  if (options.logger) {
    this._logger = options.logger;
  } else {
    this._logger = bunyan.createLogger({name: 'Chipper'});
  }

  this.brain = buildBrain(fs.readFileSync(aimlSource));
}

Chipper.prototype.talk = function(input) {
  return parse(input, this.brain, this._logger);
};

Chipper.prototype.logger = function() {
  return {};
};

Chipper.prototype.environment = function() {

};

export default Chipper;

let aimlTags = {
  'srai': function(input, brain, logger) {
    return processTemplate(input, brain, logger);
  },
  'date': function(input, brain) {
    return new Date().toISOString();
  },
  // 'br': function(input, brain) {
  //   return '\n';
  // }
};

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

function processTemplate(input, brain, logger) {
  logger.info("process template", input);
  let template = libxmljs.parseXml(`<wrapper>${brain[input]}</wrapper>`).childNodes();
  let output = '';

  template.forEach(function(item) {
    if (item.type() === 'element') {
      if (aimlTags[item.name()]) {
        output += aimlTags[item.name()](item.text(), brain, logger);
      } else {
        output += item.toString();
      }
    } else if (item.type() === 'text') {
      output += item.toString();
    }
  });

  //console.log("OUTPUT", output);

  return output;
}
