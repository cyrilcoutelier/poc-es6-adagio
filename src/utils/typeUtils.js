// jshint module:true

const typeUtils = {};

typeUtils.isObjectEmpty = function (o) {
  // jshint unused:false
  for (const prop in o) {
    return false;
  }
  return true;
};

export default typeUtils;
