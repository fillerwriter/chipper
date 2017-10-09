"use strict";

import Chipper from './src/Chipper';

let bot = new Chipper({
  'aiml': 'data/aiml_simple/simple.aiml'
});

bot.talk('set foo bar')
  .then((result) => {
    console.log("Output: " + result);
    console.log(bot.session());
  });
