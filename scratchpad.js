"use strict";

import Chipper from './src/Chipper';
import bunyan from "bunyan";




let bot = new Chipper({
  'aiml': 'data/aiml_simple/simple.aiml',
  logger: bunyan.createLogger({name: 'Chipper', level: 'debug'})
});

bot.talk('size')
  .then((result) => {
    console.log("Output: " + result);
    console.log(bot.session());
  });

// bot.talk('set foo bar')
//   .then((result) => {
//     console.log("Output: " + result);
//     console.log(bot.session());
//   });
