/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCorrectDocument = getCorrectDocument;
exports.getCurrentScrollY = getCurrentScrollY;
exports.hasClass = hasClass;
exports.appendStyleSheet = appendStyleSheet;
exports.clickTracker = clickTracker;
exports.createPixel = createPixel;
exports.clickTrackerCrossDomain = clickTrackerCrossDomain;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.rubiconExpanderSetup = rubiconExpanderSetup;
exports.getScaleRatio = getScaleRatio;
exports.createIframe = createIframe;
exports.styleIframe = styleIframe;
exports.fixedStyleWall = fixedStyleWall;
exports.checkScroll = checkScroll;
exports.calculateBackgroundSize = calculateBackgroundSize;
exports.adjustRatio = adjustRatio;
exports.adjustSize = adjustSize;
exports.createContainer = createContainer;

/**
 * @constructor
 */

/**
 * @function getCorrectDocument
 * @param {string} the div containing the element marker
 * @summary return the current document
 * @returns {object} document
 */
function getCorrectDocument(rp_elementMarker) {
  if (typeof rp_elementMarker !== "undefined") {
    if (document.querySelector(rp_elementMarker)) {
      return window.document;
    } else if (parent.window.document.querySelector(rp_elementMarker)) {
      return parent.window.document;
    } else {
      console.error("RP:Could not access the parent window. Possibly due to cross domain iframe"); // eslint-disable-line 
    }
  } else {
    console.error("RP: No element marker defined"); // eslint-disable-line
  }
}
/**
 * @function getCurrentScrollY
 * @param {string} the document of the element marker
 * @summary return the current scroll position
 * @returns {object} scroll
 */


function getCurrentScrollY(_document) {
  var currentScrollY;

  if (!window.scrollY) {
    // for older IE support
    currentScrollY = _document.scrollTop;
  } else {
    // everyone else
    currentScrollY = window.scrollY;
  }

  return currentScrollY;
}

function hasClass(str, elem) {
  var classStrings = elem.className.split(" ");

  var checkClass = function checkClass(array, matchString) {
    for (var i = 0, l = array.length; i < l; i++) {
      if (array[i] === matchString) {
        return true;
      }
    }
  };

  if (checkClass(classStrings, str)) {
    return true;
  } else {
    return false;
  }
}

function appendStyleSheet(_document, custom_style_page) {
  var customStyleSheet = _document.createElement("style");

  customStyleSheet.id = "rp-skin-styles";
  customStyleSheet.innerHTML = "body{overflow-x: hidden !important;}" + custom_style_page;

  _document.querySelector("body").appendChild(customStyleSheet);
}

function clickTracker(_document, clickUrl, creativeID, containerID, clickOk) {
  var oFrame = document.getElementById(creativeID);

  oFrame.contentWindow.document.onclick = function () {
    if (clickOk == true) {
      console.log("clickAlready"); // eslint-disable-line

      return;
    }

    createPixel(_document, clickUrl, containerID);
    clickOk = true;
  };
}

function createPixel(_document, clickUrl, containerID) {
  var clickTracker = _document.createElement("img");

  clickTracker.id = "testTracker";
  clickTracker.src = clickUrl;

  _document.getElementById(containerID).appendChild(clickTracker);
}

function clickTrackerCrossDomain(e, _document, clickUrl, containerID, clickOk, _this) {
  if (e.data.message !== "click") {
    return;
  }

  if (_this.clickOk == true) {
    console.log("clickAlready"); // eslint-disable-line

    return;
  }

  createPixel(_document, clickUrl, containerID);
  _this.clickOk = true;
}

function addClass(str, elem) {
  if (hasClass(str, elem)) {
    return false;
  } else {
    var pad = elem.className.length > 0 ? " " : "";
    elem.className += pad + str;
    return true;
  }
}

function removeClass(str, elem) {
  if (hasClass(str, elem)) {
    var a = elem.className.split(" ");
    a.splice(a.indexOf(str), 1);
    elem.className = a.join(" ");
    return true;
  } else {
    return false;
  }
}

