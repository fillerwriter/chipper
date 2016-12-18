"use strict";

import libxmljs from "libxmljs";

export default function buildBrain(xmlDoc) {
  console.log("SANITY CHECK");
  let parsed = libxmljs.parseXml(xmlDoc);
  let brain = {};

  let categories = parsed.find('category');

  categories.forEach((item) => {
    let pattern = item.find('pattern')[0].text();
    console.log("found pattern", pattern);
    brain[pattern] = item.find('template')[0].childNodes().reduce(function(a, b) {
      return a + b.toString();
    }, '');
  });

  return brain;
}