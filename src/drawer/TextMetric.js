// jshint module:true

import svgUtils from "../utils/svgUtils";
import adagioDocument from "../globals/adagioDocument";

const TextMetric = function (draftSvg) {
  this.init(draftSvg);
};

const _textMetric = TextMetric.prototype;

_textMetric.init = function (draftSvg) {
  this.draftSvg = draftSvg;
};

_textMetric.isFromFont = function () {
  return false;
};

_textMetric.getComputedTextLength = function (string, fontFamilies, fontSize, options) {
  const fontFamily = fontFamilies.join(', ');
  const text = this.getText(string, fontFamily, fontSize, options);

  this.draftSvg.appendChild(text);
  const width = text.getComputedTextLength();
  this.draftSvg.removeChild(text);

  return width;
};

_textMetric.getXHeight = function (fontFamilies, fontSize) {
  const fontFamily = fontFamilies.join(', ');
  const text = this.getText('xvw', fontFamily, fontSize);

  this.draftSvg.appendChild(text);
  const bbox = text.getBBox();
  this.draftSvg.removeChild(text);

  const height = bbox.height;
  return height / 2;
};

_textMetric.getText = function (string, fontFamily, fontSize, options) {
  options = options || {};
  const text = svgUtils.createElement('text');
  text.setAttribute('x', 0);
  text.setAttribute('y', 0);
  text.setAttribute('font-family', fontFamily);
  text.setAttribute('font-size', fontSize);

  if (typeof options['text-transform'] !== 'undefined') {
    text.style['text-transform'] = options['text-transform'];
  }
  if (typeof options['letter-spacing'] !== 'undefined') {
    text.style['letter-spacing'] = options['letter-spacing'];
  }
  if (typeof options['font-weight'] !== 'undefined') {
    text.style['font-weight'] = options['font-weight'];
  }
  if (typeof options['font-style'] !== 'undefined') {
    text.style['font-style'] = options['font-style'];
  }

  const document = adagioDocument.getDocument();
  text.appendChild(document.createTextNode(string));
  return text;
};

export default TextMetric;
