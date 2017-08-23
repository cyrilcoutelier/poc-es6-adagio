// jshint module:true

import jsdom from 'jsdom';

const getDocument = function () {
  return jsdom.jsdom();
};

export default getDocument;
