// jshint module:true

let localDocument = null;

const adagioDocument = {};

adagioDocument.setDocument = function(newDocument) {
  localDocument = newDocument;
};

adagioDocument.getDocument = function() {
  return localDocument;
};

export default adagioDocument;
