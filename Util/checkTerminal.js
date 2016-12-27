//首页移动终端判断-简单版本
function isMobileSimple() {
    if (/Android|webOS|iPhone|iPod|BlackBerry|opera mini|opera mobile/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
}

//移动终端判断-复杂版本
function isMobile() {
    var sUserAgent = navigator.userAgent.toLowerCase(),
        //注意这里的比较都发生的数组类型转换
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp = sUserAgent.match(/midp/i) == "midp",
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid = sUserAgent.match(/android/i) == "android",
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile",
        bIsWebview = sUserAgent.match(/webview/i) == "webview";
    return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
}


var isiPad = navigator.userAgent.match(/iPad/i) != null,
    isSafari = navigator.userAgent.match(/Safari/i) != null,
    isQQ = navigator.userAgent.match(/QQ/i) != null,
    isUC = navigator.userAgent.match(/UCBrowser/i) != null,
    isBaidu = navigator.userAgent.match(/Baidu/i) != null,
    isWeixin = navigator.userAgent.match(/MicroMessenger/i) != null;

//ipad safari添加到主屏幕
function addIpadMainScreen() {
    if (isiPad && isSafari && !isQQ && !isUC && !isBaidu && !isWeixin && window.localStorage.getItem("chinasoBubbleClose") != "1") {
        $("body").append('<div class="bubble-ipad"><i class="bubble-close"></i>点击右上角<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAjCAYAAAB2KjFhAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADFSURBVHja7JS9CsIwFIVPRHDWyd1H0EnQSZduTvYBBJ/FB/MxOrtV1Af4HHqFUmuaahYhB0LISfLl5uZHgDrKGiiAedfYLlAG3Kl0BVbfwvbAA9gZ7GjgrC/sANyAjbWxOrcF8lDYFiiBZc2jsfUzMGrOdYAacpKmki41D/O9aoO1KQg2UEQNJZWe/kmLV/pgY0mzHgEsPviFo0qai5AzouYswf4EdgoZFHrPgt5vOoAE83yOsg/yZ70ubbTIXDrNBHvXcwCc6EidkFiSlAAAAABJRU5ErkJggg==">，选择<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAARRSURBVHjazJjPbxNHFMc/M7ve2OsNsUisYkUUqNQWCClUQQWRQyWEGqJWFJFDhUqqqvC/cAn00HJAbRE3UNUeyqGqBIL+OBAqcFQqRElpaC9QxwmxHf+I98dMD9iWQY3tgPPjSaOVvDPjz7557/t2n7AQPGMCkNlS8ZNQKHRISjkghHBYBtNa54GbSqnvbDP01VM3LUT9kH/dv7/D87xf9crbuNb6tSpLPZQxfv36NqVUVq+eZbTWmy0EonKUEggXPDdpmubrrK7d7RByu6zEVOj+P3+PrgEogG1F3xuVFW9ZPfH4MdaISSk/roKFLMvaulbAhBB9VTBDSmmzdswx67RLt7IilUpz5cqPpFJphBBIKZpoFSiliEZtdu9+k4GBnS1JnLAQHUBXKfCnpJTRRrMnJn5nbOwzMpkM4XC48jytme97BIHi8OF3OXFitNn0ebPVjVOpNGNjn+N5Pps3b0IptdS4wfM8Ll78lt7eBMPDBxonQKsbX736M5lMhni8e8lQlfJDKBSip6eby5ev4bpee8AePUoRDocXhZJSkk7Pks8XME1zUTjHiZLJZHn8eK49YEKIht4olRYYHj5AX99Wcrn5hskghEBr3R6wRtn3BKzE8ePH2LfvrabeEEI0fFAA80XERmuN1rp2vNlslmKxBFD7TUr5XHs/N5iUklKpRLnsopQil8vj+wHlsksul2fdusITpXSiGIbR9OjaBjY9nebgwQMcOfJezXuxWBdDQ/sZHNyDYUiKxRKnT59hZmYW27ZXBiwcDpNOz3Djxi201riuy9DQfh4+/Jdk8jaOE8V1PXw/WDRLlwUsFuvi7t1JxsdvolRALjfP4OAeksnbnDz5KRs39iKlIB7vaSgzbQfzfR/bjmDbEZRSOI5DZ6fD+vUxensTJBIv1eY+jyBL2mRCCGZn5ygUipim8cL7mUuRhkYZ6jhRTp06g+/7xOM9KwfW7DgMw2BmZgbTNBvGlBCCIPCb7tcymG3beJ63aDnRWtckodGfep5HJBKms9NpT4zt3bubIAhwXa9pOWl05KnUNP3925uCteyxXbv6GRk5xIUL39DdvR7HidaKcvPEAM/zSaWm2bJlE0ePjjRfU32DXVDBlBAi2mzBpUs/cO3aL2Sz2ZaKMUAQKDo6LPr6tjI6+gGxWFezJfl6sAdCCLs1DQtIp9NAa2BKKWw70gpQ1Qpm3eKiYRgtgZmmQSKxYdk+kbTWhWrw63K5fG+tfLsppe5IQAHBg6mpr9cKmOd554WFMAAbcObLCz9ZlvXqKnvrj4hh7qh6zAXcL8+e/UgplV8tKK31/J+Tk+8DqtawsxC2hYifP3fu7WKxOLHSjbFyuXxrIpncWWGp9ccADKADiADWncl7H25IJN6JRCJvLGerc2Fh4bfM3Nz3r2x8+QugDARVgX22RIUAq3I1ltQHWCJXBcKrhJJXCSv+D6zWHK4byxrrdeOp4vbfAC/7LCNCeXP2AAAAAElFTkSuQmCC"><br/>将中国搜索<img src="data:image/png;base64,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">添加到主屏幕</div>');
    }
}

//判断IE的版本
function ieVersion() {
    var v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    //一旦不大于（即小于等于）某一版本
    while (
        /* Greater than some version*/
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : 0;
}

//是否IE8及以下，是则返回true
function isLteIE8() {
    return !-[1, ];
}

var browser = function() {
    var userAgent = navigator.userAgent.toLowerCase();
    return {
        version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        safari: /webkit/.test(userAgent),
        opera: /opera/.test(userAgent),
        msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
        mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
    };
}();



var x = [];

function createSomeNodes() {
    var div,
        i = 100,
        frag = document.createDocumentFragment();
    for (; i > 0; i--) {
        div = document.createElement("div");
        div.appendChild(document.createTextNode(i + " - " + new Date().toTimeString()));
        frag.appendChild(div);
    }
    document.getElementById("nodes").appendChild(frag);
}

function grow() {
    x.push(new Array(1000000).join('x'));
    createSomeNodes();
    setTimeout(grow, 1000);
}