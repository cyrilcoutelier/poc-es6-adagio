// jshint module:true
// jshint node:true

import fs from "fs";
import resourcesPaths from "./resourcesPaths";

function toArrayBuffer(buffer) {
  const ab = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return ab;
}

const loadFont = function (fontFile, done) {
  const fsPath = __dirname + '/' + resourcesPaths.FONT_FOLDER + '/' + fontFile;
  fs.readFile(fsPath, null, function (readError, buffer) {
    if (readError) {
      console.warn('error while reading the font file [' + fsPath + ']: ' + readError.message + '.');
      done(null, null);
    } else {
      const arrayBuffer = toArrayBuffer(buffer);
      done(null, arrayBuffer);
    }
  });
};

export default loadFont;
