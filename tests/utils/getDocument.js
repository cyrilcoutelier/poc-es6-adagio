// jshint module:true
// jshint browserify:true

import jsdom from 'jsdom';

const getDocument = function() {
  if (process.browser) {
    return window.document;
  } else {
    return jsdom.jsdom();
  }
};

export default getDocument;
