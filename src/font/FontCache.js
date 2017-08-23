// jshint module:true
// jshint devel: true

import Font from "./Font";

const FontCache = function (fontList) {
  this.init(fontList);
};

const _fontCache = FontCache.prototype;

_fontCache.init = function (fontList) {
  this.fontList = fontList;
  this.fonts = {};
};

_fontCache.isFromFont = function () {
  return true;
};

_fontCache.getXHeight = function (fontFamilies, fontSize, options) {
  const font = this.getFont(fontFamilies, options);
  return font.getXHeight(fontSize);
};

_fontCache.getComputedTextLength = function (string, fontFamilies, fontSize, options) {
  const font = this.getFont(fontFamilies, options);
  return font.getComputedTextLength(string, fontSize, options);
};

_fontCache.getFont = function (fontFamilies, options) {
  const fontRefs = fontFamilies.map(function (fontFamily) {
    return getFontRef(fontFamily, options);
  });
  const fontRef = this.fontList.getAvailableFontRef(fontRefs);
  if (!this.hasFont(fontRef)) {

    if (!fontRefs.find(fontPredicate, fontRef)) {
      const msg = 'None of these font is loaded: ' + fontFamilies.join(', ') +
        '. Fall back to the font family [' + fontRef.family + '].';
      console.warn(msg);
    }
    this.cacheFont(fontRef);
  }
  return this.fonts[fontRef.family][fontRef.style];
};

const fontPredicate = function (fontRef) {
  const searchedRef = this;
  return fontRef.family === searchedRef.family &&
    fontRef.style === searchedRef.style;
};

_fontCache.hasFont = function (fontRef) {
  return typeof this.fonts[fontRef.family] !== 'undefined' &&
    typeof this.fonts[fontRef.family][fontRef.style] !== 'undefined';
};

_fontCache.cacheFont = function (fontRef) {
  const fontSrc = this.fontList.getFont(fontRef);
  const font = new Font(fontSrc);
  if (typeof this.fonts[fontRef.family] === 'undefined') {
    this.fonts[fontRef.family] = {};
  }
  this.fonts[fontRef.family][fontRef.style] = font;
};

const getFontRef = function (fontFamily, options) {
  options = options || {};
  let style = 'Regular';
  if (options['font-weight'] === 'bold') {
    style = 'Bold';
  }
  if (options['font-style'] === 'italic') {
    style = 'Italic';
  }
  const fontRef = {
    family: fontFamily,
    style: style
  };
  return fontRef;
};

export default FontCache;
