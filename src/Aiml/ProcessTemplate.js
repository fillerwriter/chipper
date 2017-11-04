"use strict";

import libxmljs from "libxmljs";
import * as _ from 'lodash';

import * as PatternMatcher from "../PatternMatcher";
import aimlTags from "./AimlTags";
import InputProcessor from "./InputProcessor";

/**
 * Simple parsing of input from a user using a key=>map dataset.
 * @param input
 * @param session
 * @param environment
 * @param logger
 * @returns {string}
 */

export default function processTemplate(input, session, environment, logger) {
  logger.debug("process template", input);

  let template = libxmljs.parseXml(`<wrapper>${input.template}</wrapper>`).childNodes();

  let output = '';

  template.forEach(function(item) {
    if (item.type() === 'element') {
      if (aimlTags[item.name()]) {

        let attrs = item.attrs();
        let attrsRaw = {};

        for (let i in attrs) {
          attrsRaw[attrs[i].name()] = attrs[i].value();
        }

        let content = _.join(_.forEach(item.childNodes(), (item) => {
          return item.toString();
        }), ' ');


        let inputData = {
          raw: content,
          normalized: content,
          template: input.template,
          wildcards: input.wildcards,
          attributes: attrsRaw
        };

        output += aimlTags[item.name()](inputData, session, environment, logger);
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
