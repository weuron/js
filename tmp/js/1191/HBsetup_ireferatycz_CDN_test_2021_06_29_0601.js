
/* 
 * Header bidding from Impression Media {updateCodeAdformProduction}
 * Last update: 29.06.2021  06:01
 * Generated for WebSite: [https://ireferaty.cz] 
 * Custom ticket name: [CDN test]     
 * AdServer:  [adform]       
 * Ticket ID: ... / [1191]
 * User ID: [1]    
 * Last update & Supervision & version of project:
 *     Supervised:  [Weuron s.r.o.]
 *     Version:     [HB_Adf_001]
*/

var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];



pbjs.IMPRESSION_useKeywords = true;
pbjs.IMPRESSION_enableAnalytics = [{ provider: 'ga' , options: { enableDistribution: false}}];
pbjs.WEURON_WindowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
console.log('pbjs.WEURON_WindowWidth: '+pbjs.WEURON_WindowWidth);
pbjs.WEURON_timeout = 4000; // ms
pbjs.WEURON_pathname = location.pathname;
pbjs.WEURON_hbTierCoef = 1.35;
pbjs.WEURON_USDtoCZK = 23;
pbjs.WEURON_HbMin = 5;
var hbConfigOnloadTimeout = 10;
var bidderFloor = { 
    "cpex-tt": 3,
    "criteo-im": 3,
    "adform-im-tt": 3,
    "cpex-nt": 3,
    "adform-im-nt": 3,
    "r2b2": 3,
    "appnexus": 3,
    "PubMatic": 3,
    "Teads": 3
};
var webFloor = 0.00;
var webResponzivitaRange = 'desktop:1200::|tablet:768:1199:|mobil::767:|all:1:10000:';
var webBidders = 'cpex-tt,adform-im-tt,cpex-nt,r2b2,appnexus,PubMatic,criteo-im,adform-im-nt,Teads';    
var placementFloor = { 
    "immobilnibranding": 1.00,
    "squareir": 0.00,
    "topleaderboardvse": 0.00,
};
var bidderAlias = { 
    "cpex-tt": "rubicon",
    "criteo-im": "criteo",
    "adform-im-tt": "adform",
    "cpex-nt": "rubicon",
    "adform-im-nt": "adform",
    "r2b2": "r2b2",
    "appnexus": "appnexus",
    "PubMatic": "pubmatic",
    "Teads": "teads"
};
var tierAlias = { 
    "453516": "adform_mobilnibranding",
    "453521": "adform_square",
    "614447": "adform_squarem",
};
var responzivita = { 
    "im-mobilni_branding": "all",
    "square-ir": "all",
    "top-leaderboard-vse": "all",
};    
pbjs.que.push(function() {
    pbjs.aliasBidder('rubicon', 'cpex-tt');
    pbjs.aliasBidder('criteo', 'criteo-im');
    pbjs.aliasBidder('adform', 'adform-im-tt');
    pbjs.aliasBidder('rubicon', 'cpex-nt');
    pbjs.aliasBidder('adform', 'adform-im-nt');
    pbjs.aliasBidder('r2b2', 'r2b2');
    pbjs.aliasBidder('appnexus', 'appnexus');
    pbjs.aliasBidder('pubmatic', 'PubMatic');
    pbjs.aliasBidder('teads', 'Teads');
});

var zavritReklamuImpressionMedia = "Zav&rcaron;&iacute;t reklamu";
var imHbMbIsMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (imHbMbIsMobile.Android() || imHbMbIsMobile.BlackBerry() || imHbMbIsMobile.iOS() || imHbMbIsMobile.Opera() || imHbMbIsMobile.Windows());
    }
};


function imFindGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
} 

