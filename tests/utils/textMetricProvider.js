// jshint module:true
// jshint browserify:true

import globalFontList from './globalFontList';
import loadDraftSvg from './loadDraftSvg';

import CachedTextMetric from '../../src/drawer/CachedTextMetric';
import FontCache from '../../src/font/FontCache';

const textMetricProvider = {};

textMetricProvider.get = function (callback) {
  if (process.browser) {
    textMetricProvider.getWithSvgDraft(callback);
  } else {
    textMetricProvider.getWithFont(callback);
  }
};

textMetricProvider.getWithSvgDraft = function (callback) {
  try {
    const draftSvg = loadDraftSvg();
    const textMetric = new CachedTextMetric(draftSvg);
    callback(null, textMetric);
  } catch (e) {
    callback(e);
  }
};

textMetricProvider.getWithFont = function (callback) {
  globalFontList.get(function (err, fontList) {
    if (err) {
      callback(err);
    } else {
      const fontCache = new FontCache(fontList);
      callback(null, fontCache);
    }
  });
};

export default textMetricProvider;
