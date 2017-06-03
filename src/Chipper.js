"use strict";

import ChatSession from "./ChatSession";
import bunyan from "bunyan";

let log = bunyan.createLogger({
  name: 'chipper',
  streams: [{
    'level': 'error',
    stream: process.stderr
  },
    {
      level: 'debug',
      path: path.join(__dirname, '../', 'logs/bunyan.log')
    }]
});

export function createSession() {
  return new ChatSession();
};

export function talk(input, session) {

};