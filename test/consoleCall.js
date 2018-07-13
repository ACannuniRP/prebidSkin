var scriptAntoine3 = document.createElement('script');
scriptAntoine3.type = 'text/javascript';
scriptAntoine3.src = 'https://cdn.rawgit.com/AntoineJac/CustomerSamples/25ec1afb/skin.js';
document.head.appendChild(scriptAntoine3);

scriptAntoine3.onload = function() { loadSkin() }

function loadSkin() {
    adUnitsSkin[0].renderer = {
        url: 'https://secure-assets.rubiconproject.com/utils/prebidSkin/prebidSkin.min.js',
        render: function(prebidBid) {
            skinOverlay.renderAd({
                insertionMarker: "#content", // try #page-wrap or body
                contentWidthMarker: "#content",
                insertionType: "ratio",
                maxRatio: 0.9,
                fullBids: prebidBid,
                header_height: "190", // option
                creativeWidth: "1800",  // option 
                targetScroll: true,
                custom_style_page: "#rp-skin-container-sandbox{margin-top:90px}",
                click_url:"https://testAntoine.fr",
                debug: true
            });
        }   
    };


pbjs.que.push(function(){
    pbjs.adserverRequestSent = false
    //pbjs.enableSendAllBids();
    pbjs.addAdUnits(adUnitsSkin);      

    pbjs.requestBids({
        bidsBackHandler: sendAdserverRequest
    });
}); 

}

