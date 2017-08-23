// jshint module:true
// jshint browser:true
// jshint devel:true

import * as $ from 'jquery';
import './jquery-ajax-blob-arraybuffer';

import resourcesPaths from "./resourcesPaths";

const loadFont = function (fontFile, done) {
  // Client-side, use jQuery
  $.ajax({
    url: resourcesPaths.FONT_FOLDER + '/' + fontFile,
    type: 'GET',
    dataType: 'arraybuffer'
  }).done(function (arrayBuffer) {
    done(null, arrayBuffer);
  }).fail(function (jqxhr, textStatus, xhrError) {
    console.warn('error while getting font file [' + fontFile + ']: ' + xhrError + '.');
    done(null, null);
  });
};

export default loadFont;
