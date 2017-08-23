// jshint module:true

import assert from "assert";
import FretType from "../../../src/values/FretType";

describe('Adagio.values.FretType', function () {
  describe('isValid()', function () {
    it('true', function () {
      // Given
      const value = FretType.FRET0;

      // When
      const result = FretType.isValid(value);

      // Then
      assert.strictEqual(result, true);
    });
    it('true', function () {
      // Given
      const value = 'wrong value';

      // When
      const result = FretType.isValid(value);

      // Then
      assert.strictEqual(result, false);
    });
  });
});
