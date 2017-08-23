// jshint module:true

import FontError from "./FontError";

const NoFontLoadedError = function () {
  const msg = "There must be at least one font loaded";
  const tmp = FontError.call(this, msg);

  this.name = tmp.name = "NoFontLoadedError";
  this.stack = tmp.stack;
  this.message = tmp.message;

  return this;
};

NoFontLoadedError.prototype = Object.create(FontError.prototype, {
  constructor: {
    value: NoFontLoadedError
  }
});

export default NoFontLoadedError;
