var CSE = require('./base');
var Component = require('./Component');
/**
* 显示组件基类
*/
var AnimateObj = function (cfg) {
   /**
     * 绘制时的x轴位置
     */
    this.x = 0;
    /**
     * 绘制时的y轴位置
     */
    this.y = 0;
    /*
    * x轴移动范围
    */
    this.rangeX = [-9999,999999];
    /*
    * y轴移动范围
    */
    this.rangeY = [-9999,999999];
    /*
    * 水平速度, 默认速度为0
    */
    this.vx = 0;
    /*
    * 垂直速度，默认速度为0
    */
    this.vy = 0;
    /*
    * 水平加速度，默认加速度为0
    */
    this.ax = 0;
    /*
    * 垂直加速度，默认加速度为0
    */
    this.ay = 0;
    /**
     * 宽度
     */
    this.width = 0;
    /**
     * 高度
     */
    this.height = 0;
    /**
     * 半径
     * 仅在绘制圆形物体时有效
     */
    this.radius = 0;
    /**
     * 透明度
     */
    this.alpha = 1;
    /**
     * 旋转角度
     */
    this.rotation = 0;
    /**
     * 水平翻转
     */
    this.flipX = false;
    /**
     * 垂直翻转
     */
    this.flipY = false;
    /**
     * 水平缩放
     */
    this.scaleX = 1;
    /**
     * 垂直缩放
     */
    this.scaleY = 1;
    /**
     * read only
     * 显示状态
     */
    this.visible = true;
    /*
    * 自动通知父级更新
    */
    this.autoChange = false;

    //调用父类的构造函数
    AnimateObj.superclass.constructor.call(this, cfg);
    
}
/**
 * 继承自Component类
 */
CSE.inherit(AnimateObj, Component);

/**
 * 事件定义
 * onshow 显示
 * onhide 隐藏
 * onupdate 状态更新
 * onrender 渲染
 * ondraw 在画布上绘制
 */
AnimateObj.prototype.onshow = CSE.fn;
AnimateObj.prototype.onhide = CSE.fn;
AnimateObj.prototype.onupdate = CSE.fn;
AnimateObj.prototype.onrender = CSE.fn;
AnimateObj.prototype.ondraw = CSE.fn;

//边界检查
AnimateObj.prototype.borderCheck = function (){

}
/**
 * 用户自定义的在画布上绘制逻辑
 * @param {Context Object} ctx
 */
AnimateObj.prototype.customDraw = function (ctx) {
}

/**
 * 在画布上绘制组件
 * @private
 * @param {Context Object} ctx
 */
AnimateObj.prototype._draw = function (ctx) {
    this.customDraw(ctx);
    this.ondraw();
}

/**
 * @private
 * 画布变形处理
 * @param {Context Object} ctx
 */
AnimateObj.prototype._transform = function(ctx) {

}

/**
 * 渲染组件
 * @param {Context Object} ctx
 */
AnimateObj.prototype.render = function (ctx) {
    //不可见，或者透明，则不绘制
    if(!this.visible || this.alpha <= 0) {
        return false;
    }

    //保存当前画布状态
    ctx.save();

    //画布变形处理
    this._transform(ctx);
    this._draw(ctx);

    //恢复画布状态
    ctx.restore();
    
    this.onrender();
}

/**
* 更新组件
* @deltaTime 绘制时间间隔
*/
AnimateObj.prototype.update = function (deltaTime) {
    // 计算移动速度
    this.vx = this.vx + this.ax * (deltaTime/1000);
    this.vy = this.vy + this.ay * (deltaTime/1000);

    // 计算精灵位置
    this.x += this.vx ;
    this.y += this.vy ;

    if(this.x < this.rangeX[0] - this.width || this.x > this.rangeX[1] + this.width
    && this.y < this.rangeY[0] - this.height || this.y > this.rangeY[1] + this.height){
        this.visible = false;
    }

    //若autoChange为true, 自动更新父亲
    this.autoChange &&  this.parent && this.parent.change && this.parent.change();
    this.onupdate(deltaTime);
}

module.exports = AnimateObj;

