// jshint module:true

import TextMetric from "./TextMetric";

const CachedTextMetric = function (draftSvg) {
  this.init(draftSvg);
};

const _cachedTextMetric = CachedTextMetric.prototype;

_cachedTextMetric.init = function (draftSvg) {
  this.textMetric = new TextMetric(draftSvg);
  this.lengthCache = {};
  this.xHeightCache = {};
};

_cachedTextMetric.isFromFont = function () {
  return false;
};

_cachedTextMetric.getComputedTextLength = function (string, fontFamilies, fontSize, options) {
  options = options || {};
  const key = createLengthKey(string, fontFamilies, fontSize, options);
  if (typeof this.lengthCache[key] === 'undefined') {
    this.computeTextLength(key, string, fontFamilies, fontSize, options);
  }
  return this.lengthCache[key];
};

_cachedTextMetric.computeTextLength = function (key, string, fontFamilies, fontSize, options) {
  const length = this.textMetric.getComputedTextLength(string, fontFamilies, fontSize, options);
  this.lengthCache[key] = length;
};

const createLengthKey = function (string, fontFamilies, fontSize, options) {
  const key = JSON.stringify({
    string: string,
    fontFamilies: fontFamilies,
    fontSize: fontSize,
    options: options
  });
  return key;
};

_cachedTextMetric.getXHeight = function (fontFamilies, fontSize) {
  const key = createLengthKey(fontFamilies, fontSize);
  if (typeof this.xHeightCache[key] === 'undefined') {
    this.computeTextXHeight(key, fontFamilies, fontSize);
  }
  return this.xHeightCache[key];
};

_cachedTextMetric.computeTextXHeight = function (key, fontFamilies, fontSize) {
  const xHeight = this.textMetric.getXHeight(fontFamilies, fontSize);
  this.xHeightCache[key] = xHeight;
};

export default CachedTextMetric;
