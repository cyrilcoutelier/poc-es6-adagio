// jshint module:true

import assert from "assert";
import FretType from "../../../src/values/FretType";

describe('Adagio.values.FretType', function() {
  describe('isValid()', function() {
    it('true', function() {
      // Given
      var value = FretType.FRET0;

      // When
      var result = FretType.isValid(value);

      // Then
      assert.strictEqual(result, true);
    });
    it('true', function() {
      // Given
      var value = 'wrong value';

      // When
      var result = FretType.isValid(value);

      // Then
      assert.strictEqual(result, false);
    });
  });
});
