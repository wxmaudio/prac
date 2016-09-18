var CSE = {
   /**
    * 供全局引用的空函数
    */
    fn : function () {},
	/**
     * 通过原型实现的类继承
     * @param {Function} childClass
     * @param {Function} parentClass
     */
    inherit : function(childClass, parentClass) {
        var Constructor = new Function();
        Constructor.prototype = parentClass.prototype;
        childClass.prototype = new Constructor();
        childClass.prototype.constructor = childClass;
        childClass.superclass = parentClass.prototype;

        if(childClass.prototype.constructor == Object.prototype.constructor) {
            childClass.prototype.constructor = parentClass;
        }
    },
    /**
     * 扩展和覆盖一个对象的属性
     * @param {Object} obj
     * @param {Object} newProperties
     */
    extend : function(obj, newProperties) {
        var key;

        for(key in newProperties) {
            if(newProperties.hasOwnProperty(key)) {
                obj[key] = newProperties[key];
            }
        }

        return obj;
    },

    addHandler: function(element, type, handler) {
            if (element.addEventListener) { /***W3C**/
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) { /***IE**/
                element.attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },

    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    isMobile : function(){
        var sUserAgent= navigator.userAgent.toLowerCase(),
        bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
        bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
        bIsMidp= sUserAgent.match(/midp/i) == "midp",
        bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
        bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
        bIsAndroid= sUserAgent.match(/android/i) == "android",
        bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
        bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
        bIsWebview = sUserAgent.match(/webview/i) == "webview";
        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
     }

}
module.exports = CSE;