function imFindGetParameterScript(adFormScriptParam, parameterName) {
    var result = null,
        tmp = [];
    if(adFormScriptParam !== null){
        adFormScriptParam
            .substr(0)
            .split("&")
            .forEach(function (item) {
              tmp = item.split("=");
              if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }else{
        return null;   
    }    
}

// Create cookie
function createCookie(name, value, days, second) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    }
    else if(second) {
        var date = new Date();
        date.setTime(date.getTime()+(second*1000));
        expires = "; expires="+date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

// Read cookie
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}

// Erase cookie
function eraseCookie(name) {
    createCookie(name,"",-1);
}


var weuron = weuron||{};
weuron.log = weuron.log||{};



/* Ad MobilniBranding 5.02 capping
 * MobilniBranding is from www.impressionmedia.cz
 * MIT licence viz https://opensource.org/licenses/MIT
 * Mini version 5.02 was released 26.11.2020, Javascript was developed by www.weuron.com 
 * For details of implementatin pleas visit https://drive.google.com/drive/folders/10tmlMgxpxRyj4qIfF0pPeAq9k9w-UvvH?usp=sharing
 */

var selection = top.document.querySelector("#bottomBoxWraperADF100p") !== null;
if (selection) {
   top.document.querySelector("#bottomBoxWraperADF100p").remove();
}

var selection = top.document.querySelector("#AdTrackGenericFixedClassicWrap") !== null;
if (selection) {
    var childR2b2Div = top.document.querySelector("#AdTrackGenericFixedClassicWrap");
    var parentR2b2Div = childR2b2Div.parentNode;
    if (parentR2b2Div.hasAttribute("data-adtrack-container")) {
        parentR2b2Div.remove();
    }
}

var adFormMbIndependentDevice = "all";

if((adFormMbIndependentDevice === "all")||((imHbMbIsMobile.any())&&(adFormMbIndependentDevice === "onlyMobile"))||((!imHbMbIsMobile.any())&&(adFormMbIndependentDevice === "onlyPC"))){ 

//    var imMobBrandScript = document.currentScript.getAttribute("src");
//    var imArrMobBrandScriptParam = imMobBrandScript.split("?");
//    var imMobBrandScriptParam = imArrMobBrandScriptParam[1];
 

    weuron.log.divid = "im-mobilni_branding";
    weuron.log.rezim = "notSet";
    weuron.log.mid = "453516";
    weuron.log.dev = "dev";
    weuron.log.maxHeight = 200;    
    weuron.log.cappingMB = -1;
    weuron.log.forbiddenReloadingAdsInMbCapping = 0;        
    weuron.log.timeout = (1000+0);
    weuron.log.reloadingAds = 50;
    weuron.log.closeMbCapping = 300;         
        
    var selection = top.document.body.getAttribute("data-mobilniBranding-reloadingAds") !== null;
    if (selection) {
        weuron.log.cappingReloadingAdsMB = top.document.body.getAttribute("data-mobilniBranding-reloadingAds");    
    }else{
        weuron.log.cappingReloadingAdsMB = "ready";
        top.document.body.setAttribute("data-mobilniBranding-reloadingAds", "ready");         
    }

    if(imFindGetParameter("im-dev") !== null){
        weuron.log.dev = imFindGetParameter("im-dev");       
    }  
    
    if(imFindGetParameter("im-capping") !== null){
        weuron.log.cappingMB = imFindGetParameter("im-capping");       
    } 
    
    if(imFindGetParameter("im-timeout") !== null){
        weuron.log.timeout = imFindGetParameter("im-timeout");       
    }    
    
//    if(weuron.log.cappingMB !== "notSet"){
//        if(weuron.log.cappingReloadingAdsMB === "ready"){   
//            var imCappingMB = readCookie("imCappingMB");
//            if(weuron.log.dev !== "notSet"){console.log("imCappingMB: "+imCappingMB); } 
//            if(imCappingMB === null){
//                var imCappingStopMB = "NE";
//                createCookie("imCappingMB", "pause-im-mobilniBrandig", false, weuron.log.cappingMB);
//            }else{
//                var imCappingStopMB = "ANO";
//            }
//        }else{
//            var imCappingStopMB = "ANO";    
//        }             
//    }else{
//        var imCappingStopMB = "NE";
//    }    


    if(weuron.log.cappingMB !== "notSet"){
        if(weuron.log.cappingReloadingAdsMB === "ready"){
            var imCappingMB = readCookie("imCappingMB");
            if(weuron.log.dev !== "notSet"){console.log("imCappingMB: "+imCappingMB); } 
            if(imCappingMB == null){
                top.document.body.setAttribute("data-mobilniBrandig-capping", "inactive");            
                var imCappingStopMB = "NE";
                createCookie("imCappingMB", "pause-im-mobilniBrandig", false, weuron.log.cappingMB);
                if(weuron.log.reloadingAds > 0){
                    top.document.body.setAttribute("data-mobilniBrandig-firstCyklusReloading", "firstCyklusReloadingAds");                 
                    if(weuron.log.forbiddenReloadingAdsInMbCapping){ 
                        top.document.body.setAttribute("data-mobilniBranding-reloadingAds", "noReloadingAds");                       
                    }else{
                        createCookie("imAllowReloadingAdsInMbCapping", "pause-im-mobilniBrandig", false, weuron.log.cappingMB);
                    }
                }
            }else{
                top.document.body.setAttribute("data-mobilniBrandig-capping", "active"); 
                if(weuron.log.reloadingAds > 0){
                    var imAllowReloadingAdsInMbCapping = readCookie("imAllowReloadingAdsInMbCapping");
                    if(weuron.log.cappingReloadingAdsMB == "ready"){
                        if(imAllowReloadingAdsInMbCapping != null){
                            var selection = top.document.body.getAttribute("data-mobilniBrandig-firstCyklusReloading") !== null;
                            if (selection) {
                                var imCappingStopMB = "NE";
                                top.document.body.setAttribute("data-mobilniBrandig-firstCyklusReloading", "completed");
                            }else{
                                var imCappingStopMB = "ANO";
                            }
                        }else{
                            var imCappingStopMB = "ANO";
                        }
                    }else{
                        var imCappingStopMB = "ANO";
                    }            
                }else{
                    var imCappingStopMB = "ANO";
                }
            }
        }else{
            var imCappingStopMB = "ANO";    
        }
    }else{
        var imCappingStopMB = "NE";
    }


    if(weuron.log.dev !== "notSet"){
        console.log("imHbMbIsMobile mobilniBranding-capping ready");    
        console.log("imCappingStopMB: "+imCappingStopMB);
    }


    if(imCappingStopMB == "NE"){

        
        
        if(weuron.log.dev !== "notSet"){
            console.log("document.readyState: "+document.readyState + " >> cekej: " + weuron.log.timeout); 
        }

        if(imFindGetParameter("im-mid") !== null){
            weuron.log.mid = imFindGetParameter("im-mid");       
        }

        if(imFindGetParameter("im-divid") !== null){
            weuron.log.divid = imFindGetParameter("im-divid");
            weuron.log.rezim = "urlParametr";        
        }        

        if(weuron.log.divid == "notSet"){
            weuron.log.divid = "im-mobilni_branding";
            weuron.log.rezim = "defaultParametr";         
        }
        top.document.body.setAttribute("data-imMobBrand-divid", weuron.log.divid);
//        top.document.body.setAttribute("data-imMobBrand-rezim", weuron.log.rezim);
        top.document.body.setAttribute("data-imMobBrand-mid", weuron.log.mid);      

        var reklamaImpressionMedia = "Reklama";
        var imDivIdContent = "<span style=\"display:none\">DIV ID notSet</span>";
        if(weuron.log.rezim == "defaultParametr"){
            //script bez parametru >> automaticky vytvori DIV ID "im-mobilni_branding" 
            //s MIDem XY (pokud je nastaven v parametru) 
            //pokud na webu existuje DIV ID "im-mobilni_branding" pouzije ve wraperu jeho obsah
            if(weuron.log.mid !== "notSet"){
                if(weuron.log.dev !== "notSet"){
                    console.log("weuron.log.mid: "+weuron.log.mid);
                }
                imDivIdContent = "<div id=\"im-mobilni_branding\"><span style=\"display:block !important\">MobilniBranding - All will be set according to the HB administration</span></div>";
                var selection = top.document.querySelector("#im-mobilni_branding") !== null;
                if (selection) {
                    top.document.querySelector("#im-mobilni_branding").remove();
                }
            }else{
                var selection = top.document.querySelector("#im-mobilni_branding") !== null;
                if (selection) {
                    imDivIdContent = "<div id=\"im-mobilni_branding\">"+top.document.querySelector("#im-mobilni_branding").innerHTML + "</div>";
                    top.document.querySelector("#im-mobilni_branding").remove();
                }else{
                    imDivIdContent = imDivIdContent + "<span style=\"display:none\">MID notSet</span>";
                    if(weuron.log.dev !== "notSet"){
                        console.log("chyba nastaveni >> defaultParametr with not set mid");
                    }

                }
            }
        }else{
            //nebere zretel na to co je na webu, naopak pokud na webu existuje shodne DIV ID tak jej smaze
            //pouzije pouze promenne z parametru
            if(weuron.log.mid !== "notSet"){
                if(weuron.log.dev !== "notSet"){
                    console.log("weuron.log.mid: "+weuron.log.mid);            
                    console.log("weuron.log.divid: "+weuron.log.divid);
                }

                 var selection = top.document.querySelector("#"+weuron.log.divid) !== null;
                 if (selection) {
                    if(weuron.log.dev !== "notSet"){ 
                        console.log("enable mid >> weuron.log.divid >> innerHTML");
                        console.log(top.document.querySelector("#"+weuron.log.divid).innerHTML); 
                    }
                    var divIdInnerHtml = top.document.querySelector("#"+weuron.log.divid).innerHTML;
                     top.document.querySelector("#"+weuron.log.divid).remove();
                     imDivIdContent = "<div id=\""+weuron.log.divid+"\">"+ divIdInnerHtml + "</div>";

                 }else{
                    //imDivIdContent = "<div id=\""+weuron.log.divid+"\"><script data-adfscript=\"adx.adform.net/adx/?mid="+weuron.log.mid+"\"></script></div>";
                    imDivIdContent = "<div id=\""+weuron.log.divid+"\"></div>";
                    if(weuron.log.dev !== "notSet"){                    
                        console.log("nastaveni noveho DIVID = im-mobilni_branding"); 
                    }
                 }                     
            }else{
                var selection = top.document.querySelector("#"+weuron.log.divid) !== null;
                if (selection) {
                    if(weuron.log.dev !== "notSet"){ 
                        console.log("not enabled mid >> weuron.log.divid >> innerHTML");
                        console.log(top.document.querySelector("#"+weuron.log.divid).innerHTML); 
                    }                                    
                    var divIdInnerHtml = top.document.querySelector("#"+weuron.log.divid).innerHTML;
                     top.document.querySelector("#"+weuron.log.divid).remove();
                     imDivIdContent = "<div id=\""+weuron.log.divid+"\">"+ divIdInnerHtml + "</div>";

                }else{
                    imDivIdContent = imDivIdContent + "<span style=\"display:none\">DIVID = null // MID notSet</span>";
                    if(weuron.log.dev !== "notSet"){                    
                        console.log("chyba nastaveni >> DIVID = null // MID notSet");
                    }    
                }
            }
        }


        var elemDiv = document.createElement("div");
        elemDiv.style.cssText = "display:none;background:rgba(102, 102, 102, 0.8);right:0px;bottom:0px;position:fixed;width:100%;height:auto;z-index:100000000;";
        elemDiv.className = "bottomBoxWraperADF100p";
        elemDiv.id = "bottomBoxWraperADF100p";

        var body = document.body;
        body.insertBefore(elemDiv, body.firstChild);
        if(weuron.log.dev !== "notSet"){        
            console.log("bottomBoxWraperADF100p ready");
        }    
        body.className = body.className + " mobileBranding";
        if(weuron.log.dev !== "notSet"){        
            console.log("mobileBranding to body");
        }

        var mobilniBrandingWrapper = ""
                +"<div style=\"position:relative; height:auto; width:100%\">"
                    +"<div id=\"adfContainerMobil\" style=\"position:relative;border-top:1px solid red;margin:auto;width:1000px;height:auto;overflow:visible;bottom:0px;z-index:100000;right:0px;display:block;pointer-events:auto !important;\"></div>"
//                    +"<div style=\"min-height:15; position:absolute; left:0px; top:-30px; z-index:100001; padding:0px 10px; background:white; color: grey; display:block; font-weight:normal; font-family:arial, sans-serif !important; font-size: 16px !important; text-shadow: none !important; line-height: 30px !important;\">"+reklamaImpressionMedia+"</div>" 
                    +"<div onclick=\"zavriReklamuBottomBoxWraperADF100p()\" style=\"border-top-left-radius:15px;width:auto;min-width:100px;cursor:pointer;min-height:30; position:absolute; right:0px; top:-29px; z-index:100001; padding:0px 10px; background:rgba(0, 0, 0, 0.8);color: rgb(255,255,255); display:block; font-weight:normal; font-family:arial, sans-serif !important; font-size: 12px !important; text-shadow: none !important; line-height: 30px !important;\">"+zavritReklamuImpressionMedia+"</div>"            
                +"</div>";
        document.getElementById("bottomBoxWraperADF100p").innerHTML = mobilniBrandingWrapper;

        var mobilniBranding = "<!-- IM MID from AdForm -->"+imDivIdContent;
        document.getElementById("adfContainerMobil").innerHTML = mobilniBranding;
//        alert("OK mobil device");
        otevriReklamuBottomBoxWraperADF100p(weuron.log.timeout);
                     
//        });Content is disable >> waiting & timeout


    }else{
        var selection = top.document.querySelector("#"+weuron.log.divid) !== null;
        if (selection) {
            top.document.querySelector("#"+weuron.log.divid).remove();
        }
    }
   
   
    var cyklusOtevriReklamuBottomBoxWraperADF100p = 0;
//    var weuronLogTimeout = 100;    
    function otevriReklamuBottomBoxWraperADF100p(weuronLogTimeout){
        setTimeout(function(){
            var selection = document.querySelector("#bottomBoxWraperADF100p iframe") !== null;  
            if (selection) {
                if(weuron.log.dev !== "notSet"){                
                    console.log("Content is enable >> repairs views");
                } 
                
                var ifr = document.querySelector("#bottomBoxWraperADF100p iframe");
                var iframeDoc = ifr.contentDocument || ifr.contentWindow.document;

                // Check if loading is complete
                if (  iframeDoc.readyState  === "complete" ) {
                    if(weuron.log.dev !== "notSet"){                
                        console.log("complete");
                    } 
                    setTimeout(function(){
                        imRozcetnikWraperADF100p(weuronLogTimeout);
                    }, 500);
                }else{
                    if(weuron.log.dev !== "notSet"){                
                        console.log("iframeDoc.readyState: "+iframeDoc.readyState);
                    }                   
                    ifr.onload = function() {
                        if(weuron.log.dev !== "notSet"){                
                            console.log("complete per ifr.onload: "+iframeDoc.readyState);
                        }                        
                        imRozcetnikWraperADF100p(weuronLogTimeout);
                    }                    
                } 

            }else{
                setTimeout(function(){
                    if(weuron.log.dev !== "notSet"){
                        console.log(cyklusOtevriReklamuBottomBoxWraperADF100p + ". Content is disable >> waiting & timeout");
                    }
                    if(cyklusOtevriReklamuBottomBoxWraperADF100p <= 20){
                       cyklusOtevriReklamuBottomBoxWraperADF100p = (cyklusOtevriReklamuBottomBoxWraperADF100p + 1); 
                       otevriReklamuBottomBoxWraperADF100p(weuronLogTimeout); 
                    }else{
                       if(weuron.log.dev !== "notSet"){ 
                           console.log("(21) oko bere");
                       }
                    }
                }, 500);
            }
        }, 100);
    }
    
    function imRozcetnikWraperADF100p(weuronLogTimeout){
        var ifr = document.querySelector("#bottomBoxWraperADF100p iframe");
        var imstr = ifr.contentDocument.body.innerHTML;
        if(weuron.log.dev !== "notSet"){
            console.log("innerHTML: "+imstr);
        }  
        var iframeVerze = 0;
        var imHtmlMbInfo = "";

            //7. Prime kampane z adformu FEED
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=927937
        var tmpStr  = imstr.match(/src=\"https:\/\/www\.alza\.cz\/apps\/externalbanner\.ashx/ig);
        if(tmpStr !== null){
            if(weuron.log.dev !== "notSet"){
                console.log("7. Prime kampane z adformu FEED");
            }
            var ifrFixSizeSetting = "<span style=\"width:500px; height:200px; display:none\" class=\"imFeedSizeSetting\"><span>";
            tmpStr  = ifrFixSizeSetting.match(/(.)*/ig); 
            if(weuron.log.dev !== "notSet"){
                console.log("7. Prime kampane z adformu FEED >> tmpStr:"+tmpStr);
            } 
            imHtmlMbInfo = "7. Prime kampane z adformu FEED";
        }else{
            if(weuron.log.dev !== "notSet"){
                console.log("else 7. Prime kampane z adformu FEED");
            }
        }


        if(tmpStr !== null){
            //OK
        }else{
            //6. AdMaster mobilni branding s kompletnim resenim
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=836731&im-dev                       
            var tmpStr  = imstr.match(/src=\"https:\/\/go\.eu\.bbelements\.com/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("6. AdMaster");
                }
                var selection = top.document.querySelector("#bottomBoxWraperADF100p") !== null;
                if (selection) {
                   top.document.querySelector("#bottomBoxWraperADF100p").remove();
                }
                tmpStr = "jump";
                imHtmlMbInfo = "6. AdMaster mobilni branding s kompletnim resenim (Jump)";
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 6. AdMaster");
                }
            }
        }



        if(tmpStr !== null){
            //OK
        }else{
            //5a. R2B2 passback
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833361                            
            tmpStr  = imstr.match(/\<script type=\"text\/javascript\" src="\/\/trackad\.cz/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("5a. R2B2 passback");
                }
                var selection = top.document.querySelector("#bottomBoxWraperADF100p") !== null;
                if (selection) {
                   top.document.querySelector("#bottomBoxWraperADF100p").style.bottom = "-1000px";
                }
                tmpStr = "jump";
                imHtmlMbInfo = "5a. R2B2 passback (Jump)";
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 5a. R2B2 passback");
                }
            }
        }

        if(tmpStr !== null){
            //OK
        }else{
            //5b. R2B2 passback
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833361                            
            tmpStr  = imstr.match(/\<script src="\/\/trackad\.cz/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("5b. R2B2 passback");
                }
                var selection = top.document.querySelector("#bottomBoxWraperADF100p") !== null;
                if (selection) {
                   top.document.querySelector("#bottomBoxWraperADF100p").style.bottom = "-1000px";
                }
                tmpStr = "jump";
                imHtmlMbInfo = "5b. R2B2 passback (Jump)";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 5b. R2B2 passback");
                }
            }
        }
        
        if(tmpStr !== null){
            //OK
        }else{
            //5c. R2B2 passback
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833361                            
            tmpStr  = imstr.match(/trackad\.cz\/adtrack\.php|delivery\.r2b2\.cz/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("5c. R2B2 passback");
                }
                var selection = top.document.querySelector("#bottomBoxWraperADF100p") !== null;
                if (selection) {
                   top.document.querySelector("#bottomBoxWraperADF100p").style.bottom = "-1000px";
                }
                tmpStr = "jump";
                imHtmlMbInfo = "5c. R2B2 passback (Jump)";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 5c. R2B2 passback");
                }
            }
        }

        if(tmpStr !== null){
            //OK
        }else{
            //4/0. programaticke zdroje z adformu (wrapper)
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833329                            
            tmpStr  = imstr.match(/\<div.style\=\"(.|\s)*\<ins.class\=\"adsbygoogle\"/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("4/0. programaticke zdroje z adformu (wrapper)");
                }
                imHtmlMbInfo = "4/0. programaticke zdroje z adformu (wrapper)";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 4/0. programaticke zdroje z adformu (wrapper)");
                }
            }
        }

        if(tmpStr !== null){
            //OK
        }else{
            //4/1. programaticke zdroje z adformu
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833329                            
            tmpStr  = imstr.match(/adsbygoogle\" style=\"(.)*\" data-ad-client=\"/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("4/1. programaticke zdroje z adformu (1. Google)");
                }
                imHtmlMbInfo = "4/1. programaticke zdroje z adformu";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 4/1. Google");
                }
            }
        }                         

        if(tmpStr !== null){
            //OK
        }else{
            //4/2. programaticke zdroje z adformu
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833329                            
            tmpStr  = imstr.match(/\<ins data-dcm(.)*data-dcm-placement/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("4/2. programaticke zdroje z adformu (2. Google)");
                }
                imHtmlMbInfo = "4/2. programaticke zdroje z adformu";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 4/2. Google");
                }
            }
        }                         

        if(tmpStr !== null){
            //OK
        }else{
            //4/3. programaticke zdroje z adformu
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833329
            tmpStr  = imstr.match(/\<a href=\"(.)*\" target=\"_blank\"\>\<img src=\"(.)*\" width=\"(\d)*\" height=\"(\d)*\" border=\"(\d)*\"\>\<\/a\>/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("4/3. programaticke zdroje z adformu");
                }
                imHtmlMbInfo = "4/3. programaticke zdroje z adformu";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 4/3. AdForm");
                }    
            }
        } 

        if(tmpStr !== null){
            //OK
        }else{
            //4/5. programaticke zdroje z adformu
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833329
            tmpStr  = imstr.match(/href=\"https:\/\/adclick\.g\.doubleclick(.)*\"\>\<img src=\"(.)*" alt="Advertisement" border="(\d)*" width="(\d)*" height="(\d)*"\>\<\/a\>/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("4/5. programaticke zdroje z adformu");
                }
                imHtmlMbInfo = "4/5. programaticke zdroje z adformu";                 
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 4/5. AdForm");
                }
            }
        }                         


        if(tmpStr !== null){
            //OK
        }else{
            //3. Prime kampane z adformu pres 3rd party tag
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=729934&?scriptmobilebrand
            //https://prnt.sc/sk9asu
            tmpStr  = imstr.match(/\<adfm-ad style=\"(.)*<iframe id="adfm-ad/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("3. Prime kampane z adformu pres 3rd party tag");
                }  
                imHtmlMbInfo = "3. Prime kampane z adformu pres 3rd party tag"; 
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 3. AdForm pres 3rd party");
                }
            }
        }


        if(tmpStr !== null){
            //OK
        }else{
            //2. P????m?? kampan?? z adformu HTML5
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=729934&?html5mobilebrand
            //https://prnt.sc/sjtgy2
            tmpStr  = imstr.match(/\<iframe(.)*onload=\"eval\(this\.getAttribute\((.+)data-onload/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("2. Prime kampane z adformu HTML5");
                }
                imHtmlMbInfo = "2. Prime kampane z adformu HTML5";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 2. HTML5");
                }
            }
        }
        

        if(tmpStr !== null){
            //OK
        }else{
            //1a. P????m?? kampan?? z adformu p??es 3rd party tag (scope.register)
            //OK otestovano 10.12.2020
            tmpStr  = imstr.match(/scope.register\(\{(.)*\}\);/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("1a. Prime kampane z adformu pres 3rd party tag (scope.register)");
                }
                imHtmlMbInfo = "1a. Prime kampane z adformu pres 3rd party tag (scope.register)";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 1a. AdForm pres 3rd party (scope.register)");
                }
            }
        }


        if(tmpStr !== null){
            //OK
        }else{
            //1b. P????m?? kampan?? z adformu p??es 3rd party tag (short regex)
            tmpStr  = imstr.match(/\<adfm-ad style\=\"(.)*\"/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("1b. Prime kampane z adformu pres 3rd party tag (short regex)");
                } 
                imHtmlMbInfo = "1b. Prime kampane z adformu pres 3rd party tag (short regex)";                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 1b. AdForm pres 3rd party (short regex)");
                }
            }
        }
        

        if(tmpStr !== null){
            //OK
        }else{
            //1c. unnamed adform regex
            //OK otestovano 10.12.2020            
            tmpStr  = imstr.match(/s1\.adform\.net\/invisible\.gif\" style\=\"(.)*\"/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("1c. unnamed adform regex");
                } 
                imHtmlMbInfo = "1c. unnamed adform regex";                 
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 1c. unnamed adform regex");
                }
            }
        } 
        

        if(tmpStr !== null){
            //OK
        }else{
            //1d. criteo regex (Desktop Strip)
            //OK otestovano 14.12.2020            
            tmpStr  = imstr.match(/criteo\.com\/(.)*\>\<\/iframe\>/ig);
            if(tmpStr !== null){
                if(weuron.log.dev !== "notSet"){
                    console.log("1d. criteo regex (Desktop Strip");
                } 
                imHtmlMbInfo = "1d. criteo regex (Desktop Strip)";                 
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else 1d. criteo regex (Desktop Strip)");
                }
            }
        } 
        

        if(tmpStr !== null){
            //OK
        }else{
            //0. unnamed adform regex
            //default 500x200             
            var ifrDafaultSizeSetting = "<span style='width:500px; height:200px; display:none'><span>";
            tmpStr = ifrDafaultSizeSetting.match(/(.)*/ig);
            imHtmlMbInfo = "!! 0. Problem >> unnamed adform regex ";
            if(weuron.log.dev !== "notSet"){
                console.log("else !! 0. Problem >> 0. unnamed adform regex");
                console.log("set default 500x200");
                console.log("tmpStr^^");                
                console.log(tmpStr);               
            } 
            ifr.style.position = "absolute";
        }
        
        if(weuron.log.dev !== "notSet"){
            console.log("imstr^^");                
            console.log(imstr);                
        }
        
