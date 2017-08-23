// jshint module:true
// jshint browserify:true

import getDocument from './getDocument';

const getElem = function(divId) {
  const document = getDocument();
  if (process.browser) {
    return document.getElementById(divId);
  } else {
    throw new Error('Should not be called on node');
  }
};

export default getElem;
