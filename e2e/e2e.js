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
    expect(true).to.be.true;
  });
});
