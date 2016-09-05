var CSEngine = {
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
    }
}
//module.exports = CSEngine;