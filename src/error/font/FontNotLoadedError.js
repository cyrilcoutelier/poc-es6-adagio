// jshint module:true

import FontError from "./FontError";

const FontNotLoadedError = function (fontRef) {
  const msg = "The font family [" + fontRef.family + '] with style [' +
    fontRef.style + '] is not loaded.';
  const tmp = FontError.call(this, msg);

  this.name = tmp.name = "FontNotLoadedError";
  this.stack = tmp.stack;
  this.message = tmp.message;

  this.fontRef = fontRef;

  return this;
};

FontNotLoadedError.prototype = Object.create(FontError.prototype, {
  constructor: {
    value: FontNotLoadedError
  }
});

export default FontNotLoadedError;
