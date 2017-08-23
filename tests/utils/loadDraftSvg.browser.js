// jshint module:true
// jshint browser:true

import getDocument from './getDocument';

// Defines
const DRAFT_SVG_ID = 'draftSvg';

const loadDraftSvg = function () {
  const document = getDocument();
  const draftSvg = document.getElementById(DRAFT_SVG_ID);
  if (draftSvg !== null) {
    return draftSvg;
  } else {
    const msg = 'There must be an svg node with id [' + DRAFT_SVG_ID + '] to make text alignment.';
    throw new Error(msg);
  }
};

export default loadDraftSvg;
