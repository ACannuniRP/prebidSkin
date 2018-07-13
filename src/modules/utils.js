/**
 * @constructor
 */

/**
 * @function getCorrectDocument
 * @param {string} the div containing the element marker
 * @summary return the current document
 * @returns {object} document
 */
export function getCorrectDocument (rp_elementMarker) {
    if (typeof rp_elementMarker !== "undefined") {
        if (document.querySelector(rp_elementMarker)) {
            return window.document;
        } else if (parent.window.document.querySelector(rp_elementMarker)) {
            return parent.window.document;
        } else {
            console.error("RP:Could not access the parent window. Possibly due to cross domain iframe");   // eslint-disable-line 
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
 
export function getCurrentScrollY (_document) {
    let currentScrollY;

    if (!window.scrollY) {
        // for older IE support
        currentScrollY = _document.scrollTop;
    } else {
        // everyone else
        currentScrollY = window.scrollY;
    }

    return currentScrollY;

}

export function hasClass (str, elem) {
    const classStrings = elem.className.split(" ");
    
    const checkClass = function(array, matchString) {
        for (let i=0, l=array.length; i<l; i++) {
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

export function appendStyleSheet (_document, custom_style_page) {
    const customStyleSheet = _document.createElement("style");
    customStyleSheet.id = "rp-skin-styles";
    customStyleSheet.innerHTML = "body{overflow-x: hidden !important;}" + custom_style_page;
    _document.querySelector("body").appendChild(customStyleSheet);
}

export function clickTracker(_document, clickUrl, creativeID, containerID, clickOk){
    const oFrame = document.getElementById(creativeID);
    oFrame.contentWindow.document.onclick = function() {
        if (clickOk == true) {
            console.log("clickAlready");  // eslint-disable-line
            return; 
        }
        createPixel(_document, clickUrl, containerID);
        clickOk = true;
    };
}

export function createPixel (_document, clickUrl, containerID) {
    const clickTracker = _document.createElement("img"); 
    clickTracker.id = "testTracker";
    clickTracker.src = clickUrl;
    _document
        .getElementById(containerID)
        .appendChild(clickTracker);
}

export function clickTrackerCrossDomain (e, _document, clickUrl, containerID, clickOk, _this) {                        
    if (e.data.message !== "click") {
        return;
    }
    if (_this.clickOk == true) {
        console.log("clickAlready");  // eslint-disable-line
        return; 
    } 
    createPixel(_document, clickUrl, containerID);
    _this.clickOk = true; 
}

export function addClass (str, elem) {
    if (hasClass(str, elem)) {
        return false;
    } else {
        const pad = elem.className.length > 0 ? " " : "";
        elem.className += (pad + str);
        return true;
    }
}

export function removeClass (str, elem) {
    if (hasClass(str, elem)) {
        const a = elem.className.split(" ");
        a.splice(a.indexOf(str),1);
        elem.className = a.join(" ");
        return true;
    } else {
        return false;
    }
}

export function rubiconExpanderSetup (_document, header_height, rp_insertionMarker) {    
    const rubiconExpander = _document.createElement("div");
    rubiconExpander.id = "rubiconExpander";
    rubiconExpander.className += "rubicon-expander";
    
    rp_insertionMarker.parentNode.insertBefore(rubiconExpander, rp_insertionMarker);
    //expenderT.insertBefore(rubiconExpander, expenderT.firstChild);

    rubiconExpander.style.height = header_height + "px";
    return rubiconExpander;
}

export function getScaleRatio (creativeWidth)  {
    return (window.innerWidth) / parseInt(creativeWidth);
    // 1000 is the standard content width
}

export function createIframe (_document, creativeID, containerID, ratio, custom_style_iframe, iframe_url, autoRatio, contentWidth, rubiconExpander, creativeWidth) {

    const styles = styleIframe (ratio, rubiconExpander, contentWidth, custom_style_iframe, autoRatio, creativeWidth);

    const creativeFrame = _document.createElement("iframe");
    creativeFrame.setAttribute("scrolling", "no");
    creativeFrame.setAttribute("frameborder", 0);
    creativeFrame.setAttribute("style", styles);    
    creativeFrame.id = creativeID;
    _document.getElementById(containerID).appendChild(creativeFrame);
    
    const contentDocument = (creativeFrame.contentWindow) ? creativeFrame.contentWindow.document : creativeFrame.contentDocument.document;

    if (typeof iframe_url != "undefined") {    
        creativeFrame.src = iframe_url;
    } else {     
        contentDocument.open();
        contentDocument.write("<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'><html><head><base target='_top' /><script>inDapIF=true;</script><script type='text/javascript'> test = function(e) { if (e.data.message !== 'render'){ return; } document.write(e.data.html); }; window.addEventListener('message', test, false); </script></head><body></body></html>");
        contentDocument.close();
    }

    return creativeFrame;
}

export function styleIframe (ratio, rubiconExpander, contentWidth, custom_style_iframe, autoRatio, creativeWidth) {
    let stylesA;
    let ratioCrea = creativeWidth / 1800;

    if (typeof ratio === "undefined") {
        const centerTransition = (window.innerWidth - (1800 * ratioCrea )) / 2;
        stylesA = "left: "+centerTransition+"px !important;";
    } else if (autoRatio == true) {
        const ratioA =  ((contentWidth * ratio) / 1000) / ratioCrea;  
        const centerTransition2 = (window.innerWidth - (1800 * ratioCrea * ratioA)) / 2;    
        stylesA = "transform-origin: 0 0; transform: scale("+ratioA+");left: "+centerTransition2+"px !important;";
        rubiconExpander.style.height = (parseInt(rubiconExpander.style.height) * ratioA * ratioCrea) + "px";
    } else {      
        stylesA = "transform-origin: 0 0; transform: scale("+ratio+");"; 
        rubiconExpander.style.height = (parseInt(rubiconExpander.style.height) * ratio * ratioCrea) + "px";
    }

    const styles = [
        "width: "+creativeWidth+"px !important;",
        "height: 1000px !important;",
        "z-index: 1;",
        "margin: auto;",
        "position: absolute;",
        "background-color: transparent;",
        "display:block;",
        "img{width:100%};",
        stylesA,
        custom_style_iframe
    ].join("");

    return styles;
}

export function fixedStyleWall (_document) {

    const fixedStyleWall =
    ".rp-bg-fixed { " +
      "position: fixed !important; " +
      "top: 0px !important; " +
    "}" +
    ".rp-bg-scroll { " +
      "position: inherit !important;" +
    "}";

    const _style = _document.createElement("style");
    _style.setAttribute("type", "text/css");
    _style.setAttribute("id", "rubiconclientcss");
    _style.textContent = fixedStyleWall;
    document.getElementsByTagName("head")[0].appendChild(_style);
}

export function checkScroll(_document, _targetScroll, containerID) {
    const _y = getCurrentScrollY(_document);

    if (_y > _targetScroll) {
        addClass("rp-bg-fixed", _document.getElementById(containerID));
        removeClass("rp-bg-scroll", _document.getElementById(containerID));
    } else {
        addClass("rp-bg-scroll", _document.getElementById(containerID));
        removeClass("rp-bg-fixed", _document.getElementById(containerID));
    }

}

export function calculateBackgroundSize (creativeWidth) {    
    const ratio = getScaleRatio(creativeWidth);
    //rubiconExpander.style.height = (parseInt(rubiconExpander.style.height) * ratio) + "px";
    // rubiconExpander.style.height = (parseInt(rubiconExpander.style.height) * 1.56) + "px";

    return ratio;
}

export function adjustRatio(_document, ratio, rp_insertionMarker) {
    const styleMarker = rp_insertionMarker.getAttribute("style");
    const stylesRatio = [
        "transform: scale("+ratio+");",
        "transform-origin: center 0;",
        "position: relative;",
        "z-index: 1000;",
        "margin-bottom: -"+(1 - ratio) * rp_insertionMarker.clientHeight+"px;",
        "overflow: auto;",
        styleMarker
    ].join("");

    rp_insertionMarker.setAttribute("style", stylesRatio); 
}

export function adjustSize(_document, rp_insertionMarker, creativeWidth) {
    const styleMarker = rp_insertionMarker.getAttribute("style");
    const maxWidth = 1000 * (creativeWidth / 1800);
    const stylesSize = [
        "max-width: "+maxWidth+"px;",
        "margin: auto;",
        "position: relative;",
        "z-index: 1000;",
        styleMarker
    ].join("");

    rp_insertionMarker.setAttribute("style", stylesSize); 
}

export function createContainer(_document, containerID, rubiconExpander, custom_style_iframe) {
    const skinContainer = _document.createElement("div");
    skinContainer.id = containerID;
  
    if (typeof rubiconExpander != "undefined") {
        rubiconExpander.parentNode.insertBefore(skinContainer, rubiconExpander); 
    } else{
        console.error("RP: No element marker defined"); // eslint-disable-line
        return;  
    }
    
    const styles2 = [
        "z-index: 1000;",
        "top: 0;",
        "margin: 0;",
        custom_style_iframe
    ].join("");
    skinContainer.setAttribute("style", styles2);        
}
