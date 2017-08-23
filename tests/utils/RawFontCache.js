// jshint module:true

import loadingTestsUtils from './loadingTestsUtils';
import ResourceCache from './ResourceCache';

const RawFontCache = function () {
  this.init();
};

const _rawFontCache = RawFontCache.prototype;

_rawFontCache.init = function () {
  this.resourceCache = new ResourceCache(loadingTestsUtils.batchLoadFonts);
};

_rawFontCache.getFonts = function (scoreNames, callback) {
  this.resourceCache.getResources(scoreNames, function (err, fonts) {
    const loadedFonts = filterNotNulls(fonts);
    callback(err, loadedFonts);
  });
};

const filterNotNulls = function (src) {
  const dest = {};
  for (const prop in src) {
    const value = src[prop];
    if (value !== null) {
      dest[prop] = value;
    }
  }
  return dest;
};

export default RawFontCache;
