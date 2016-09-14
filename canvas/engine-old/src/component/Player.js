"use strict";
//var CSE = CSE;
//var utils = require('./base/utils');
var AnimateObj = CSE.AnimateObj;

var Player = function (cfg) {
    this.width = 113;
    this.height = 106;
    if(CSE.isMobile()){
        this.eventType = {
            start : 'touchstart',
            move : 'touchmove',
            end : 'touchend'
        }
    }else{
        this.eventType = {
            start : 'mousedown',
            move : 'mousemove',
            end : 'mouseup'
        }
    }
    
    Player.superclass.constructor.call(this, cfg);
}
CSE.inherit(Player, AnimateObj);

/*
* 发生碰撞后的回调函数
*/
Player.prototype.onHit = function(){};

/*
* 用鼠标或手势或键盘控制player
*/
Player.prototype.addControl = function(){
    var elem = document.getElementById('gameCanvas');
    var self = this, move = false;
    CSE.addHandler(elem,this.eventType.start,function(e){
        self.setPosition(e);
        move = true;
    });
    CSE.addHandler(elem,this.eventType.move,function(e){
        e.preventDefault();
        if(move){
            self.setPosition(e);
        }
    });
    CSE.addHandler(elem,this.eventType.end,function(e){
        move = false;
    });
    return this;
};

/**
 * 调整位置到边界范围内
 * @private
 */
Player.prototype._insideBoundary = function() {
    var rangeX = [0, 320],
        rangeY = [0, 640];

    //左右边界检查
    if(this.x < rangeX[0]) {
        this.x = rangeX[0];
    } else if(this.x > rangeX[1] - this.width) {
        this.x = rangeX[1] - this.width;
    }

    //上下边界检查
    if(this.y < rangeY[0]){
        this.y = rangeY[0];
    } else if(this.y > rangeY[1] - this.height){
        this.y = rangeY[1] - this.height;
    }

}

Player.prototype.setPosition = function(e){
    this.x = e.clientX - this.width/2;
    this.y = e.clientY - this.height/2;

    this._insideBoundary();
 
    //刷新父层画布
    this.parent.change();

    return this;
}

/*
* 检测与目标列表的碰撞情况
* @targetList {Array} 目标对象数组
*/
Player.prototype.hitTest = function(targetList){
    var target = 0;
    for(var i = 0, len = targetList.length; i < len; i++){
        target = targetList[i];

        //与可见颗粒发生碰撞
        if(target.visible && utils.rectCollision(this, target)){
        //if(target.visible && utils.circleCollision(this, target)){
            this.onHit.call(this, target, i);
        }
    }   
}

Player.prototype.customDraw = function(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
};

CSE.Player = Player;
//module.exports = Player;