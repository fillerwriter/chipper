"use strict";

const expect = require('chai').expect;

import ChatSession from '../src/ChatSession';

describe('ChatSession', function() {
  let session;
  beforeEach(function() {
    session = new ChatSession();
  });

  it("expects a session to have a session id", function() {
    expect(session.sessionID).to.be.truthy;
  });
});