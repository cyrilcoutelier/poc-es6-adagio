// jshint module:true
// jshint browserify:true

import assert from "assert";

import textMetricProvider from "../../utils/textMetricProvider";

import CachedTextMetric from "../../../src/drawer/CachedTextMetric";
import FontCache from "../../../src/font/FontCache";

describe('TextMetric', function () {
  describe('default', function () {
    let defaultTextMetric;

    before(function (done) {
      textMetricProvider.get(function (err, result) {
        if (err) {
          done(err);
        } else {
          defaultTextMetric = result;
          done();
        }
      });
    });

    after(function () {
      defaultTextMetric = null;
    });

    it('basic', function () {
      if (process.browser) {
        assert.ok(defaultTextMetric instanceof CachedTextMetric);
      } else {
        assert.ok(defaultTextMetric instanceof FontCache);
      }
    });

  });

  describe('opentype', function () {
    let opentypeTextMetric;

    before(function (done) {
      textMetricProvider.getWithFont(function (err, result) {
        if (err) {
          done(err);
        } else {
          opentypeTextMetric = result;
          done();
        }
      });
    });

    after(function () {
      opentypeTextMetric = null;
    });

    it('getXHeight', function () {
      // Given
      const fontFamilies = ['Roboto'];
      const fontSize = 10;
      const options = {};

      // When
      const actual = opentypeTextMetric.getXHeight(fontFamilies, fontSize, options);

      // Then
      assert.strictEqual(typeof actual, 'number');
      assert.strictEqual(isNaN(actual), false);
    });

    it('getComputedTextLength', function () {
      // Given
      const string = 'Some Text To Measure';
      const fontFamilies = ['Roboto'];
      const fontSize = 10;
      const options = {};

      // When
      const actual = opentypeTextMetric.getComputedTextLength(string, fontFamilies, fontSize, options);

      // Then
      assert.strictEqual(typeof actual, 'number');
      assert.strictEqual(isNaN(actual), false);
    });

  });

  if (process.browser) {
    describe('DOM', function () {
      let domTextMetric;

      before(function (done) {
        textMetricProvider.getWithSvgDraft(function (err, result) {
          if (err) {
            done(err);
          } else {
            domTextMetric = result;
            done();
          }
        });
      });

      after(function () {
        domTextMetric = null;
      });

      it('getXHeight', function () {
        // Given
        const fontFamilies = ['Roboto'];
        const fontSize = 10;
        const options = {};

        // When
        const actual = domTextMetric.getXHeight(fontFamilies, fontSize, options);

        // Then
        assert.strictEqual(typeof actual, 'number');
        assert.strictEqual(isNaN(actual), false);
      });

      it('getComputedTextLength', function () {
        // Given
        const string = 'Some Text To Measure';
        const fontFamilies = ['Roboto'];
        const fontSize = 10;
        const options = {};

        // When
        const actual = domTextMetric.getComputedTextLength(string, fontFamilies, fontSize, options);

        // Then
        assert.strictEqual(typeof actual, 'number');
        assert.strictEqual(isNaN(actual), false);
      });

    });
  }
});
