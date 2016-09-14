//var CSE = require('./base');
//var Component = require('./Component');
CSE.Game = (function () {
   var Game = function (cfg) {
    /**
     * read only
     * 游戏的运行状态
     */
     this.playing = false;
     /**
     * 运行游戏的容器对象，可向其添加动画对象
     */
     this.layers = [];
    /**
     * @private
     * 定时器句柄
     */
    this._timeout = null;

    Game.superclass.constructor.call(this, cfg);

   }
   CSE.inherit(Game, CSE.Component);
   /*
   * Game 事件
   * onstart 开始游戏
   * onpause 暂停游戏
   * onstop 停止游戏
   */
   Game.prototype.onstart = CSE.fn;
   Game.prototype.onpause = CSE.fn;
   Game.prototype.onstop = CSE.fn;

   /*
   * 开始游戏
   */
   Game.prototype.start = function(){
        if(!this.playing){
            this.playing = true;
            window.requestAnimationFrame(this._run.bind(this));
            this.onstart();
        }
        
   }

   /*
   * 重新开始
   */
   Game.prototype.restart = function(){
      this.clear();
      this.start();
   }

   /*
   * 设置游戏画布层
   */
   Game.prototype.addLayer = function(obj){
      !this.layers && (this.layers = []);

      this.layers.push(obj);
   }
  
   /*
   * 清空画布
   */
   Game.prototype.clear = function(){
      var layers = this.layers;

      if(layers && layers.length > 0){  
          for(var i = 0, len = layers.length; i < len; i++ ){
            layers[i].clear();
          }
      }
   }

   /**
    * 渲染游戏画布层
    */
    Game.prototype.render = function() {
      var layers = this.layers;

      if(layers && layers.length > 0){
            for(var i = 0, len = layers.length; i < len; i++ ){
              layers[i].render();
            }
        }
        
    }

    /**
    * 更新游戏画布层
    */
    Game.prototype.update = function(timestamp) {
      var layers = this.layers;

      if(layers && layers.length > 0){
            for(var i = 0, len = layers.length; i < len; i++ ){
              layers[i].update(timestamp);
            }
        }
        
    }



   /*
   * 运行游戏
   */
   Game.prototype._run = function(timestamp){
        this.update(timestamp);
        this.clear();
        this.render();

        this._timeout = window.requestAnimationFrame(this._run.bind(this));
   }

   /*
   * 暂停游戏
   */
   Game.prototype.pause = function(){
        this.playing = false;
        this.onpause();
   }

   /*
   * 停止游戏
   */
   Game.prototype.stop = function(){
      if(this.playing) {
        window.cancelAnimationFrame(this._timeout);
        this.playing = false;
        this.onstop();
      }
   }

   /*
   * 销毁游戏
   */
   Game.prototype.destroy = function(){
      this.stop();
      this.clear();

      var layers = this.layers;
      if(layers && layers.length > 0){
          for(var i = 0, len = layers.length; i < len; i++ ){
            layers[i].destroy();
          }
      }
      this.layers = null;

      Game.superclass.destory.call(this);
   }

   return Game;
})();