import * as lib from "./modules/utils.js";

const rubiskin = function () {
    const self = this;

    let _document, rp_insertionMarker, _targetScroll;
    const containerID = "rp-skin-container-sandbox";
    const creativeID = "rp-skin-creative";

    /**
     * @function renderAd
     * @param {object} data
     * @summary processes the bids ad response from prebids calls skins functions
     */
    self.renderAd = (data) => {
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
    const init = (debug, fullBids, rp_insertionMarker, insertionType, header_height, targetScroll, custom_style_iframe, custom_style_page, iframe_url, creativeWidth, contentWidthMarker, clickUrl, maxRatio) => {
        let debugUrl, creaTestUrl, debugUrlCrea, slotSkinGoogle;

        try {
            slotSkinGoogle = googletag.pubads().getSlots().find(slot => slot.getSlotElementId() === fullBids.adUnitCode).getAdUnitPath(); // eslint-disable-line
        } catch(err) { 
            slotSkinGoogle = fullBids.adUnitCode;
        }

        _document.querySelector("div[id^='google_ads_iframe_"+slotSkinGoogle+"']").style.display = "none";
        
        try {
            const urlParams = new URL(_document.location.href).searchParams;
            debugUrl = Boolean(urlParams.get("skinTest"));  
            debugUrlCrea = urlParams.get("customCreative");                 
        } catch(err) { 
            console.error("Impossible to read URL params");  // eslint-disable-line
        }         

        if (debug == true || debugUrl == true ) {
            console.log("MODE DEBUG FOR PREBID SKIN: Please remove in production!"); // eslint-disable-line
            (!debugUrlCrea) ? creaTestUrl = "https://secure-assets.rubiconproject.com/utils/prebidSkin/ressources/RBSskin.jpg" : creaTestUrl = debugUrlCrea;
            fullBids = {"ad":"<html>\n<head><script type='text/javascript'>inDapIF=true;</script></head>\n<body style='margin : 0; padding: 0;'>\n<div id='testSkin'>\n<script type='text/javascript'>document.write(\"<a href= 'https://google.fr' target='_blank'><img width = '1800px' src = '"+creaTestUrl+"'></img></a>\");</script>\n</div>\n</body>\n</html>"};
        }        

        if (typeof rp_insertionMarker != "undefined") {

            (typeof header_height == "undefined")? header_height = 250 : "";

            const rubiconExpander = lib.rubiconExpanderSetup(_document, header_height, rp_insertionMarker);
            const containerIframe = getContainerIframe(rp_insertionMarker, rubiconExpander, insertionType, custom_style_iframe, iframe_url, creativeWidth, contentWidthMarker, maxRatio);

            containerIframe.onload = function() {
            
                lib.appendStyleSheet(_document, custom_style_page);
                containerIframe.contentWindow.postMessage({
                    message: "render",
                    html: fullBids.ad
                }, "*");

                let clickOk = false;
                const _this = this;
                _targetScroll = _document.getElementById(containerID).offsetTop;

                if (typeof iframe_url != "undefined") {
                    const clickTracker = function(e) { lib.clickTrackerCrossDomain(e, _document, clickUrl, containerID, clickOk, _this); };
                    window.addEventListener("message", clickTracker, false);
                } else {                  
                    const clickTracker = function () {lib.clickTracker(_document, clickUrl, creativeID, containerID, clickOk);};
                    setTimeout(clickTracker, 1000);       
                }         
                
            };

            lib.fixedStyleWall(_document);

            if (targetScroll == true){
                const checkScroll = function() { lib.checkScroll(_document, _targetScroll, containerID); };
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
    const getContainerIframe = (rp_insertionMarker, rubiconExpander, insertionType, custom_style_iframe, iframe_url, creativeWidth, contentWidthMarker, maxRatio) => {

        lib.createContainer(_document, containerID, rubiconExpander, custom_style_iframe);
        const contentWidth = _document.querySelector(contentWidthMarker).clientWidth;
        (typeof creativeWidth == "undefined")? creativeWidth = 1800 : "";
        let ratio, ratio2, autoRatio;

        if (insertionType == "ratio") {        
            ratio = lib.calculateBackgroundSize(creativeWidth);
            ratio2 = (window.innerWidth - (ratio * 800 * (creativeWidth / 1800))) / contentWidth;
            if (ratio2 < maxRatio) { 
                ratio = maxRatio; ratio2 = maxRatio; autoRatio = true;  
            }
            lib.adjustRatio(_document, ratio2, rp_insertionMarker);        
        } else if (insertionType == "resize") {
            lib.adjustSize(_document, rp_insertionMarker, creativeWidth);  
        } else {
            console.log("no change made to the page style"); // eslint-disable-line
        }

        const creativeFrame = lib.createIframe(_document, creativeID, containerID, ratio, custom_style_iframe, iframe_url, autoRatio, contentWidth, rubiconExpander, creativeWidth);
        return creativeFrame;
    };
};

window.skinOverlay = new rubiskin();
