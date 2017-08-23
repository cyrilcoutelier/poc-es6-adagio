// jshint module:true
// jshint devel:true

import opentype from 'opentype.js';

import RawFontCache from './RawFontCache';

import typeUtils from "../../src/utils/typeUtils";
import FontList from "../../src/font/FontList";

const FONT_FILES = [
  'Roboto-Regular.ttf',
  'Georgia-Regular.ttf',
  'Raleway-Regular.ttf',
  'Raleway-Bold.ttf',
  'OpenSans-Regular.ttf',
  'Bookman-Medium.otf',
  'ClarendonLTStd.otf',
  'ClarendonLTStd-Bold.otf',
  'ClarendonLTStd-Light.otf',
  'FlatTextEngraving.ttf',
  'Georgia-Italic.ttf'
];

/**
 * @type {FontList}
 */
let fontList = null;

const globalFontList = {};

globalFontList.get = function (callback) {
  if (fontList !== null) {
    callback(null, fontList);
  } else {
    load(callback);
  }
};

const load = function (callback) {
  const rawFontCache = new RawFontCache();
  rawFontCache.getFonts(FONT_FILES, function (err, rawFonts) {
    if (err) {
      callback(err);
    }
    const fonts = parseFonts(rawFonts);
    if (typeUtils.isObjectEmpty(fonts)) {
      const msg = 'There must be at least one font loaded.';
      err = new Error(msg);
      callback(err);
    } else {
      fontList = new FontList(fonts);
      callback(null, fontList);
    }
  });
};

const parseFonts = function (rawFonts) {
  const fonts = {};

  for (const fontFileName in rawFonts) {
    const rawFont = rawFonts[fontFileName];
    const font = opentype.parse(rawFont);
    const fontFamily = font.names.fontFamily.en;

    if (typeof fonts[fontFamily] === 'undefined') {
      fonts[fontFamily] = {};
    }
    const fontStyle = font.names.fontSubfamily.en;
    if (typeof fonts[fontFamily][fontStyle] === 'undefined') {
      fonts[fontFamily][fontStyle] = font;
    } else {
      const msg = 'there is already a font loaded for the font family [' +
        fontFamily + '][' + fontStyle + '].';
      console.warn(msg);
    }
  }

  return fonts;
};

export default globalFontList;
