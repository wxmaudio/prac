"use strict";
var CSE = require('../core/base');
var AnimateObj = require('../core/AnimateObj');
var utils = require('../util/utils');
var win2canvas = require('../event/win2canvas');
var KeyEvent = require('../event/KeyEvent');

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
Player.prototype.addControl = function(elem){
    var self = this, move = false;
    //  添加鼠标和触屏控制
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

    //添加键盘控制
    KeyEvent.addListener();

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

/**
 * 设置玩家位置
 * @param {Event} 事件对象e
 */
Player.prototype.setPosition = function(e){
    //console.log(e.clientX,"y:",e.clientY);
    if(CSE.isMobile()){
        this.x = event.changedTouches[0].clientX - this.width/2;
        this.y = event.changedTouches[0].clientY - this.height/2;
    }else{
        var pos = win2canvas(this.canvas, e.clientX, e.clientY);
        this.x = pos.x - this.width/2;
        this.y = pos.y - this.height/2;
    }
    

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

Player.prototype.update = function(deltaTime) {
  if(KeyEvent.check('VK_LEFT') || KeyEvent.check('A')) {
        this.keyDownLeft = true;
    } else {
        this.keyDownLeft = false;
    }

    if(KeyEvent.check('VK_RIGHT') || KeyEvent.check('D')) {
        this.keyDownRight = true;
    } else {
        this.keyDownRight = false;
    }
    
    if(this.keyDownLeft) {
        this.x += - this.vx;   
    }
    if(this.keyDownRight) {
        this.x += this.vx;
        
    }
    this._insideBoundary();
    //this.parent.change(); 
    
};

module.exports = Player;
