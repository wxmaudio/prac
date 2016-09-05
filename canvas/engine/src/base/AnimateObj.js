//var CSEngine = require('./base');
//var Component = require('./Component');
CSEngine.AnimateObj = (function() {
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
        * 水平速度
        */
        this.vx = 0;
        /*
        * 垂直速度
        */
        this.vy = 0;
        /*
        * 水平加速度
        */
        this.ax = 0;
        /*
        * 垂直加速度
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

        //调用父类的构造函数
        AnimateObj.superclass.constructor.call(this, cfg);
        
    }
    /**
     * 继承自Component类
     */
    CSEngine.inherit(AnimateObj, CSEngine.Component);

    /**
     * 事件定义
     * onshow 显示
     * onhide 隐藏
     * onupdate 状态更新
     * onrender 渲染
     * ondraw 在画布上绘制
     */
    AnimateObj.prototype.onshow = CSEngine.fn;
    AnimateObj.prototype.onhide = CSEngine.fn;
    AnimateObj.prototype.onupdate = CSEngine.fn;
    AnimateObj.prototype.onrender = CSEngine.fn;
    AnimateObj.prototype.ondraw = CSEngine.fn;

    /**
     * 在画布上绘制组件
     * @param {Context Object} ctx
     */
    AnimateObj.prototype.draw = function (ctx) {
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
        this.draw(ctx);

        //恢复画布状态
        ctx.restore();
        
        this.onrender();
    }

    /**
    * 更新组件
    * @deltaTime 绘制时间间隔
    */
    AnimateObj.prototype.update = function (deltaTime) {
        console.log(deltaTime);
       // 计算移动速度
        this.vx = this.vx + this.ax * (deltaTime/1000);
        this.vy = this.vy + this.ay * (deltaTime/1000);

        // 计算精灵位置
        this.x += this.vx ;
        this.y += this.vy ;

        this.onupdate(deltaTime);
    }

    return AnimateObj;
})();
