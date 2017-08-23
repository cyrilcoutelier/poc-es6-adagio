// jshint module:true

import typeUtils from "../utils/typeUtils";
import FontNotLoadedError from "../error/font/FontNotLoadedError";
import NoFontLoadedError from "../error/font/NoFontLoadedError";
import InternalError from "../error/InternalError";

/**
 * @typedef {family: string, style: number} FontRef
 */

/**
 * @typedef {Object.<string, Object.<string, opentype.Font>>} FontsDic
 *
 * @example
 * const fonts = {
 *   'Roboto': {
 *     'Regular': someFontInstance
 *   }
 * };
 */

/**
 * @constructor
 * Contains the list of raw fonts
 * @param {FontsDic} fonts
 * @param {FontRef} fallbackFontRef
 */
const FontList = function (fonts, fallbackFontRef) {
  this.init(fonts, fallbackFontRef);
};

const _fontList = FontList.prototype;

_fontList.init = function (fonts, fallbackFontRef) {
  if (typeUtils.isObjectEmpty(fonts)) {
    throw new NoFontLoadedError();
  }
  this.fonts = fonts;
  if (typeof fallbackFontRef === 'undefined') {
    this.fallbackFontRef = this.getAnyFontRef();
  } else {
    this.checkHasFont(fallbackFontRef);
    this.fallbackFontRef = fallbackFontRef;
  }
};

_fontList.getAnyFontRef = function () {
  for (const family in this.fonts) {
    const familyFonts = this.fonts[family];
    for (const style in familyFonts) {
      const fontRef = {
        family: family,
        style: style
      };
      return fontRef;
    }
  }
  // at this point this.fonts is not empty
};

_fontList.getFont = function (fontRef) {
  this.checkHasFont(fontRef);
  return this.fonts[fontRef.family][fontRef.style];
};

_fontList.getAvailableFontRef = function (fontRefs) {
  let fontRef = fontRefs.find(this.hasFont, this);
  if (typeof fontRef !== 'undefined') {
    return fontRef;
  }

  fontRef = fontRefs.find(this.hasFontFamily, this);
  if (typeof fontRef !== 'undefined') {
    fontRef = this.getAnyFromFamily(fontRef.family);
    return fontRef;
  }

  return this.fallbackFontRef;
};

_fontList.isFontAvailable = function (fontRefs) {
  return fontRefs.some(this.hasFont, this);
};

_fontList.checkHasFont = function (fontRef) {
  if (!this.hasFont(fontRef)) {
    throw new FontNotLoadedError(fontRef);
  }
};

_fontList.hasFont = function (fontRef) {
  return typeof this.fonts[fontRef.family] !== 'undefined' &&
    typeof this.fonts[fontRef.family][fontRef.style] !== 'undefined';
};

_fontList.hasFontFamily = function (fontRef) {
  return typeof this.fonts[fontRef.family] !== 'undefined';
};

_fontList.getAnyFromFamily = function (fontFamily) {
  const familyFonts = this.fonts[fontFamily];
  if (typeof familyFonts === 'undefined') {
    throw new InternalError('No font family [' + fontFamily + '].');
  }
  for (const fontStyle in familyFonts) {
    const fontRef = {
      family: fontFamily,
      style: fontStyle
    };
    return fontRef;
  }
  throw new InternalError('No style in the font family [' + fontFamily + '].');
};

export default FontList;
