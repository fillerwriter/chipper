"use strict";

const fs = require('fs');
const Stack = require('./stack');
const Aiml = require('./Aiml/Aiml');
const Environment = require('./Environment');
const Logger = require('./Logger');
const bunyan = require('bunyan');
const path = require('path');

module.exports = class Surly {
  constructor (options) {
    this.log = new Logger();
    this.log2 = bunyan.createLogger({
      name: 'surly3',
      streams: [{
        'level': 'error',
        stream: process.stderr
      },
      {
        level: 'debug',
        path: path.join(__dirname, '../', 'logs/bunyan.log')
      }]
    });
    this.input_stack = new Stack(10);
    this.environment = new Environment();
    this.aiml = new Aiml({
      surly: this
    });
    this.aiml.loadDir(options.brain);
    this.environment.aiml = this.aiml; // @todo this is getting circular. Hmmm.
  }

  /**
  * Say 'sentence' to Surly
  * @param  {String}   sentence
  * @param  {Function} callback
  * @return {String}
  */
  talk (sentence, callback) {
    var i,
      start_time = new Date(),
      response;

    this.log.debug('INPUT: ' + sentence);
    this.log2.info(`Input: ${sentence}`);
    this.input_stack.push(sentence);

    if (sentence.length === 0) {
      callback('Input was empty string.', 'Speak up!');
      return;
    }

    if (sentence.substr(0,1) === '/') {
      this.log.debug('Skipping command string.'); // @todo - do stuff
      callback('COMMANDS DO NOTHING YET.', 'No commands for me.');
      return;
    }

    if (this.environment.countCategories() === 0) {
      callback('No AIML files loaded.', 'My mind is blank.');
      return;
    }

    this.aiml.getResponse(sentence, function (err, result) {
      this.handleResult(sentence, result);
      callback(err, result);
    }.bind(this));
  }

  /**
  * Do any extra stuff that needs doing with the results
  */
  handleResult (sentence, response) {
    var normal_previous = this.aiml.normaliseSentence(response).trim();
    this.environment.previous_responses.push(normal_previous);
    this.environment.previous_inputs.push(sentence);
  }
};
