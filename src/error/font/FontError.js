// jshint module:true

const FontError = function (message, code) {
  const tmp = Error.call(this, message);

  this.name = tmp.name = 'FontError';
  this.stack = tmp.stack;
  this.message = tmp.message;

  if (typeof code !== 'undefined') {
    this.code = code;
  }

  return this;
};

FontError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: FontError
  }
});

export default FontError;
