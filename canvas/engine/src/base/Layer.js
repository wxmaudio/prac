/*
* 动画分层渲染
*/
(function(){
    var Layer = function(cfg) {

        this._canvas = null;

        this._ctx = null;

        Layer.superclass.constructor.call(this, cfg);
    }

    CSEngine.inherit(Layer, CSEngine.Container);

    /*
    * 设置画布层
    */ 
    Layer.prototype.setCanvas = function(canvas) {
       if(typeof canvas == 'string'){
          canvas = document.getElementById(canvas);
       }

       if(canvas && canvas.getContext('2d')){
            this._canvas = canvas;
            this._ctx = canvas.getContext('2d');
       }

       return this._canvas;
    };

    /*
    * 渲染画布层
    */
    Layer.prototype.render = function(){

        Layer.superclass.render.call(this, this._ctx);
    }

    /*
    * 清除画布层
    */
    Layer.prototype.clear = function(){
        if(this._ctx){
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }
    CSEngine.Layer = Layer;
})();