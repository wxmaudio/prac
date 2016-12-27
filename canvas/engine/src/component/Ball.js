'user strict';
var CSE = require('../core/base');
var AnimateObj = require('../core/AnimateObj');
var utils = require('../util/utils');

var Point = require('./Point');
var Color = require('./Color');

function Ball(cfg) {
    //调用父类的构造函数
    Ball.superclass.constructor.call(this, cfg);

    this.radio = 0.07;//靠近速率

    this.z = 2;
    this.a = 1;
    this.h = 0;
    

    this.color = new Color(255, 0, 0, 1);
    //this.color = new Color(34, 148, 157, 1);

    //要靠近的目标对象队列
    this.queue = [];

    

    //当前要靠近的目标对象
    this.target = this.clone();
    this.autoChange = true;
    this.radius = 3;
}

CSE.inherit(Ball, AnimateObj);

Ball.prototype.clone = function() {
    return new Point(this);
};

Ball.prototype.distanceTo = function(p) {
    return utils.distance(this, p, true);
};

/**
 * 向p点方向运动,运动完成返回true, 未完成为false
 * @param  {[type]} p [description]
 * @return {boolean}   运动完成返回true, 未完成为false
 */
Ball.prototype._moveTo = function(p) {
    var details = this.distanceTo(p);
    //移动的点坐标不合法，则直接返回移动完成
    if(details.length < 3){
        return true;
    }

    var dx = details[0],
        dy = details[1],
        d  =  details[2];

    if(d > 1){
        this.x += dx * this.radio;
        this.y += dy * this.radio;
    }else{//靠近目标
        return true;
    } 
    return false;   
};

/**
 * 添加运动点队列
 * @param {[type]} p [description]
 */
Ball.prototype.addMoveQueue = function(p) {
    if(this.distanceTo(p) > 1){
        this.queue.push(p);
    }
};

Ball.prototype.setTarget = function(p) {
    this.target.x = p.x || this.x;
    this.target.y = p.y || this.y;
    this.target.z = p.z || this.z;
    this.target.a = p.a || this.a;
    this.target.h = p.h || 0;
};


Ball.prototype.update = function(deltaTime){
    var p =null;
    if(this._moveTo(this.target)){
        //已移动到目标位置后则开始移向下一个位置
        p = this.queue.shift();
        if(p){
            this.setTarget(p);
            console.log("target", p);
        }else{
            //所有的移动任务完成
            this.x += Math.sin(Math.random() * 2 * Math.PI);
            this.y += Math.sin(Math.random() * 2 * Math.PI);
        }
    }

    //透明度变化
    //小球与目标小球透明度的差
    d = this.target.a - this.color.a;
    //按照0.05的比率接近目标透明度
    this.color.a = Math.max(0.1, this.color.a + (d * 0.05));
    
    
    this.autoChange &&  this.parent && this.parent.change && this.parent.change();
    this.onupdate(deltaTime);
}

Ball.prototype.customDraw = function (ctx) {
    var t = this;
    
    ctx.beginPath();
    ctx.fillStyle = this.color.render();
    ctx.arc(t.x, t.y, t.radius, 0, 2*Math.PI, true);
    ctx.closePath();
    ctx.fill();
}
module.exports = Ball;