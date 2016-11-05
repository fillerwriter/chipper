"use strict";

import fs from "fs";
import Promise from "bluebird";

export default function AIMLDirLoader(dir) {
  if (!dir) {
    return FALSE;
  }

  return new Promise(function(resolve, reject) {
    const validExtentions = [
      '.aiml',
      '.map',
      '.set',
      '.substitution',
      '.pdefaults',
      '.properties'
    ];
    fs.readdir(dir, function(err, files) {
      if (err) {
        reject(err);
      } else {
        resolve(files.filter((file) => {
          for (var i = 0; i < validExtentions.length; i++) {
            if (file.indexOf(validExtentions[i]) !== -1) {
              return true;
            }
          }
          return false;
        }));
      }
    });
  });
}
