// 滚动条的信息
var scrollPos = function () {
    var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var left = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    return {
        left: left,
        top: top
    };
};

// 得到鼠标的文档位置
var mouse_info = function (e) {
    var e1 = e || window.event,
        _scroll_info = scrollPos();
    if (e1.pageX) {
        return [parseInt(e1.pageX), parseInt(e1.pageY)];
    } else {
        return [parseInt(e1.clientX) + _scroll_info.left,
            parseInt(e1.clientY) + _scroll_info.top];
    }
};
function getPointerPositionInDocument(eventObject) {
    eventObject = eventObject || window.event;
    var x = eventObject.pageX || (eventObject.clientX +
        (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y= eventObject.pageY || (eventObject.clientY +
        (document.documentElement.scrollTop || document.body.scrollTop));
    //x and y now contain the coordinates of the mouse relative to the document origin
    return {'x':x,'y':y};
}

/**
 * Retrieve the size of the browser window.
 */
function getBrowserWindowSize() {
    var de = document.documentElement;
    
    // window.innerWidth for most browsers
    // document.documentElement.clientWidth for MSIE in strict mode
    // document.body.clientWidth for MSIE in quirks mode
    
    return {
        'width':(
            window.innerWidth 
            || (de && de.clientWidth ) 
            || document.body.clientWidth),
        'height':(
            window.innerHeight 
            || (de && de.clientHeight ) 
            || document.body.clientHeight)
    }
};

// 判断元素是否可视区域内
    var is_view = function (x, y, w, h) {
        var _scrollInfo = scrollPos();
        var windowSize = getBrowserWindowSize();
        var halfWidth = Math.round(w / 2);
        var halfHeight = Math.round(h / 2);
        var _x1 = _scrollInfo.left - halfWidth; //左边缘
        var _y1 = _scrollInfo.top - halfHeight; 
        var _x2 = windowSize.width + _scrollInfo.left - halfWidth;
        var _y2 = windowSize.height + _scrollInfo.top - halfHeight;

        if (x < _x1 || x > _x2 || y < _y1 || y > _y2) {
            return false;
        } else {
            return true;
        }
    };