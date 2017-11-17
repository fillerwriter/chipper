"use strict";

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const expect = chai.expect;

import Chipper from '../src/Chipper';

describe('Chipper', function() {
  let bot;

  beforeEach(function() {
    bot = new Chipper({
      aiml: 'e2e/aiml_simple/simple.aiml'
    });
  });

  it('chats', function() {
    let result = bot.talk('hello');

    expect(result).to.eventually.equal('Foo<br/>Bar');
  });

  it('formats text to uppercase', function() {
    let result = bot.talk("Uppercase hello");

    expect(result).to.eventually.equal("Uppercase HELLO");
  });
});
