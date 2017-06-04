"use strict";

import ChatSession from "./ChatSession";
import bunyan from "bunyan";

function Chipper(options) {
  this.foo = 'bar';
  // this.talk = 'fail';
}

Chipper.prototype.talk = function() {

};

Chipper.prototype.logger = function() {

};

export default Chipper;