function rubiconExpanderSetup(_document, header_height, rp_insertionMarker) {
  var rubiconExpander = _document.createElement("div");

  rubiconExpander.id = "rubiconExpander";
  rubiconExpander.className += "rubicon-expander";
  rp_insertionMarker.parentNode.insertBefore(rubiconExpander, rp_insertionMarker); //expenderT.insertBefore(rubiconExpander, expenderT.firstChild);

  rubiconExpander.style.height = header_height + "px";
  return rubiconExpander;
}

function getScaleRatio(creativeWidth) {
  return window.innerWidth / parseInt(creativeWidth); // 1000 is the standard content width
}

function createIframe(_document, creativeID, containerID, ratio, custom_style_iframe, iframe_url, autoRatio, contentWidth, rubiconExpander, creativeWidth) {
  var styles = styleIframe(ratio, rubiconExpander, contentWidth, custom_style_iframe, autoRatio, creativeWidth);

  var creativeFrame = _document.createElement("iframe");

  creativeFrame.setAttribute("scrolling", "no");
  creativeFrame.setAttribute("frameborder", 0);
  creativeFrame.setAttribute("style", styles);
  creativeFrame.id = creativeID;

  _document.getElementById(containerID).appendChild(creativeFrame);

  var contentDocument = creativeFrame.contentWindow ? creativeFrame.contentWindow.document : creativeFrame.contentDocument.document;

  if (typeof iframe_url != "undefined") {
    creativeFrame.src = iframe_url;
  } else {
    contentDocument.open();
    contentDocument.write("<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'><html><head><base target='_top' /><script>inDapIF=true;</script><script type='text/javascript'> test = function(e) { if (e.data.message !== 'render'){ return; } document.write(e.data.html); }; window.addEventListener('message', test, false); </script></head><body></body></html>");
    contentDocument.close();
  }

  return creativeFrame;
}

function styleIframe(ratio, rubiconExpander, contentWidth, custom_style_iframe, autoRatio, creativeWidth) {
  var stylesA;
  var ratioCrea = creativeWidth / 1800;

  if (typeof ratio === "undefined") {
    var centerTransition = (window.innerWidth - 1800 * ratioCrea) / 2;
    stylesA = "left: " + centerTransition + "px !important;";
  } else if (autoRatio == true) {
    var ratioA = contentWidth * ratio / 1000 / ratioCrea;
    var centerTransition2 = (window.innerWidth - 1800 * ratioCrea * ratioA) / 2;
    stylesA = "transform-origin: 0 0; transform: scale(" + ratioA + ");left: " + centerTransition2 + "px !important;";
    rubiconExpander.style.height = parseInt(rubiconExpander.style.height) * ratioA * ratioCrea + "px";
  } else {
    stylesA = "transform-origin: 0 0; transform: scale(" + ratio + ");";
    rubiconExpander.style.height = parseInt(rubiconExpander.style.height) * ratio * ratioCrea + "px";
  }

  var styles = ["width: " + creativeWidth + "px !important;", "height: 1000px !important;", "z-index: 1;", "margin: auto;", "position: absolute;", "background-color: transparent;", "display:block;", "img{width:100%};", stylesA, custom_style_iframe].join("");
  return styles;
}

function fixedStyleWall(_document) {
  var fixedStyleWall = ".rp-bg-fixed { " + "position: fixed !important; " + "top: 0px !important; " + "}" + ".rp-bg-scroll { " + "position: inherit !important;" + "}";

  var _style = _document.createElement("style");

  _style.setAttribute("type", "text/css");

  _style.setAttribute("id", "rubiconclientcss");

  _style.textContent = fixedStyleWall;
  document.getElementsByTagName("head")[0].appendChild(_style);
}

function checkScroll(_document, _targetScroll, containerID) {
  var _y = getCurrentScrollY(_document);

  if (_y > _targetScroll) {
    addClass("rp-bg-fixed", _document.getElementById(containerID));
    removeClass("rp-bg-scroll", _document.getElementById(containerID));
  } else {
    addClass("rp-bg-scroll", _document.getElementById(containerID));
    removeClass("rp-bg-fixed", _document.getElementById(containerID));
  }
}

