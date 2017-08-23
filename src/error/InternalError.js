// jshint module:true

/**
 * An generic internal exception. For example:
 *
 *    throw new Adagio.Error.InternalError('MyInternalError', 'Message');
 *
 * @param {string} code The exception code.
 * @param {string} message The exception message.
 */
const InternalError = function (code, message) {
  if (typeof message !== 'string') {
    message = code;
  }
  const tmp = Error.call(this, message);

  this.name = tmp.name = 'InternalError';
  this.stack = tmp.stack;
  this.message = tmp.message;

  this.code = code;

  return this;
};

InternalError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: InternalError
  }
});

InternalError.toString = function () {
  return '[' + this.code + '] ' + this.message;
};


export default InternalError;
