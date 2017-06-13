"use strict";

import srai from "./Template/Srai";

export default {
  'srai': srai,
  'date': function(input, brain) {
    return new Date().toISOString();
  },
  // 'br': function(input, brain) {
  //   return '\n';
  // }
};
