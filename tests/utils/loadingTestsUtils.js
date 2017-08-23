// jshint module:true

import async from 'async';
import loadFont from './loadFont';

const loadingTestsUtils = {};

loadingTestsUtils.batchLoadFonts = function (fontFileNames, done) {
  loadingTestsUtils.batchLoad(fontFileNames, loadFont, done);
};

loadingTestsUtils.batchLoad = function (resourcesNames, loadResource, done) {
  const resourcesMap = {};

  async.each(resourcesNames, function iterator(resourceName, done) {
    loadResource(resourceName, function (error, font) {
      if (!error) {
        resourcesMap[resourceName] = font;
        done(null);
      } else {
        done(error);
      }
    });
  }, function (error) {
    done(error, resourcesMap);
  });
};

export default loadingTestsUtils;
