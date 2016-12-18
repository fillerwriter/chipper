"use strict";

import libxmljs from "libxmljs";
import _ from "lodash";

const aiml = `<?xml version="1.0" encoding="utf-8"?>
<aiml>
	<category>
		<pattern>HELLO</pattern>
		<template>Foo<br />Bar</template>
	</category>
	<category>
	  <pattern>HI</pattern>
	  <template><srai>HELLO</srai></template>
	</category>
</aiml>`;

let aimlTags = {
  'srai': function(input, brain) {
    return processTemplate(input, brain);
  },
  // 'br': function(input, brain) {
  //   return '\n';
  // }
};

let brain = buildBrain(aiml);

console.log("Final", parse("Hello", brain));
console.log("final", parse("Hi", brain));

function buildBrain(xmlDoc) {
  let parsed = libxmljs.parseXml(xmlDoc);
  let brain = {};

  let categories = parsed.find('category');

  categories.forEach((item) => {
    let pattern = item.find('pattern')[0].text();
    brain[pattern] = item.find('template')[0].childNodes().reduce(function(a, b) {
      return a + b.toString();
    }, '');

    console.log(item.find('template')[0].childNodes().length);
  });

  return brain;
}

function parse(input, brain) {
  let processedInput = input.toUpperCase();
  return processTemplate(processedInput, brain);
}

function processTemplate(input, brain) {
  console.log("process template", input);
  let template = libxmljs.parseXml(`<wrapper>${brain[input]}</wrapper>`).childNodes();
  let output = '';

  template.forEach(function(item) {
    if (item.type() == 'element') {
      if (aimlTags[item.name()]) {
        output += aimlTags[item.name()](item.text(), brain);
      } else {
        output += item.toString();
      }
    } else if (item.type() == 'text') {
      output += item.toString();
    }
  });

  console.log("OUTPUT", output);

  return output;
}
