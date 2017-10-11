"use strict";

const expect = require('chai').expect;

import Chipper from '../src/Chipper';

describe('Chipper', function() {
  let bot;

  beforeEach(function() {
    bot = new Chipper();
  });

  it('exists and has methods', function() {
    expect(bot).to.exist;
    expect(bot).to.respondTo('talk');
    expect(bot).to.respondTo('logger');
    expect(bot).to.respondTo('environment');
  });

  it('has sane defaults', function() {

  });

  describe('.talk', function() {
    it('placeholder', function() {
      expect(true).to.exist;
    });
  });

  describe('.logger', function() {
    it('expects there to be a logger when none is defined on initialization.', function() {
      expect(bot.logger()).to.be.a('object');
    });
  });

  describe('.environment', function() {
    it('expects .environment() method to return Environment object.', function() {
      expect(bot.environment()).to.exist;
    });
  });
});
