"use strict";

import Chipper from './src/Chipper';

let bot = new Chipper({
  'aiml': 'data/aiml_simple/simple.aiml'
});

console.log(bot.talk('hello'));