function calculateBackgroundSize(creativeWidth) {
  var ratio = getScaleRatio(creativeWidth); //rubiconExpander.style.height = (parseInt(rubiconExpander.style.height) * ratio) + "px";
  // rubiconExpander.style.height = (parseInt(rubiconExpander.style.height) * 1.56) + "px";

  return ratio;
}

function adjustRatio(_document, ratio, rp_insertionMarker) {
  var styleMarker = rp_insertionMarker.getAttribute("style");
  var stylesRatio = ["transform: scale(" + ratio + ");", "transform-origin: center 0;", "position: relative;", "z-index: 1000;", "margin-bottom: -" + (1 - ratio) * rp_insertionMarker.clientHeight + "px;", "overflow: auto;", styleMarker].join("");
  rp_insertionMarker.setAttribute("style", stylesRatio);
}

function adjustSize(_document, rp_insertionMarker, creativeWidth) {
  var styleMarker = rp_insertionMarker.getAttribute("style");
  var maxWidth = 1000 * (creativeWidth / 1800);
  var stylesSize = ["max-width: " + maxWidth + "px;", "margin: auto;", "position: relative;", "z-index: 1000;", styleMarker].join("");
  rp_insertionMarker.setAttribute("style", stylesSize);
}

function createContainer(_document, containerID, rubiconExpander, custom_style_iframe) {
  var skinContainer = _document.createElement("div");

  skinContainer.id = containerID;

  if (typeof rubiconExpander != "undefined") {
    rubiconExpander.parentNode.insertBefore(skinContainer, rubiconExpander);
  } else {
    console.error("RP: No element marker defined"); // eslint-disable-line

    return;
  }

  var styles2 = ["z-index: 1000;", "top: 0;", "margin: 0;", custom_style_iframe].join("");
  skinContainer.setAttribute("style", styles2);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = _interopRequireWildcard(__webpack_require__(0));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var rubiskin = function rubiskin() {
  var self = this;

  var _document, rp_insertionMarker, _targetScroll;

  var containerID = "rp-skin-container-sandbox";
  var creativeID = "rp-skin-creative";
  /**
   * @function renderAd
   * @param {object} data
   * @summary processes the bids ad response from prebids calls skins functions
   */

  self.renderAd = function (data) {
    // Assign the correct document context
    _document = lib.getCorrectDocument(data.insertionMarker);
    rp_insertionMarker = _document.querySelector(data.insertionMarker);
    init(data.debug, data.fullBids, rp_insertionMarker, data.insertionType, data.header_height, data.targetScroll, data.custom_style_iframe, data.custom_style_page, data.iframe_url, data.creativeWidth, data.contentWidthMarker, data.click_url, data.maxRatio);
  };
  /**
   * @function init
   * @param {object} data
   * creates an iframe and adds the ad response
   */


  var init = function init(debug, fullBids, rp_insertionMarker, insertionType, header_height, targetScroll, custom_style_iframe, custom_style_page, iframe_url, creativeWidth, contentWidthMarker, clickUrl, maxRatio) {
    var debugUrl, creaTestUrl, debugUrlCrea, slotSkinGoogle;

    try {
      slotSkinGoogle = googletag.pubads().getSlots().find(function (slot) {
        return slot.getSlotElementId() === fullBids.adUnitCode;
      }).getAdUnitPath(); // eslint-disable-line
    } catch (err) {
      slotSkinGoogle = fullBids.adUnitCode;
    }

    _document.querySelector("div[id^='google_ads_iframe_" + slotSkinGoogle + "']").style.display = "none";

    try {
      var urlParams = new URL(_document.location.href).searchParams;
      debugUrl = Boolean(urlParams.get("skinTest"));
      debugUrlCrea = urlParams.get("customCreative");
    } catch (err) {
      console.error("Impossible to read URL params"); // eslint-disable-line
    }

    if (debug == true || debugUrl == true) {
      console.log("MODE DEBUG FOR PREBID SKIN: Please remove in production!"); // eslint-disable-line

      !debugUrlCrea ? creaTestUrl = "https://secure-assets.rubiconproject.com/utils/prebidSkin/ressources/RBSskin.jpg" : creaTestUrl = debugUrlCrea;
      fullBids = {
        "ad": "<html>\n<head><script type='text/javascript'>inDapIF=true;</script></head>\n<body style='margin : 0; padding: 0;'>\n<div id='testSkin'>\n<script type='text/javascript'>document.write(\"<a href= 'https://google.fr' target='_blank'><img width = '1800px' src = '" + creaTestUrl + "'></img></a>\");</script>\n</div>\n</body>\n</html>"
      };
    }

    if (typeof rp_insertionMarker != "undefined") {
      typeof header_height == "undefined" ? header_height = 250 : "";
      var rubiconExpander = lib.rubiconExpanderSetup(_document, header_height, rp_insertionMarker);
      var containerIframe = getContainerIframe(rp_insertionMarker, rubiconExpander, insertionType, custom_style_iframe, iframe_url, creativeWidth, contentWidthMarker, maxRatio);

      containerIframe.onload = function () {
        lib.appendStyleSheet(_document, custom_style_page);
        containerIframe.contentWindow.postMessage({
          message: "render",
          html: fullBids.ad
        }, "*");
        var clickOk = false;

        var _this = this;

        _targetScroll = _document.getElementById(containerID).offsetTop;

        if (typeof iframe_url != "undefined") {
          var clickTracker = function clickTracker(e) {
            lib.clickTrackerCrossDomain(e, _document, clickUrl, containerID, clickOk, _this);
          };

          window.addEventListener("message", clickTracker, false);
        } else {
          var _clickTracker = function _clickTracker() {
            lib.clickTracker(_document, clickUrl, creativeID, containerID, clickOk);
          };

          setTimeout(_clickTracker, 1000);
        }
      };

      lib.fixedStyleWall(_document);

      if (targetScroll == true) {
        var checkScroll = function checkScroll() {
          lib.checkScroll(_document, _targetScroll, containerID);
        };

        if (window.attachEvent) {
          _document.attachEvent("onscroll", checkScroll);
        } else {
          _document.addEventListener("scroll", checkScroll);
        }
      }
    } else {
      console.error("RP: No element marker defined"); // eslint-disable-line
    }
  };
  /**
   * @function getContainerIframe
   * @param {string} containerElement the container div to 
   * @summary creates a div to inject the skin iframe in it 
   * ad into the iframe
   * @returns {object} an iframe 
   */


  var getContainerIframe = function getContainerIframe(rp_insertionMarker, rubiconExpander, insertionType, custom_style_iframe, iframe_url, creativeWidth, contentWidthMarker, maxRatio) {
    lib.createContainer(_document, containerID, rubiconExpander, custom_style_iframe);

    var contentWidth = _document.querySelector(contentWidthMarker).clientWidth;

    typeof creativeWidth == "undefined" ? creativeWidth = 1800 : "";
    var ratio, ratio2, autoRatio;

    if (insertionType == "ratio") {
      ratio = lib.calculateBackgroundSize(creativeWidth);
      ratio2 = (window.innerWidth - ratio * 800 * (creativeWidth / 1800)) / contentWidth;

      if (ratio2 < maxRatio) {
        ratio = maxRatio;
        ratio2 = maxRatio;
        autoRatio = true;
      }

      lib.adjustRatio(_document, ratio2, rp_insertionMarker);
    } else if (insertionType == "resize") {
      lib.adjustSize(_document, rp_insertionMarker, creativeWidth);
    } else {
      console.log("no change made to the page style"); // eslint-disable-line
    }

    var creativeFrame = lib.createIframe(_document, creativeID, containerID, ratio, custom_style_iframe, iframe_url, autoRatio, contentWidth, rubiconExpander, creativeWidth);
    return creativeFrame;
  };
};

window.skinOverlay = new rubiskin();

/***/ })
/******/ ]);