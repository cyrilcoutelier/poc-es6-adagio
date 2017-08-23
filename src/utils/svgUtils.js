// jshint module:true

import adagioDocument from "../globals/adagioDocument";

const svgUtils = {};

/*
 * We need to specify the namespace in order to create valid svg tags.
 * See : http://stackoverflow.com/questions/8215021/create-svg-tag-with-javascript
 */
svgUtils.createElement = function (tagName) {
  const localDocument = adagioDocument.getDocument();
  const node = localDocument.createElementNS("http://www.w3.org/2000/svg", tagName);
  if (tagName === 'svg') {
    node.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink",
      "http://www.w3.org/1999/xlink");
    node.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns",
      "http://www.w3.org/2000/svg");
  }
  return node;
};

export default svgUtils;
