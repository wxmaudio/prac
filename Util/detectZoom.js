// 判断浏览器放大缩小功能组件
// 100 为正常，小于100 则缩小，大于100 则放大
define("common:chinaso/page/common/controller/detect.zoom", function (require, exports, module) {
    
    "use strict";
    
    function DetectZoom() {
        var ratio = 0,
            screen = window.screen,
            ua = navigator.userAgent.toLowerCase();
        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        } else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }
        if (ratio) {
            ratio = Math.round(ratio * 100);
        }
        return ratio;
    }
    return DetectZoom;
});