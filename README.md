Chipper
======

[![CircleCI](https://circleci.com/gh/fillerwriter/chipper.svg?style=svg)](https://circleci.com/gh/fillerwriter/chipper)

A rewrite of Surly2 from [mrchimp](http://github.com/mrchimp/surly2), with a focus on testability.


Requirements
============

[Node.js](https://nodejs.org/)


Installation
============

 1. Acquire code
 2. `npm install`
 3. `npm run compile`


Config
======

Config files are found and read by [rc](https://www.npmjs.com/package/rc). Check the "Configuration File Formats" section of the `rc` readme for more instructions. Any flag shown in `node cli.js --help` can be set in the options file.

You probably just want to create `~/.surly2rc` and put something like this in it:

    {
        "brain": "/path/to/aiml/files",
        "username": "someXMPPUser@example.com",
        "password": "whatever"
    }


Usage
=====

1. `node cli.js`
2. Talk to Surly. Type `exit` to exit.

Or chat over XMPP

1. Set up a config file (see above) with XMPP details `username`, `password`, `host` and `port`.
2. `node xmpp.js`
3. You can't add contacts yet. You'll have to do that yourself somehow.


Thanks
======

* [Richard Wallace](http://www.alicebot.org/bios/richardwallace.html), creator of AIML and AliceBot.
* Noel Bush, author of the well written, if jargon-dense, [AIML v1.0.1 spec](http://www.alicebot.org/TR/2001/WD-aiml/).
