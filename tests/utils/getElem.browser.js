// jshint module:true

import getDocument from './getDocument';

const getElem = function (divId) {
  const document = getDocument();
  return document.getElementById(divId);
};

export default getElem;
