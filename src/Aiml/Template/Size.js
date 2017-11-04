"use strict";

/**
 * From AIML Spec
 * http://www.alicebot.org/TR/2001/WD-aiml/#section-system-defined-predicates
 *
 * The size element tells the AIML interpreter that it should substitute the
 * number of categories currently loaded.
 *
 * The size element does not have any content.
 *
 * <!-- Category: aiml-template-elements -->
 * <aiml:size/>
 */

import _ from "lodash";

export default function Size(input, session, environment, logger) {
  return _.size(environment.brain);
}