if(weuron.log.dev !== "notSet"){
        var devSelection = document.querySelector("#imHtmlMbInfo") !== null;  
        if (devSelection) {
            function imEncodeHTMLEntities(text) {
              var textArea = document.createElement('textarea');
              textArea.innerText = text;
              return textArea.innerHTML;
            } 
            var imMyJSON = JSON.stringify(tmpStr);
            document.querySelector("#imHtmlMbInfo").innerHTML = "imHtmlMbInfo:<br>" + imHtmlMbInfo;
            document.querySelector("#imHtmlMbInfo").innerHTML = document.querySelector("#imHtmlMbInfo").innerHTML + "<br><br>tmpStr:<br><pre><code>"+imEncodeHTMLEntities(imMyJSON)+"</pre></code>";
            document.querySelector("#imHtmlMbInfo").innerHTML = document.querySelector("#imHtmlMbInfo").innerHTML + "<br><br>imstr:<br> <pre><code>"+imEncodeHTMLEntities(imstr)+"</pre></code>";
        }            
}

        if(weuron.log.dev !== "notSet"){
            console.log("tmpStr: "+tmpStr);
        }
        var ifrHeight = 250;
        if(tmpStr !== null){
            if(weuron.log.dev !== "notSet"){
                console.log("START iftmpStr !== null");
            }                            
            if(tmpStr !== "jump"){
                var ifrWidthString = tmpStr[0].match(/width\:.(\d)*px/ig);
                var ifrHeightString = tmpStr[0].match(/height\:.(\d)*px/ig);
                if(ifrWidthString !== null){
                    //OK
                }else{
                    ifrWidthString = tmpStr[0].match(/width\=\"(\d)*\"/ig);
                    ifrHeightString = tmpStr[0].match(/height\=\"(\d)*\"/ig);
                    if(ifrWidthString !== null){
                        //OK
                    }else{
                        ifrWidthString = tmpStr[0].match(/\"width\"\:(\d)*\,/ig);
                        ifrHeightString = tmpStr[0].match(/\"height\"\:(\d)*\,/ig);
                    }                      
                }

                if((iframeVerze == 6)&&(typeof ifrWidthString === "undefined" || ifrWidthString === null)){

                   var ifrWidth = 320;
                   ifrHeight = 100;
                   ifr.width=320;
                   ifr.height=100;
                   ifr.style.width="320px";
                   ifr.style.height="100px";                                   
                   if(weuron.log.dev !== "notSet"){
                       console.log("STATIC ifrWidth: "+ifrWidth);
                       console.log("STATIC ifrHeight: "+ifrHeight);
                   }

                   var styleNodeAdMaster;
                   var contentStyleTopAdMaster = "#bottomBoxWraperADF100p iframe{width:320px !important; height: 100px !important;";

                   if((styleNodeAdMaster = top.document.createElement("style")).id = "mobilBranding-iframe-AdMaster", styleNodeAdMaster.type = "text/css", window.attachEvent && !window.opera){ 
                       styleNodeAdMaster.styleSheet.cssText = contentStyleTopAdMaster; 
                       if(weuron.log.dev !== "notSet"){
                           console.log("Chrom AdMaster important OK: "+contentStyleTopAdMaster);
                       }
                   }else{
                       var styleTextAdMaster = document.createTextNode(contentStyleTopAdMaster);
                       styleNodeAdMaster.appendChild(styleTextAdMaster)
                   }
                   top.document.getElementsByTagName("head")[0].appendChild(styleNodeAdMaster);  


                }else{
                    if(weuron.log.dev !== "notSet"){
                        console.log("ifrWidth: "+ifrWidthString[0]);
                        console.log("ifrHeight: "+ifrHeightString[0]);
                    }

                    var numbWidth = ifrWidthString[0].match(/\d/g);
                    var ifrWidth = numbWidth.join("");
                    if(weuron.log.dev !== "notSet"){
                        console.log("ifrWidth: "+ifrWidth);
                    }

                    var numbHeight= ifrHeightString[0].match(/\d/g);
                    ifrHeight = numbHeight.join("");
                    if(weuron.log.dev !== "notSet"){
                        console.log("ifrHeight: "+ifrHeight);
                    }   
                }


                var imSirkaBody = window.innerWidth;
                if(weuron.log.dev !== "notSet"){
                    console.log("imSirkaBody: "+imSirkaBody);
                }

                var imZoom = 1;

                if(ifrHeight > weuron.log.maxHeight){

                    if(ifrHeight){
                        imZoom = weuron.log.maxHeight / ifrHeight;
                        if(imSirkaBody > Math.round(ifrWidth*imZoom)){
                        
                            if(weuron.log.dev !== "notSet"){
                                console.log("ifrHeight >> imZoom: "+imZoom);
                                console.log("ifrHeight >> imSirkaBody: "+imSirkaBody);
                            }

                            var styleNode;
                            var contentStyleTop = "#bottomBoxWraperADF100p iframe { -ms-zoom: " + imZoom + "; -ms-transform-origin: 0 0;-moz-transform: scale(" + imZoom + "); -moz-transform-origin: 0px 0px;-o-transform: scale(" + imZoom + "); -o-transform-origin: 0px 0px;-webkit-transform: scale(" + imZoom + "); -webkit-transform-origin: 0 0; }";
                            if((styleNode = top.document.createElement("style")).id = "responsiv-mobilBranding-iframe", styleNode.type = "text/css", window.attachEvent && !window.opera){ 
                                styleNode.styleSheet.cssText = contentStyleTop;
                                if(weuron.log.dev !== "notSet"){
                                    console.log("chrom OK: "+contentStyleTop);
                                }
                            }else{
                                var styleText = document.createTextNode(contentStyleTop);
                                styleNode.appendChild(styleText)
                            }
                            top.document.getElementsByTagName("head")[0].appendChild(styleNode);

                            ifrWidth = Math.round(ifrWidth*imZoom);
                            if(weuron.log.dev !== "notSet"){
                                console.log("Math.round(ifrWidth): "+(ifrWidth));
                            }

                            ifrHeight = Math.round(ifrHeight*imZoom);
                            document.getElementById("bottomBoxWraperADF100p").style.width = "0px";
                            document.getElementById("adfContainerMobil").style.left = "auto";
                            document.getElementById("adfContainerMobil").style.right = ifrWidth+"px";                    
                            document.getElementById("adfContainerMobil").style.height = ifrHeight+"px";
                            
                        }else{
                        
                            if(ifrWidth){
                                if(weuron.log.dev !== "notSet"){
                                    console.log("if(ifrWidth): "+ifrWidth);
                                }
                                if(imSirkaBody<ifrWidth){

                                    imZoom = imSirkaBody / ifrWidth;
                                    if(weuron.log.dev !== "notSet"){
                                        console.log("imZoom: "+imZoom);
                                    }

                                    var styleNode;
                                    var contentStyleTop = "#bottomBoxWraperADF100p iframe { -ms-zoom: " + imZoom + "; -ms-transform-origin: 0 0;-moz-transform: scale(" + imZoom + "); -moz-transform-origin: 0px 0px;-o-transform: scale(" + imZoom + "); -o-transform-origin: 0px 0px;-webkit-transform: scale(" + imZoom + "); -webkit-transform-origin: 0 0; }";
                                    if((styleNode = top.document.createElement("style")).id = "responsiv-mobilBranding-iframe", styleNode.type = "text/css", window.attachEvent && !window.opera){ 
                                        styleNode.styleSheet.cssText = contentStyleTop; 
                                        if(weuron.log.dev !== "notSet"){
                                            console.log("chrom OK: "+contentStyleTop);
                                        }
                                    }else{
                                        var styleText = document.createTextNode(contentStyleTop);
                                        styleNode.appendChild(styleText)
                                    }
                                    top.document.getElementsByTagName("head")[0].appendChild(styleNode);
                                }

                                ifrWidth = Math.round((ifrWidth*imZoom)/2);
                                if(weuron.log.dev !== "notSet"){
                                    console.log("Math.round(ifrWidth): "+(ifrWidth));
                                }

                                ifrHeight = Math.round(ifrHeight*imZoom);

                            }else{
                                if(weuron.log.dev !== "notSet"){
                                    console.log("else(ifrWidth): "+ifrWidth);
                                }
                                var ifrWidth = 0;
                            }

                            document.getElementById("adfContainerMobil").style.left = "-"+ifrWidth+"px";
                            document.getElementById("adfContainerMobil").style.height = ifrHeight+"px";
                            
                        }

                    }else{
                        if(weuron.log.dev !== "notSet"){
                            console.log("else(ifrHeight): "+ifrHeight);
                        }
                        var ifrWidth = 0;
                        document.getElementById("bottomBoxWraperADF100p").style.width = "0px";
                        document.getElementById("adfContainerMobil").style.left = "auto";
                        document.getElementById("adfContainerMobil").style.right = ifrWidth+"px";                    
                        document.getElementById("adfContainerMobil").style.height = ifrHeight+"px";                        
                    }


                    setTimeout(function(){
                        document.getElementById("bottomBoxWraperADF100p").style.display = "block";
                    }, 100); 

                }else{

                    if(ifrWidth){
                        if(weuron.log.dev !== "notSet"){
                            console.log("if(ifrWidth): "+ifrWidth);
                        }
                        if(imSirkaBody<ifrWidth){

                            imZoom = imSirkaBody / ifrWidth;
                            if(weuron.log.dev !== "notSet"){
                                console.log("imZoom: "+imZoom);
                            }

                            var styleNode;
                            var contentStyleTop = "#bottomBoxWraperADF100p iframe { -ms-zoom: " + imZoom + "; -ms-transform-origin: 0 0;-moz-transform: scale(" + imZoom + "); -moz-transform-origin: 0px 0px;-o-transform: scale(" + imZoom + "); -o-transform-origin: 0px 0px;-webkit-transform: scale(" + imZoom + "); -webkit-transform-origin: 0 0; }";
                            if((styleNode = top.document.createElement("style")).id = "responsiv-mobilBranding-iframe", styleNode.type = "text/css", window.attachEvent && !window.opera){ 
                                styleNode.styleSheet.cssText = contentStyleTop; 
                                if(weuron.log.dev !== "notSet"){
                                    console.log("chrom OK: "+contentStyleTop);
                                }
                            }else{
                                var styleText = document.createTextNode(contentStyleTop);
                                styleNode.appendChild(styleText)
                            }
                            top.document.getElementsByTagName("head")[0].appendChild(styleNode);
                        }

                        ifrWidth = Math.round((ifrWidth*imZoom)/2);
                        if(weuron.log.dev !== "notSet"){
                            console.log("Math.round(ifrWidth): "+(ifrWidth));
                        }

                        ifrHeight = Math.round(ifrHeight*imZoom);

                    }else{
                        if(weuron.log.dev !== "notSet"){
                            console.log("else(ifrWidth): "+ifrWidth);
                        }
                        var ifrWidth = 0;
                    }
                    
                    document.getElementById("adfContainerMobil").style.left = "-"+ifrWidth+"px";
                    document.getElementById("adfContainerMobil").style.height = ifrHeight+"px";

                    setTimeout(function(){
                        document.getElementById("bottomBoxWraperADF100p").style.display = "block";
                    }, 100); 

                }


            }
            
            if(tmpStr === "jump"){
                setTimeout(function(){
                    var selection = top.document.querySelector("#AdTrackGenericFixedClassicWrap") !== null;
                    if (selection) {
                        var imAdTGFCW = top.document.querySelector("#AdTrackGenericFixedClassicWrap");
                        var imR2b2TopBox = imAdTGFCW.parentNode;
                        if (imR2b2TopBox.hasAttribute("data-adtrack-container")) {
                            imR2b2TopBox.onclick = function(e){
                                console.log("onclick imR2b2TopBox");
                                zavriReklamuBottomBoxWraperADF100p();
                            }
                        }
                    }
                }, 2000);
            }

        }else{

            //problem
            //zpravidla ad 4. programatick?? zdroje z adformu
            //https://ireferaty.cz/test_hb_7_pure_adform_mobilniBranding.php?im-mid=833329

            var ifrStyleCssText = ifr.style.cssText;
            if(weuron.log.dev !== "notSet"){
                console.log("else tmpStr !== null >> ifr.style.cssText: "+ifrStyleCssText);
            }

            var ifrWidthString = ifrStyleCssText.match(/width\:(.)(\d)*px/ig);
            var ifrHeightString = ifrStyleCssText.match(/height\:(.)(\d)*px/ig);

            var ifrWidth = checkIfrWidthString(ifrWidthString);
            if(weuron.log.dev !== "notSet"){
                console.log("checkIfrWidthString >> ifrWidth: "+ifrWidth);
            }

            if((ifrWidthString !== null)&&(ifrWidth !== 0)){
                //OK
                timeoutOprava(ifrWidthString, ifrHeightString, 0);
            }else{
                setTimeout(function(){
                    if(weuron.log.dev !== "notSet"){
                        console.log("fire waiting 1000");
                    }
                    ifrStyleCssText = ifr.style.cssText;
                    if(weuron.log.dev !== "notSet"){
                        console.log("ifr.style.cssText: "+ifrStyleCssText);
                    }

                    ifrWidthString = ifrStyleCssText.match(/width\:(.)(\d)*px/ig);
                    ifrHeightString = ifrStyleCssText.match(/height\:(.)(\d)*px/ig);

                    ifrWidth = checkIfrWidthString(ifrWidthString);
                    if(weuron.log.dev !== "notSet"){
                        console.log("checkIfrWidthString >> ifrWidth: "+ifrWidth);
                    }

                    if((ifrWidthString !== null)&&(ifrWidth !== 0)){
                        //OK
                        timeoutOprava(ifrWidthString, ifrHeightString, 1000);
                    }else{
                        setTimeout(function(){
                            if(weuron.log.dev !== "notSet"){
                                console.log("fire waiting 1500");
                            }
                            ifrStyleCssText = ifr.style.cssText;
                            if(weuron.log.dev !== "notSet"){
                                console.log("ifr.style.cssText: "+ifrStyleCssText);
                            }

                            ifrWidthString = ifrStyleCssText.match(/width\:(.)(\d)*px/ig);
                            ifrHeightString = ifrStyleCssText.match(/height\:(.)(\d)*px/ig);

                            ifrWidth = checkIfrWidthString(ifrWidthString);
                            if(weuron.log.dev !== "notSet"){
                                console.log("checkIfrWidthString >> ifrWidth: "+ifrWidth);
                            }

                            if((ifrWidthString !== null)&&(ifrWidth !== 0)){
                                //OK
                                timeoutOprava(ifrWidthString, ifrHeightString, 1500);
                            }else{
                                setTimeout(function(){
                                    if(weuron.log.dev !== "notSet"){
                                        console.log("fire waiting 2000");
                                    }
                                    ifrStyleCssText = ifr.style.cssText;
                                    if(weuron.log.dev !== "notSet"){
                                        console.log("ifr.style.cssText: "+ifrStyleCssText);
                                    }

                                    ifrWidthString = ifrStyleCssText.match(/width\:(.)(\d)*px/ig);
                                    ifrHeightString = ifrStyleCssText.match(/height\:(.)(\d)*px/ig);

                                    ifrWidth = checkIfrWidthString(ifrWidthString);
                                    if(weuron.log.dev !== "notSet"){
                                        console.log("checkIfrWidthString >> ifrWidth: "+ifrWidth);
                                    }

                                    if((ifrWidthString !== null)&&(ifrWidth !== 0)){
                                        //OK
                                        timeoutOprava(ifrWidthString, ifrHeightString, 2000);
                                    }else{
                                        if(weuron.log.dev !== "notSet"){
                                            console.log("problem");
                                            console.log(ifr.style.cssText);
                                        }
                                        setTimeout(function(){
                                            if(weuron.log.dev !== "notSet"){
                                                console.log("fire problem");
                                                console.log(ifr.style.cssText);
                                            }
                                            ifr.style.cssText = "width:970px; height:310px; vertical-align: middle;";
                                            ifrStyleCssText = ifr.style.cssText;
                                            if(weuron.log.dev !== "notSet"){
                                                console.log("ifr.style.cssText: "+ifrStyleCssText);
                                            }

                                            ifrWidthString = ifrStyleCssText.match(/width\:(.)(\d)*px/ig);
                                            ifrHeightString = ifrStyleCssText.match(/height\:(.)(\d)*px/ig);

                                            ifrWidth = checkIfrWidthString(ifrWidthString);
                                            if(weuron.log.dev !== "notSet"){
                                                console.log("checkIfrWidthString >> ifrWidth: "+ifrWidth);
                                            }
                                            timeoutOprava(ifrWidthString, ifrHeightString, "problem");
                                        }, 3000);
                                    }                                            
                                }, 2000);
                            }                                            
                        }, 1500);
                    }
                }, 1000);
            }                          


        }
        //centrovani
        var selection = top.document.querySelector("#adfContainerMobil") !== null;
        if (selection) {
           document.getElementById("adfContainerMobil").style.width = "1px";
        }         
    }    
   
    function checkIfrWidthString(ifrWidthString){
        var numbWidth = ifrWidthString[0].match(/\d/g);
        var ifrWidth = numbWidth.join("");
        if(weuron.log.dev !== "notSet"){
            console.log("ifrWidth: "+ifrWidth);
        }
        return ifrWidth;
    }


    function timeoutOprava(ifrWidthString, ifrHeightString, fireTimeout){
        if(weuron.log.dev !== "notSet"){
            console.log("fireTimeout: "+fireTimeout);
        }
        
        var numbWidth = ifrWidthString[0].match(/\d/g);
        var ifrWidth = numbWidth.join("");
        if(weuron.log.dev !== "notSet"){
            console.log("ifrWidth: "+ifrWidth);
        }

        var numbHeight= ifrHeightString[0].match(/\d/g);
        ifrHeight = numbHeight.join("");
        if(weuron.log.dev !== "notSet"){
            console.log("ifrHeight: "+ifrHeight);
        }
        
        var imSirkaBody = window.innerWidth;
        if(weuron.log.dev !== "notSet"){
            console.log("imSirkaBody: "+imSirkaBody);
        }

        var imZoom = 1;
        
        if(ifrHeight > weuron.log.maxHeight){
        
            if(ifrHeight){
                imZoom = weuron.log.maxHeight / ifrHeight;
                if(imSirkaBody > Math.round(ifrWidth*imZoom)){
                    if(weuron.log.dev !== "notSet"){
                        console.log("ifrHeight >> imZoom: "+imZoom);
                    }

                    var styleNode;
                    var contentStyleTop = "#bottomBoxWraperADF100p iframe { -ms-zoom: " + imZoom + "; -ms-transform-origin: 0 0;-moz-transform: scale(" + imZoom + "); -moz-transform-origin: 0px 0px;-o-transform: scale(" + imZoom + "); -o-transform-origin: 0px 0px;-webkit-transform: scale(" + imZoom + "); -webkit-transform-origin: 0 0; }";
                    if((styleNode = top.document.createElement("style")).id = "responsiv-mobilBranding-iframe", styleNode.type = "text/css", window.attachEvent && !window.opera){ 
                        styleNode.styleSheet.cssText = contentStyleTop;
                        if(weuron.log.dev !== "notSet"){
                            console.log("chrom OK: "+contentStyleTop);
                        }
                    }else{
                        var styleText = document.createTextNode(contentStyleTop);
                        styleNode.appendChild(styleText)
                    }
                    top.document.getElementsByTagName("head")[0].appendChild(styleNode);

                    ifrWidth = Math.round(ifrWidth*imZoom);
                    if(weuron.log.dev !== "notSet"){
                        console.log("Math.round(ifrWidth): "+(ifrWidth));
                    }

                    ifrHeight = Math.round(ifrHeight*imZoom);
                    document.getElementById("bottomBoxWraperADF100p").style.width = "0px";
                    document.getElementById("adfContainerMobil").style.left = "auto";
                    document.getElementById("adfContainerMobil").style.right = ifrWidth+"px";
                    document.getElementById("bottomBoxWraperADF100p").style.display = "block";
                    
                }else{
                
                    if(ifrWidth){
                        if(weuron.log.dev !== "notSet"){
                            console.log("if(ifrWidth): "+ifrWidth);
                        }
                        if(imSirkaBody<ifrWidth){

                            imZoom = imSirkaBody / ifrWidth;
                            if(weuron.log.dev !== "notSet"){
                                console.log("imZoom: "+imZoom);
                            }

                            var styleNode;
                            var contentStyleTop = "#bottomBoxWraperADF100p iframe { -ms-zoom: " + imZoom + "; -ms-transform-origin: 0 0;-moz-transform: scale(" + imZoom + "); -moz-transform-origin: 0px 0px;-o-transform: scale(" + imZoom + "); -o-transform-origin: 0px 0px;-webkit-transform: scale(" + imZoom + "); -webkit-transform-origin: 0 0; }";
                            if((styleNode = top.document.createElement("style")).id = "responsiv-mobilBranding-iframe", styleNode.type = "text/css", window.attachEvent && !window.opera){ 
                                styleNode.styleSheet.cssText = contentStyleTop;
                                if(weuron.log.dev !== "notSet"){
                                    console.log("chrom OK: "+contentStyleTop);
                                }
                            }else{
                                var styleText = document.createTextNode(contentStyleTop);
                                styleNode.appendChild(styleText)
                            }
                            top.document.getElementsByTagName("head")[0].appendChild(styleNode);
                        }

                        ifrWidth = Math.round((ifrWidth*imZoom)/2);
                        if(weuron.log.dev !== "notSet"){
                            console.log("Math.round(ifrWidth): "+(ifrWidth));
                        }

                        ifrHeight = Math.round(ifrHeight*imZoom);

                    }else{
                        if(weuron.log.dev !== "notSet"){
                            console.log("else(ifrWidth): "+ifrWidth);
                        }
                        var ifrWidth = 0;
                    }

                    document.getElementById("adfContainerMobil").style.left = "-"+ifrWidth+"px";
                    document.getElementById("adfContainerMobil").style.height = ifrHeight+"px";                        
                    document.getElementById("bottomBoxWraperADF100p").style.display = "block";
                    
                }
                
            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else(ifrHeight): "+ifrHeight);
                }
                var ifrWidth = 0;
                document.getElementById("bottomBoxWraperADF100p").style.width = "0px";
                document.getElementById("adfContainerMobil").style.left = "auto";
                document.getElementById("adfContainerMobil").style.right = ifrWidth+"px";
                document.getElementById("bottomBoxWraperADF100p").style.display = "block";                
            }
            
        }else{

            if(ifrWidth){
                if(weuron.log.dev !== "notSet"){
                    console.log("if(ifrWidth): "+ifrWidth);
                }
                if(imSirkaBody<ifrWidth){

                    imZoom = imSirkaBody / ifrWidth;
                    if(weuron.log.dev !== "notSet"){
                        console.log("imZoom: "+imZoom);
                    }

                    var styleNode;
                    var contentStyleTop = "#bottomBoxWraperADF100p iframe { -ms-zoom: " + imZoom + "; -ms-transform-origin: 0 0;-moz-transform: scale(" + imZoom + "); -moz-transform-origin: 0px 0px;-o-transform: scale(" + imZoom + "); -o-transform-origin: 0px 0px;-webkit-transform: scale(" + imZoom + "); -webkit-transform-origin: 0 0; }";
                    if((styleNode = top.document.createElement("style")).id = "responsiv-mobilBranding-iframe", styleNode.type = "text/css", window.attachEvent && !window.opera){ 
                        styleNode.styleSheet.cssText = contentStyleTop;
                        if(weuron.log.dev !== "notSet"){
                            console.log("chrom OK: "+contentStyleTop);
                        }
                    }else{
                        var styleText = document.createTextNode(contentStyleTop);
                        styleNode.appendChild(styleText)
                    }
                    top.document.getElementsByTagName("head")[0].appendChild(styleNode);
                }
                
                ifrWidth = Math.round((ifrWidth*imZoom)/2);
                if(weuron.log.dev !== "notSet"){
                    console.log("Math.round(ifrWidth): "+(ifrWidth));
                }

                ifrHeight = Math.round(ifrHeight*imZoom);

            }else{
                if(weuron.log.dev !== "notSet"){
                    console.log("else(ifrWidth): "+ifrWidth);
                }
                var ifrWidth = 0;
            }
            
            document.getElementById("adfContainerMobil").style.left = "-"+ifrWidth+"px";
            document.getElementById("adfContainerMobil").style.height = ifrHeight+"px";                        
            document.getElementById("bottomBoxWraperADF100p").style.display = "block";
            
        }
        
    }


   
    function zavriReklamuBottomBoxWraperADF100p(){
        document.getElementById("bottomBoxWraperADF100p").style.display = "none";
        top.document.body.setAttribute("data-mobilniBranding-reloadingAds", "noReloadingAds"); 
        createCookie("imCappingMB", "pause-im-mobilniBrandig", false, weuron.log.closeMbCapping);
        if(!weuron.log.forbiddenReloadingAdsInMbCapping){
            createCookie("imAllowReloadingAdsInMbCapping", "pause-im-mobilniBrandig", false, weuron.log.closeMbCapping);
        }
    }
 

}else{
    //dispay:none the HB mobilniBranding ID
    var selection = top.document.querySelector("#adformMobilniBranding") !== null;
    if (selection) {
        document.querySelector("#adformMobilniBranding").style.display = "none";
    }
}

                
var adfScriptImpl = 'All script was removed';

var checkReloadingAdsRestriction; 
    console.log('im-mobilni_branding : DEV TEST >> unitReloadingAdsRestriction: 1000 vs imHbReloadingAds: ' + imHbReloadingAds + ' from reloadingAds: 50' + '' );
    checkReloadingAdsRestriction = 1000 - (50 - imHbReloadingAds);
    
    console.log('imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction); 
    if (checkReloadingAdsRestriction > 0) {
        console.log('im-mobilni_branding : REMOVE imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction);     
        nonResponsiveLeaveBlank = document.querySelector("#im-mobilni_branding") !== null;
        console.log('ID: im-mobilni_branding / MID:453516 / DIV ID found: ' + nonResponsiveLeaveBlank);
        if (nonResponsiveLeaveBlank) {
            document.querySelector("#im-mobilni_branding").innerHTML = '<span style="display:none !important">All was removed - All will be set according to the HB administration</span>';
       }
    }
    console.log('square-ir : DEV TEST >> unitReloadingAdsRestriction: 1 vs imHbReloadingAds: ' + imHbReloadingAds + ' from reloadingAds: 50' + '' );
    checkReloadingAdsRestriction = 1 - (50 - imHbReloadingAds);
    
    console.log('imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction); 
    if (checkReloadingAdsRestriction > 0) {
        console.log('square-ir : REMOVE imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction);     
        nonResponsiveLeaveBlank = document.querySelector("#square-ir") !== null;
        console.log('ID: square-ir / MID:453521 / DIV ID found: ' + nonResponsiveLeaveBlank);
        if (nonResponsiveLeaveBlank) {
            document.querySelector("#square-ir").innerHTML = '<span style="display:none !important">All was removed - All will be set according to the HB administration</span>';
       }
    }
    console.log('top-leaderboard-vse : DEV TEST >> unitReloadingAdsRestriction: 1 vs imHbReloadingAds: ' + imHbReloadingAds + ' from reloadingAds: 50' + '' );
    checkReloadingAdsRestriction = 1 - (50 - imHbReloadingAds);
    
    console.log('imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction); 
    if (checkReloadingAdsRestriction > 0) {
        console.log('top-leaderboard-vse : REMOVE imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction);     
        nonResponsiveLeaveBlank = document.querySelector("#top-leaderboard-vse") !== null;
        console.log('ID: top-leaderboard-vse / MID:614447 / DIV ID found: ' + nonResponsiveLeaveBlank);
        if (nonResponsiveLeaveBlank) {
            document.querySelector("#top-leaderboard-vse").innerHTML = '<span style="display:none !important">All was removed - All will be set according to the HB administration</span>';
       }
    }
if(imHbReloadingAds == '50'){

//statistika
function statisticsAuctionEnd(data, kam){
    console.log('fire post data auctionEnd: '+kam);
    console.log(data);

//  var strData = JSON.stringify(data);
    var strData = encodeURIComponent(JSON.stringify(data));    
    console.log('strData: '+strData);

    var hbmasterscript = 'hb-0';
    if(null != top.document.body.getAttribute("data-hbmasterscript")){
        hbmasterscript = top.document.body.getAttribute("data-hbmasterscript"); 
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://hb.impressionmedia.cz/statistics/'+kam+'.php?configId=1191&statistics=1&hbmasterscript='+hbmasterscript+'&data='+strData);
//  xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      // In local files, status is 0 upon success in Mozilla Firefox
      if(xhr.readyState === XMLHttpRequest.DONE) {
        var status = xhr.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          console.log('xhr.responseText');          
          console.log(status + ': ' + xhr.responseText);
        } else {
            console.log('error in xhr');
          // Oh no! There has been an error with the request!
        }
      }
    };
    xhr.send();

}

pbjs.onEvent('auctionInit', function(data){
    console.log('pbjs.onEvent - auctionInit');
    console.log(data);
});

            
//pbjs.onEvent('bidRequested', function(data){
//    console.log(data);
//    console.log('onEvent bidRequested >> data.bidderCode :: ' +data.bidderCode+' && data.bids[0].userId.pubcid :: '+data.bids[0].userId.pubcid);
//    console.log('onEvent bidRequested >> data.bidderCode :: ' +data.bidderCode+' && data.bids[1].userId.pubcid :: '+data.bids[1].userId.pubcid);
//});            

pbjs.onEvent('auctionEnd', function(data){
    var dataAdUnitCodesString = data.adUnitCodes[0];
    console.log('auctionEnd sendStatistics: '+dataAdUnitCodesString);
    console.log(data);
    console.log('check caroda: '+dataAdUnitCodesString.indexOf('caroda'));
    if(dataAdUnitCodesString.indexOf('caroda') > -1){
        console.log('jump caroda');
    }else{

        console.log('data.bidsReceived^^');
        console.log(data.bidsReceived);
        for (var i in data.bidsReceived) {
            if(!isNaN(i)){
                console.log(i + '. auEnd|Received: ' + data.bidsReceived[i].bidderCode); 
                var dataWithoutAd = JSON.parse(JSON.stringify(data.bidsReceived[i]));
                dataWithoutAd.ad = '';
                console.log('dataWithoutAd^^');
                console.log(dataWithoutAd);
                statisticsAuctionEnd(dataWithoutAd, 'bidsReceived');
                dataWithoutAd = {};
            }
        }

        setTimeout(function(){
            var updateRezim = 'biddersDetail';
            var nobids = data.noBids.length;
            var auctionStatus = data.auctionStatus;
            console.log('bidderRequestsShortAuctionSum data.noBids^^'); 
            console.log(data);
            var biddersRequestDetail = data.noBids[0].bidder;
            var biddersRequestIdDetail = data.noBids[0].bidderRequestId;
            var adUnitCodeDetail = data.noBids[0].adUnitCode;           
            console.log('bidderRequestsShortAuctionSum: '+auctionStatus+'|'+nobids+'|'+biddersRequestDetail+'|'+updateRezim+'|'+data.auctionId+'|'+biddersRequestIdDetail+'|'+adUnitCodeDetail);
            statisticsAuctionEnd(auctionStatus+'|'+nobids+'|'+biddersRequestDetail+'|'+updateRezim+'|'+data.auctionId+'|'+biddersRequestIdDetail+'|'+adUnitCodeDetail, 'bidderRequestsShortAuctionSum');
 

//setTimeout(function(){
//var imTestingElemCycle = 0;
//var imStressTestDiv = document.createElement('div');
//imStressTestDiv.style.cssText = 'position:absolute;display:none';
//imStressTestDiv.id = 'imStressTestDiv';
//document.body.appendChild(imStressTestDiv);
//    var imTestingElem = document.getElementsByTagName("BODY")[0];
//        console.log('imTestingElem.scrollTop: '+imTestingElem.scrollTop);
//        imTestingElemCycle = 1;
//        var zt1;
//        var ztCycle1 = 1;        
//        for (zt1 = 1; zt1 < 13; zt1++) {   
//            setTimeout(function(){
//                console.log('ztCycle1: '+ztCycle1);
//                var updateRezim = 'biddersDetail';
//                var nobids = data.noBids.length;
//                var auctionStatus = data.auctionStatus;
//                console.log('bidderRequestsShortAuctionSum data.noBids^^'); 
//                console.log(data);
//                var biddersRequestDetail = data.noBids[0].bidder;
//                var biddersRequestIdDetail = data.noBids[0].bidderRequestId;
//                var adUnitCodeDetail = data.noBids[0].adUnitCode;           
//                console.log('bidderRequestsShortAuctionSum: '+auctionStatus+'|'+nobids+'|'+biddersRequestDetail+'|'+updateRezim+'|'+data.auctionId+'|'+biddersRequestIdDetail+'|'+adUnitCodeDetail);
//                statisticsAuctionEnd(auctionStatus+'|'+nobids+'|'+biddersRequestDetail+'|'+updateRezim+'|'+data.auctionId+'|'+biddersRequestIdDetail+'|'+adUnitCodeDetail, 'bidderRequestsShortAuctionSum');
//                ztCycle1++;
//                var imStressTestScript = document.createElement('script');
//                imStressTestScript.type = 'text/javascript';
//                var imStressUrlRndInt = Math.floor(Math.random() * 30) + 1;                
//                var imStressTestRndInt = Math.floor(Math.random() * 1000) + 1;
//                imStressTestScript.src = 'https://hb.impressionmedia.cz/tmp/0002_soubor_pro_zatezovy_test_nemazat_'+imStressUrlRndInt+'.js?imStressTestRndInt='+imStressTestRndInt;
//                var imStressTestDiv = document.querySelector('#imStressTestDiv');
//                imStressTestDiv.innerHTML = '';
//                imStressTestDiv.appendChild(imStressTestScript);             
//            }, (zt1*1000));
//        }
//}, 500);


        }, 500);
 
        
        setTimeout(function(){
            console.log('/statistics - start // pubCommonId');
            console.log(pbjs);
            console.log(pbjs.adUnits); 
            console.log('/statistics - ready');
            //delete pbjs.adUnits;
            //console.log(pbjs.getUserIds(data));
            console.log('/statistics - end');
            console.log(pbjs.adUnits);
        }, 10000);

    } //no caroda
    console.log('end onEvent auctionEnd');
});

pbjs.onEvent('bidWon', function(data){       
    console.log('pbjsonEvent >> bidWon^^'); 
    console.log(data);
    console.log('pbjsonEvent >> bidWon >> currency: ' + data.currency + ' // originalCurrency: ' +  data.originalCurrency );
        
    console.log('bidWon sendStatistics: '+data.adUnitCode);
    console.log(data);

    statisticsAuctionEnd(data.requestId+'|'+data.auctionId, 'bidsWon');
});

pbjs.onEvent('bidTimeout', function(data){
    console.log('pbjsonEvent >> bidTimeout^^'); 
    console.log(data);   

    //statisticsAuctionEnd(data.auctionId, 'bidTimeout');
});


}


//var script = document.createElement('script');
//script.onload = function() {
//  console.log('Script prebid2.34.0_pulsePoint_ch8 loaded and ready');



pbjs.adUnits = [];
//  Web Variableexclude#@##@#
// without setting for Web Variable
console.log('no Web Variable');//   URL condition:include#@#regex#@#.*
        var patt = new RegExp('.*');
        var urlCondition = patt.test(pbjs.WEURON_pathname);
        if(urlCondition){

  if(((pbjs.WEURON_WindowWidth >= 1) && (pbjs.WEURON_WindowWidth <= 10000))){

    console.log('PROD >> unitReloadingAdsRestriction: 1000 vs imHbReloadingAds: ' + imHbReloadingAds + ' from reloadingAds: 50' + '' );
    checkReloadingAdsRestriction = 1000 - (50 - imHbReloadingAds);
    
    console.log('PROD >> imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction);
    if(checkReloadingAdsRestriction > 0){
        var hbPlacement = document.querySelector("#im-mobilni_branding") !== null;
        console.log('ID: im-mobilni_branding / hbPlacement453516: ' + hbPlacement);
        if (hbPlacement) {
            document.querySelector("#im-mobilni_branding").innerHTML = '<sc'+'ript data-adfscript="adx.adform.net/adx/?mid=453516"></scr'+'ipt>';            
           }

        console.log('Responzivita = TRUE >> Placement / MID: im-mobilni_branding / 453516  (' + pbjs.WEURON_WindowWidth + ')');    
        pbjs.adUnits.push(    
        {
            id: 'ireferatycz-1-1191-910397',
            code: 'im-mobilni_branding',
                mediaTypes: {
                   banner: {sizes: [
               [320,150],[300,120],[300,100],[300,50],[500,200],[320,50],[300,150]
                   ]}
                },
//          "refresh": 0,
//          "refresh_limit": 0,        
            "labelAny": ["all"],
            "bids": [
            
                {
                    "bidder": "cpex-tt",
                    "bidderCode": "rubicon",        
                        "params": {
                               accountId: "10900",
                               siteId: 143002,
                               zoneId: 1895974,
                                    position: "atf",
                                    inventory: {}    
                        }                
                },
                {
                    "bidder": "adform-im-tt",
                    "bidderCode": "adform",        
                        "params": {
                               mid: 453516,
                                        rcur: "USD"    
                        }                
                },
                {
                    "bidder": "cpex-nt",
                    "bidderCode": "rubicon",        
                        "params": {
                               accountId: "10900",
                               siteId: 143004,
                               zoneId: 1895978,
                                    position: "atf",
                                    inventory: {}    
                        }                
                },
                {
                    "bidder": "r2b2",
                    "bidderCode": "r2b2",        
                        "params": {
                               d: "ireferaty.cz",
                               g: "hb",
                               p: "fixed",
                               m: 1,    
                        }                
                },
                {
                    "bidder": "appnexus",
                    "bidderCode": "appnexus",        
                        "params": {
                               placementId: "20615880",    
                        }                
                },
                {
                    "bidder": "PubMatic",
                    "bidderCode": "pubmatic",        
                        "params": {
                               publisherId: "158732",
                               adSlot: "3348450",
                               currency: "USD",    
                        }                
                }
              ]
            }
        ); //end push

        if(typeof pbjs.WEURON_MapPositions  === 'undefined'){ 
           pbjs.WEURON_MapPositions  = {}; 
        } pbjs.WEURON_MapPositions ['im-mobilni_branding'] = '453516';
  
      }else{
        console.log('Responzivita = FALSE >> Placement / MID: im-mobilni_branding / 453516  (' + pbjs.WEURON_WindowWidth + ')');
//      var check453516 = document.querySelector("#im-mobilni_branding") !== null;
//      console.log('ID: im-mobilni_branding / check453516: ' + check453516);
//      if (check453516) {
//          document.querySelector("#im-mobilni_branding").innerHTML = '';
//      }
      }
  } //end checkReloadingAdsRestriction

  }else{;
    console.log('URL condition >>  include / typ regex / string: .*');
  }
//  Web Variableexclude#@##@#
// without setting for Web Variable
console.log('no Web Variable');//   URL condition:exclude#@#start#@#
// without setting for URL condition
console.log('no URL condition');
  if(((pbjs.WEURON_WindowWidth >= 1) && (pbjs.WEURON_WindowWidth <= 10000))){

    console.log('PROD >> unitReloadingAdsRestriction: 1 vs imHbReloadingAds: ' + imHbReloadingAds + ' from reloadingAds: 50' + '' );
    checkReloadingAdsRestriction = 1 - (50 - imHbReloadingAds);
    
    console.log('PROD >> imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction);
    if(checkReloadingAdsRestriction > 0){
        var hbPlacement = document.querySelector("#square-ir") !== null;
        console.log('ID: square-ir / hbPlacement453521: ' + hbPlacement);
        if (hbPlacement) {
            document.querySelector("#square-ir").innerHTML = '<sc'+'ript data-adfscript="adx.adform.net/adx/?mid=453521"></scr'+'ipt>';            
           }

        console.log('Responzivita = TRUE >> Placement / MID: square-ir / 453521  (' + pbjs.WEURON_WindowWidth + ')');    
        pbjs.adUnits.push(    
        {
            id: 'ireferatycz-1-1191-910398',
            code: 'square-ir',
                mediaTypes: {
                   banner: {sizes: [
               [300,300],[300,250],[300,100],[300,50],[250,250],[200,200]
                   ]}
                },
//          "refresh": 0,
//          "refresh_limit": 0,        
            "labelAny": ["all"],
            "bids": [
            
                {
                    "bidder": "cpex-tt",
                    "bidderCode": "rubicon",        
                        "params": {
                               accountId: "10900",
                               siteId: 142998,
                               zoneId: 720498,
                                    position: "atf",
                                    inventory: {}    
                        }                
                },
                {
                    "bidder": "criteo-im",
                    "bidderCode": "criteo",        
                        "params": {
                               networkId: 7456,
                               publisherSubId: "ireferaty/Square_300x300_453521",    
                        }                
                },
                {
                    "bidder": "adform-im-tt",
                    "bidderCode": "adform",        
                        "params": {
                               mid: 453521,
                                        rcur: "USD"    
                        }                
                },
                {
                    "bidder": "adform-im-nt",
                    "bidderCode": "adform",        
                        "params": {
                               mid: 453514,
                                        rcur: "USD"    
                        }                
                },
                {
                    "bidder": "r2b2",
                    "bidderCode": "r2b2",        
                        "params": {
                               d: "ireferaty.cz",
                               g: "hb",
                               p: "300x250",
                               m: 0,    
                        }                
                },
                {
                    "bidder": "appnexus",
                    "bidderCode": "appnexus",        
                        "params": {
                               placementId: "17718394",    
                        }                
                },
                {
                    "bidder": "PubMatic",
                    "bidderCode": "pubmatic",        
                        "params": {
                               publisherId: "158732",
                               adSlot: "3348403",
                               currency: "USD",    
                        }                
                },
                {
                    "bidder": "Teads",
                    "bidderCode": "teads",        
                        "params": {
                               pageId: "117795",
                               placementId: "138633",    
                        }                
                }
              ]
            }
        ); //end push

        if(typeof pbjs.WEURON_MapPositions  === 'undefined'){ 
           pbjs.WEURON_MapPositions  = {}; 
        } pbjs.WEURON_MapPositions ['square-ir'] = '453521';
  
      }else{
        console.log('Responzivita = FALSE >> Placement / MID: square-ir / 453521  (' + pbjs.WEURON_WindowWidth + ')');
//      var check453521 = document.querySelector("#square-ir") !== null;
//      console.log('ID: square-ir / check453521: ' + check453521);
//      if (check453521) {
//          document.querySelector("#square-ir").innerHTML = '';
//      }
      }
  } //end checkReloadingAdsRestriction
//  Web Variableexclude#@##@#
// without setting for Web Variable
console.log('no Web Variable');//   URL condition:exclude#@#start#@#
// without setting for URL condition
console.log('no URL condition');
  if(((pbjs.WEURON_WindowWidth >= 1) && (pbjs.WEURON_WindowWidth <= 10000))){

    console.log('PROD >> unitReloadingAdsRestriction: 1 vs imHbReloadingAds: ' + imHbReloadingAds + ' from reloadingAds: 50' + '' );
    checkReloadingAdsRestriction = 1 - (50 - imHbReloadingAds);
    
    console.log('PROD >> imHbReloadingAds >> checkReloadingAdsRestriction: '+checkReloadingAdsRestriction);
    if(checkReloadingAdsRestriction > 0){
        var hbPlacement = document.querySelector("#top-leaderboard-vse") !== null;
        console.log('ID: top-leaderboard-vse / hbPlacement614447: ' + hbPlacement);
        if (hbPlacement) {
            document.querySelector("#top-leaderboard-vse").innerHTML = '<sc'+'ript data-adfscript="adx.adform.net/adx/?mid=614447"></scr'+'ipt>';            
           }

        console.log('Responzivita = TRUE >> Placement / MID: top-leaderboard-vse / 614447  (' + pbjs.WEURON_WindowWidth + ')');    
        pbjs.adUnits.push(    
        {
            id: 'ireferatycz-1-1191-910399',
            code: 'top-leaderboard-vse',
                mediaTypes: {
                   banner: {sizes: [
               [300,300],[300,250],[300,100],[250,250],[300,50],[200,200]
                   ]}
                },
//          "refresh": 0,
//          "refresh_limit": 0,        
            "labelAny": ["all"],
            "bids": [
            
                {
                    "bidder": "criteo-im",
                    "bidderCode": "criteo",        
                        "params": {
                               networkId: 7456,
                               publisherSubId: "ireferaty/Square_300x300_mobile_614447",    
                        }                
                },
                {
                    "bidder": "adform-im-tt",
                    "bidderCode": "adform",        
                        "params": {
                               mid: 614447,
                                        rcur: "USD"    
                        }                
                },
                {
                    "bidder": "adform-im-nt",
                    "bidderCode": "adform",        
                        "params": {
                               mid: 614462,
                                        rcur: "USD"    
                        }                
                },
                {
                    "bidder": "r2b2",
                    "bidderCode": "r2b2",        
                        "params": {
                               d: "ireferaty.cz",
                               g: "hp",
                               p: "300x300",
                               m: 0,    
                        }                
                },
                {
                    "bidder": "appnexus",
                    "bidderCode": "appnexus",        
                        "params": {
                               placementId: "17718390",    
                        }                
                },
                {
                    "bidder": "PubMatic",
                    "bidderCode": "pubmatic",        
                        "params": {
                               publisherId: "158732",
                               adSlot: "3348441",
                               currency: "USD",    
                        }                
                }
              ]
            }
        ); //end push

        if(typeof pbjs.WEURON_MapPositions  === 'undefined'){ 
           pbjs.WEURON_MapPositions  = {}; 
        } pbjs.WEURON_MapPositions ['top-leaderboard-vse'] = '614447';
  
      }else{
        console.log('Responzivita = FALSE >> Placement / MID: top-leaderboard-vse / 614447  (' + pbjs.WEURON_WindowWidth + ')');
//      var check614447 = document.querySelector("#top-leaderboard-vse") !== null;
//      console.log('ID: top-leaderboard-vse / check614447: ' + check614447);
//      if (check614447) {
//          document.querySelector("#top-leaderboard-vse").innerHTML = '';
//      }
      }
  } //end checkReloadingAdsRestriction


"use strict";
var adformtag = adformtag || [];

if ( pbjs.winningBids = pbjs.winningBids 
        || {},
        pbjs.IMPRESSION_enableAnalytics = pbjs.IMPRESSION_enableAnalytics,
        pbjs.IMPRESSION_useKeywords = !!pbjs.IMPRESSION_useKeywords,
        pbjs.WEURON_log = function(e) {        
        console.log(e);        
    }, pbjs.WEURON_logError = function(e, t) {
        e || (e = ""), "string" == typeof e.message && (e = e.message);
        var s = {
            data: t ? JSON.stringify(t) : void 0,
            type: "pbjs",
            errorMessage: e,
            url: window.location.href
        };
        pbjs.WEURON_log(JSON.stringify(s));
        var n = "";
        for (var i in s) "" !== n && (n += "&"), n += i + "=" + encodeURIComponent(s[i]);
        console.log('WEURON_logError');
        console.log(n);
//        var r = new XMLHttpRequest;
//        r.open("POST", "https://weuron.com/log.php", !0), 
//        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), 
//        r.send(n)
    }, pbjs.WEURON_timeout = pbjs.WEURON_timeout || 1000,
    pbjs.WEURON_USDtoCZK = pbjs.WEURON_USDtoCZK || 23,
    pbjs.WEURON_log("lg-001 script init"), 
    pbjs.WEURON_startTime = (new Date).getTime(), 
    pbjs.WEURON_offsetNow = function() {
        return (new Date).getTime() - pbjs.WEURON_startTime
    }, 
    pbjs.WEURON_hbTierCoef = pbjs.WEURON_hbTierCoef || 1.35, 
    pbjs.WEURON_HbMin = pbjs.WEURON_HbMin || 6, 
    pbjs.bidderSettingsHbPb = pbjs.bidderSettingsHbPb || function(e) {
        try {
            console.log('e.adUnitCode.replace(/-|_/g, ""): '+e.adUnitCode.replace(/-|_/g, ""));
            if(placementFloor[e.adUnitCode.replace(/-|_/g, "")]>0){
            pbjs.WEURON_HbMin = placementFloor[e.adUnitCode.replace(/-|_/g, "")];
            console.log('placementFloor: '+pbjs.WEURON_HbMin);
            }else if(webFloor>0){
            pbjs.WEURON_HbMin = webFloor;
            console.log('webFloor: '+pbjs.WEURON_HbMin);
            }else if(bidderFloor[e.bidder]>0){ 
            pbjs.WEURON_HbMin = bidderFloor[e.bidder];
            console.log('bidderFloor: '+pbjs.WEURON_HbMin);
            }else{
            pbjs.WEURON_HbMin = 6;
            console.log('else floor: '+pbjs.WEURON_HbMin);
            }
            console.log('pbjs.WEURON_HbMin: '+pbjs.WEURON_HbMin);
            console.log('pbjs.WEURON_USDtoCZK: '+ pbjs.WEURON_USDtoCZK);            
            console.log('e.cpm * pbjs.WEURON_USDtoCZK: '+ (e.cpm * pbjs.WEURON_USDtoCZK));            
            console.log(e);
            var t, s = e.cpm * pbjs.WEURON_USDtoCZK - pbjs.WEURON_HbMin;
            t = s < 0 ? 1 : Math.floor(Math.log(s) / Math.log(pbjs.WEURON_hbTierCoef));
            console.log('t: '+ t); 
        } catch (e) {
            t = 1
        }
        return t < 1 ? 1 : t < 16 ? t : 16
    }, pbjs.bidderSettings = {
        standard: {
            alwaysUseBid: false,  //Useful when working with a prebid partner not returning a cpm value.
            adserverTargeting: [{
                key: "hb_pb",
                val: pbjs.bidderSettingsHbPb
            }]
        }
    }, pbjs.initAdserver = function() {

        if (!pbjs.initAdserverSet) {
            pbjs.WEURON_log("pbjs.initAdserver");
            var e;
            pbjs.IMPRESSION_codesWithResponse = Object.keys(pbjs.getBidResponses());
            console.log('pbjs.getBidResponses^^ ');
//            console.log(pbjs.getBidResponses());
            console.log(pbjs.IMPRESSION_codesWithResponse);
            try {
                if (pbjs.IMPRESSION_codesWithResponse.length > 0)
                    for (var t = 0; t < pbjs.IMPRESSION_codesWithResponse.length; t++) 
                        try 
                        {
                            //pokud je z ??eho vyb??rat ex. set e = pbjs.getHighestCpmBids("adform_square")[0]
                            if (void 0 !== (e = pbjs.getHighestCpmBids(pbjs.IMPRESSION_codesWithResponse[t])[0] || void 0) && 0 === e.cpm)
                                continue;
                            console.log('initAdserverSet getHighestCpmBids for placement '+pbjs.IMPRESSION_codesWithResponse[t]+' ^^');
                            console.log(e);
                            //save the highest bid ex. pbjs.winningBids["adform_square"] 
                            pbjs.winningBids[pbjs.IMPRESSION_codesWithResponse[t]] = e, 
                            void 0 !== e && 
                                   e.cpm && 
                            (1400 === e.height && 2000 === e.width) && 
                            (pbjs.IMPRESSION_SkinCPM = e.cpm)
                        } 
                        catch (e) {
                            pbjs.WEURON_log('catch >> error-001 ');
                            pbjs.WEURON_log(e);
                        } 
                else pbjs.WEURON_log("h003 " + pbjs.WEURON_offsetNow() + " Timeout fired, no bids returned.")
            } catch (e) {
                pbjs.WEURON_log('catch >> pbjs.IMPRESSION_codesWithResponse.length: '+pbjs.IMPRESSION_codesWithResponse.length +' >> e^^');
                pbjs.WEURON_log(e);
            }! function() { //vraci vzdy TRUE
                var e = document.createElement("script");
                e.async = !0, e.type = "text/javascript", e.dataset.source = "cpxcp";
                var t = "https:" === document.location.protocol;
                e.src = (t ? 'https:' : 'http:') + '//s1.adform.net/banners/scripts/adx.js';
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(e, s)
            }(),
                pbjs.initAdserverSet = !0,
                adformtag.push(function() {
                    pbjs.WEURON_log("lg-002 " + pbjs.WEURON_offsetNow() + " adformtag.push"),
                    pbjs.que.push(function() {
                        pbjs.WEURON_log("lg-003a " + pbjs.WEURON_offsetNow() + " adformtag.push -> pbjs.que.push");
                        for (var e = 0; e < pbjs.adUnits.length; e++) 
                            try 
                            {
                                var t = pbjs.IMPRESSION_ppas_getHighestBidForAdUnit(pbjs.adUnits[e].code),
                                    s = "";
                                    console.log('pbjs.adUnits[e].code: '+pbjs.adUnits[e].code);
                                    console.log('adformtag.push(..foreach adUnits t^^');
                                    console.log(t);
                                pbjs.IMPRESSION_useKeywords && 
                                        (
                                            s = " and hbkey: hb-" + pbjs.adUnits[e].code,
                                            t.hb_pb && 
                                            (s += " and hbtier: hb-" + pbjs.adUnits[e].code + "-" + t.hb_pb)
                                        ),
                                pbjs.WEURON_log("lg-004a Code: " +
                                        pbjs.adUnits[e].code +
                                        " with bidder: " + t.hb_bidder +
                                        " and price: " + t.hb_price +
                                        " and adId: " + t.hb_adId + s),
                                pbjs.IMPRESSION_ppas_setPPASTargetingForAdUnit(pbjs.adUnits[e].code, t)
                            } 
                            catch (e) 
                            {
                                pbjs.WEURON_log('catch >> error-002');
                                pbjs.WEURON_logError(e)
                            }
                })
            })
        }
    }, 
    pbjs.IMPRESSION_enableAnalytics && Array.isArray(pbjs.IMPRESSION_enableAnalytics)) pbjs.que.push(function() {
//      providers in config file 
        pbjs.enableAnalytics(pbjs.IMPRESSION_enableAnalytics)
});

pbjs.que.push(function() {
    try {
        pbjs.setConfig({
            cache: {
                url: "https://prebid.adnxs.com/pbc/v1/cache"
            },
            
       sizeConfig: [{
                       "mediaQuery": '(min-width: 1200px)',  
                        "labels": [ "desktop"]
                    }, 
                {
                       "mediaQuery": '(min-width: 768px) and (max-width: 1199px)', 
                        "labels": [ "tablet"]
                    }, 
                {
                       "mediaQuery": '(max-width: 767px)',  
                        "labels": [ "mobil"]
                    }, 
                {
                       "mediaQuery": '(min-width: 1px) and (max-width: 10000px)', 
                        "labels": [ "all"]
                    }, 
                {
                       "mediaQuery": '(min-width: 1px) and (max-width: 10000px)',
                        "labels": [ "notResponzive"]
                    },
                ],
    
        });
    } catch (e) {}
    if (pbjs.adUnits) {

        //pbjs.addAdUnits(pbjs.adUnits), 
        pbjs.WEURON_log("h001 " + pbjs.WEURON_offsetNow() + " Ad units added."), 
        pbjs.requestBids({
            timeout: pbjs.WEURON_timeout,
            bidsBackHandler: function() {
                pbjs.WEURON_log("h002 " + pbjs.WEURON_offsetNow() + " All the bid responses are back or the timeout hits "), pbjs.WEURON_log("h003 " + pbjs.WEURON_offsetNow() + " Calling initAdserver from bidsBacksHandler."), pbjs.initAdserver()
            }
        })
    } else { pbjs.WEURON_logError("There are no adUnits"); }

    var r, p
});
 pbjs.IMPRESSION_ppas_getHighestBidForAdUnit = function(e) {
        var t = {       
                hb_bidder: "nobids",
                hb_bidderAlias: "nobids", 
                hb_price: 0,
                hb_adId: "",
                hb_size: ""
            },
            s = pbjs.getHighestCpmBids(e)[0] || void 0;
        console.log('lg-003c(fc) IMPRESSION_ppas_getHighestBidForAdUnit winner bid for '+e+' adUnit^^ ');
if(typeof s !== 'undefined'){         
        console.log(s);
        console.log(s.ad); 
    var compare = document.querySelector("#compare-"+e) !== null;
    pbjs.WEURON_log('compare: ' + compare);
    if (compare) {
        var compare = document.querySelector("#compare-"+e);
        compare.innerHTML = s.ad;
    }

    var compareInfo = document.querySelector("#info-"+e) !== null;
    pbjs.WEURON_log('compareInfo: ' + compareInfo);
    if (compareInfo) {
        var compareInfo = document.querySelector("#info-"+e);
        compareInfo.innerHTML =
                           '<br> hbkey: hb-' + e
                         + '<br> hbtier: hb-' + tierAlias[pbjs.WEURON_MapPositions[e]] + '-' + s.adserverTargeting.hb_pb
                         + '<br> hbtier_hb_pb: ' + s.adserverTargeting.hb_pb                         
                         + '<br> hbalias: ' + s.bidder
                         + '<br> hb_price: ' + s.cpm 
                         + '<br> hb_bidder: ' + bidderAlias[s.bidder]
                         + '<br> hb_adId: ' + s.adId 
                         + '<br> hb_pb: ' + s.adserverTargeting.hb_pb
                         + '<br> hb_size:' + s.width + "x" + s.height;
    }
}else{
    var compare = document.querySelector("#compare-"+e) !== null;
    pbjs.WEURON_log('compare: ' + compare);
    if (compare) {
        var compare = document.querySelector("#compare-"+e);
        compare.innerHTML = 'NoBid';
    }
    var compareInfo = document.querySelector("#info-"+e) !== null;
    pbjs.WEURON_log('compareInfo: ' + compareInfo);
    if (compareInfo) {
        var compareInfo = document.querySelector("#info-"+e);
        compareInfo.innerHTML = '<br> NO WIN';
    }
}
        return s && (t.hb_price = s.cpm,
        t.hb_bidder = bidderAlias[s.bidder], 
        t.hb_bidderAlias = s.bidder,         
        t.hb_adId = s.adId, 
        t.hb_pb = s.adserverTargeting.hb_pb, 
        t.hb_size = s.width + "x" + s.height), t
    }, pbjs.IMPRESSION_ppas_setPPASTargetingForAdUnit = function(e, t) {
        var s;
        s = void 0 !== pbjs.WEURON_MapPositions  && pbjs.WEURON_MapPositions [e] ? pbjs.WEURON_MapPositions [e] : (s = e.split("-"))[s.length - 1];
        console.log('lg-004b IMPRESSION_ppas_setPPASTargetingForAdUnit s: ', s);
        var n = function(t) {
            if (pbjs.IMPRESSION_SkinCPM && pbjs.CPEx_skinExcludePositions && void 0 !== pbjs.CPEx_skinExcludePositions[s] && pbjs.CPEx_skinExcludePositions[s] <= pbjs.IMPRESSION_SkinCPM) {
                //branding
                pbjs.WEURON_log("adUnit " + e + " excluded because of skin CPM: "+pbjs.IMPRESSION_SkinCPM);
                try {
                    var n = document.querySelectorAll('[data-adfscript="adx.adform.net/adx/?mid=' + s + '"]');
                    if (n && 0 !== n.length || (n = document.querySelectorAll('[data-adfscript="adx.adform.net/adx/?mid=' + s + '&rnd=<random_number>"]')), n && n.length > 0)
                        for (var i = 0; i < n.length; ++i) n[i].parentNode.removeChild(n[i])
                } catch (e) {
                    pbjs.WEURON_logError("Exclude adunit error: " + e)
                }
            } else "nobids" === t.hb_bidder || "" === t.hb_adId 
              ?(
                pbjs.WEURON_log("lg-005 no bids for adUnit " + e),
                pbjs.WEURON_log('refreshPlacement: ' + e + ' / mid: '+pbjs.WEURON_MapPositions[e]),
                //document.querySelector("#"+e).innerHTML = '!!refreshPlacement:<br><script data-adfscript="adx.adform.net/adx/?mid='+pbjs.WEURON_MapPositions[e]+'&rnd='+(Math.floor(Math.random() * 10000))+'"></script>'
                
//adformtag.resetTargeting(s), // remove old data, required only if same mids a used
                adformtag.setTargeting(s, "hbkey", "hb-nobids-" + e),
                adformtag.setTargeting(s, "hbtier", "hb-" + e + "-" + "noBids"),
                adformtag.setTargeting(s, "hbtier_hb_pb", 1)
              ): 
                (
//adformtag.resetTargeting(s), // remove old data, required only if same mids a used
                adformtag.setTargeting(s, "hb_bidder", t.hb_bidder),                
                adformtag.setCustomData(s, "hb_adid", t.hb_adId), 
                pbjs.WEURON_log("lg-005a: adformtag.setTargeting(" + s + ', "hb_bidder", ' + t.hb_bidder + ")"),                
                pbjs.WEURON_log("lg-005b: adformtag.setCustomData(" + s + ', "hb_adid", ' + t.hb_adId + ")"),
                pbjs.IMPRESSION_useKeywords && 
                         (
                         pbjs.WEURON_log("lg-005c: adformtag.setTargeting(" + s + ', "hbkey", hb-' + e + ")"),
                         //pbjs.WEURON_log("lg-005d: adformtag.setTargeting(" + s + ', "hbtier", hb-' + e + "-" + t.hb_pb + ")"),
                         pbjs.WEURON_log("lg-005d: adformtag.setTargeting(" + s + ', "hbtier", hb-' + tierAlias[s] + "-" + t.hb_pb + ")"),
                         pbjs.WEURON_log("lg-005d-new: adformtag.setTargeting(" + s + ', "hbtier_hb_pb", ' + t.hb_pb + ")"),                         
                         //pbjs.WEURON_log("lg-005e: adformtag.setTargeting(" + s + ', "hbssp", ' + bidderAlias[t.hb_bidder] + ")"),
                         pbjs.WEURON_log("lg-005e: adformtag.setTargeting(" + s + ', "hbalias", ' + t.hb_bidderAlias + ")"), 
                         adformtag.setTargeting(s, "hbkey", "hb-" + e),
                         //adformtag.setTargeting(s, "hbtier", "hb-" + e + "-" + t.hb_pb),
                         adformtag.setTargeting(s, "hbtier", "hb-" + tierAlias[s] + "-" + t.hb_pb),
                         adformtag.setTargeting(s, "hbtier_hb_pb", t.hb_pb),
                         //adformtag.setTargeting(s, "hbssp", bidderAlias[t.hb_bidder])
                         adformtag.setTargeting(s, "hbalias", t.hb_bidderAlias) 
                         ),
                
                pbjs.WEURON_log("lg-005e: adformtag.setPrice(" + s + ", " + t.hb_price + ")"),
                adformtag.setPrice(s, t.hb_price)
                )
        };
        n(t);
    }



//};
//script.type = 'text/javascript';
//script.src = 'https://hb.impressionmedia.cz/prebid/prebid2.34.0_pulsePoint_ch8.min.js';
//document.getElementsByTagName('head')[0].appendChild(script);



