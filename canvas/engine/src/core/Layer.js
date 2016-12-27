var CSE = require('./base');
/*
* 动画分层渲染
*/
var Container = require('./Container');
var Layer = function(cfg) {
    /*
    * 分层渲染的画布对象
    */
    this.canvas = null;
    /*
    * 画布2d绘图上下文 
    */
    this.context = null;
    /**
     * @private
     * 分层状态是否改变
     */
    this._change = true;

    Layer.superclass.constructor.call(this, cfg);

    if(cfg && cfg.canvas){
        this.setCanvas(cfg.canvas);
    }
}

CSE.inherit(Layer, Container);

/*
* 设置画布层
*/ 
Layer.prototype.setCanvas = function(canvas) {
   if(typeof canvas == 'string'){
      canvas = document.getElementById(canvas);
   }

   if(canvas && canvas.getContext('2d')){
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
   }

   return this.canvas;
};

/**
 * 改变分层状态
 */
Layer.prototype.change = function() {
    this._change = true;
}

/*
* 渲染画布层
*/
Layer.prototype.render = function(){
    if(this._change) {
        Layer.superclass.render.call(this, this.context);
        this._change = false;
    }
}

/*
* 强制清除画布层
*/
Layer.prototype.forceClear = function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

/*
* 清除画布层
*/
Layer.prototype.clear = function(){
    //画布层变化时才清除画布
    if(this.context && this._change){
        this.forceClear();
    }
}

module.exports = Layer;
