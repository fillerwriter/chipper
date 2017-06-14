"use strict";

import libxmljs from "libxmljs";
import * as _ from 'lodash';

import * as PatternMatcher from "../PatternMatcher";
import aimlTags from "./AimlTags";

/**
 * Simple parsing of input from a user using a key=>map dataset.
 * @param input
 * @param brain
 * @param logger
 * @returns {string}
 */
export default function processTemplate(input, brain, logger) {
  logger.info("process template", input);

  let responsePatterns = PatternMatcher.findMatches(input, _.keys(brain));
  let template = libxmljs.parseXml(`<wrapper>${brain[responsePatterns[0]]}</wrapper>`).childNodes();
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

  logger.info("Output snippet", output);
  return output;
}
