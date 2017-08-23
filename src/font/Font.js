// jshint module:true

// Defines
const DEFAULT_KERNING = true;
const X_HEIGHT_REF = 'xyvw';

/**
 * @constructor
 * @param {opentype.Font} font
 */
const Font = function (font) {
  this.init(font);
};

const _font = Font.prototype;

_font.init = function (font) {
  this.font = font;
  this.xHeight = null;
};

_font.getComputedTextLength = function (string, fontSize, options) {
  options = options || {};
  const kerning = options.kerning === undefined ? DEFAULT_KERNING : options.kerning;
  const fontScale = this.getFontScale(fontSize);
  const letterSpacing = options['letter-spacing'] === undefined ? 0 : options['letter-spacing'];

  const glyphes = this.font.stringToGlyphs(string);
  const nbGlyphs = glyphes.length;
  let width = 0;

  glyphes.forEach(function (glyph, glyphIdx, glyphes) {
    const isLast = glyphIdx === nbGlyphs - 1;
    width += glyph.advanceWidth;
    if (!isLast && kerning) {
      const nextGlyph = glyphes[glyphIdx + 1];
      const kerningValue = this.font.getKerningValue(glyph, nextGlyph);
      width += kerningValue;
    }
  }, this);

  const spacingSize = nbGlyphs > 0 ? (nbGlyphs - 1) * letterSpacing : 0;
  return width * fontScale + spacingSize;
};

/**
 * see src/tables in [opentype.js]{@link https://github.com/nodebox/opentype.js}
 */
_font.getXHeight = function (fontSize) {
  if (this.xHeight === null) {
    this.xHeight = 0;
    for (let i = 0; i < X_HEIGHT_REF.length; i++) {
      const glyph = this.font.charToGlyph(X_HEIGHT_REF.charAt(i));
      if (glyph !== null) {
        this.xheight = glyph.getMetrics().yMax;
        break;
      }
    }
  }
  const fontScale = this.getFontScale(fontSize);
  return this.xheight * fontScale;
};

_font.getFontScale = function (fontSize) {
  return 1 / this.font.unitsPerEm * fontSize;
};

export default Font;
