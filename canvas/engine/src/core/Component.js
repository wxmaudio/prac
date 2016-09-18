var CSE = require('./base');
/**
* 组件基类, 定义组件的生命周期
*/

var Component = function(cfg) {

    /**
     * 初始化状态
     */
    this.initialized = false;

    /**
     * read only
     * 父容器组件
     */
    this.parent = null;

    // 扩展属性
    CSE.extend(this, cfg);
}
/**
 * 事件定义
 * oninit 初始化
 * ondestory 销毁
 */
Component.prototype.oninit = CSE.fn;
Component.prototype.ondestory = CSE.fn;

/**
 * 组件初始化
 */
Component.prototype.init = function() {
    this.initialized = true;
    this.oninit();
}
/**
 * 组件销毁
 */
Component.prototype.destory = function() {
    if(this.parent && this.parent.removeChild) {
        this.parent.removeChild(this);
        this.parent = null;
    }
    
    this.ondestory && this.ondestory();
    this.oninit = this.ondestory = null;
}

module.exports = Component;

