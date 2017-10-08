"use strict";

import Chipper from './src/Chipper';

let bot = new Chipper({
  'aiml': 'data/aiml_simple/simple.aiml'
});

bot.talk('Set bar')
  .then((result) => {
    console.log(result);
    console.log(bot.session());
  });
