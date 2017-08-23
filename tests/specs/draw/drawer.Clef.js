// jshint module:true
// jshint browserify:true

// import Clef from "../../../src/drawer/Clef";
import svgUtils from "../../../src/utils/svgUtils";
import adagioDocument from "../../../src/globals/adagioDocument";

import getElem from "../../utils/getElem";
import getDocument from "../../utils/getDocument";


var document = getDocument();
adagioDocument.setDocument(document);

var divNode = null;
var svg = null;

before(function () {
  if (process.browser) {
    divNode = getElem('drawer.Clef');
  }
});

beforeEach(function () {
  svg = svgUtils.createElement('svg');
  if (process.browser) {
    divNode.appendChild(svg);
  }
});

afterEach(function () {
  svg = null;
});

after(function () {
  divNode = null;
  document = null;
});

it('simple test', function () {});
