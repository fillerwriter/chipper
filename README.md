Chipper
======

[![CircleCI](https://circleci.com/gh/fillerwriter/chipper.svg?style=svg)](https://circleci.com/gh/fillerwriter/chipper)

A rewrite of Surly2 from [mrchimp](http://github.com/mrchimp/surly2), with a focus on testability.


Requirements
============

- [Node.js](https://nodejs.org/) v 7.9.x or greater


Installation
============

 1. Acquire code
 2. `npm install`
 3. `npm run compile`


Config
======

Config files are found and read by [rc](https://www.npmjs.com/package/rc). Check the "Configuration File Formats" section of the `rc` readme for more instructions. Any flag shown in `node cli.js --help` can be set in the options file.

Usage
=====

1. `node cli.js`
2. Talk to Chipper. Type `exit` to exit.

Thanks
======

* [Richard Wallace](http://www.alicebot.org/bios/richardwallace.html), creator of AIML and AliceBot.
* Noel Bush, author of the well written, if jargon-dense, [AIML v1.0.1 spec](http://www.alicebot.org/TR/2001/WD-aiml/).
* [Jake Gully/mrchimp](https://github.com/mrchimp), for the original surly implementation.
