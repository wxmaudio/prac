(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["GameBox"] = factory();
	else
		root["GameBox"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var Game = __webpack_require__(9);
	var Layer = __webpack_require__(11);
	var Ball = __webpack_require__(5);
	//var AnimateObj = require('../core/AnimateObj');
	var Point = __webpack_require__(7);

	var input = document.getElementById('inputText'),
	 	canvas = document.getElementById('canvas'),
	 	canvasWidth = 1000,
	 	canvasHeight = 500,
	 	ctx = canvas.getContext('2d'),
	 	colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];

	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	var animation = new Game();
	var shapeLayer = new Layer({canvas : canvas});
	animation.addLayer(shapeLayer);
	var last = null;
	function showShape(newBalls){
		var curBalls = shapeLayer.childs,
			curLen = curBalls.length,
			w = canvasWidth,
			h = canvasHeight;

			// console.log(last === newBalls);
			// last = newBalls;


	   if(curBalls.length === 0){
	   		for(var i = 0; i < newBalls.length; i++){
				shapeLayer.appendChild(new Ball(newBalls[i]));
			}
			return;
	   }

		//新小球多于现有小球数量
		if(curLen < newBalls.length){
			var more = newBalls.length - curLen;
			for(var i = 0; i < more; i++){
				shapeLayer.appendChild(
					new Ball({
						x : w / 2, 
						y : h / 2,
						//radius : 2
						//color : colors[~~(Math.random() * colors.length)],
					})
				);
			}
		}

		var used = 0;
		//随机选出一个点移动到目标位置，不断循环
		while(newBalls.length > 0){
			var j = Math.floor(Math.random() * newBalls.length);
			shapeLayer.childs[used].setTarget(newBalls[j]);
			//////shapeLayer.childs[used].x = newBalls[j].x;
			//////shapeLayer.childs[used].y = newBalls[j].y;
			// curBalls[j].addMoveQueue(
			// 	new Point({
			// 	  x: newBalls[j].x ,
		 //          y: newBalls[j].y ,
		 //          a: 1,
		 //          z: 5,
		 //          h: 0
			// 	})
			// );
			used ++;
			//从新小球对象中删除这个已经进入移动队列中的节点
			newBalls = newBalls.slice(0, j).concat(newBalls.slice(j + 1));
		}

		//处理现有的多余的不用的小球对象
		if(used < curLen){
			for(var k = used; k < curLen; k ++){
				// shapeLayer.childs[k].setTarget({
				// 	    x: Math.random() * w,
			 //            y: Math.random() * h,
			 //            a: 0.3, //.4  变透明
			 //            z: Math.random() * 4,
			 //            h: 0
				// 	});
				curBalls[k].addMoveQueue(
					new Point({
					    x: Math.random() * w,
			            y: Math.random() * h,
			            a: 0.3, //.4  变透明
			            z: Math.random() * 4,
			            h: 0
					})
				);
			}
		}
	}

	function showShape2(newBalls){
		for(var i = 0; i < newBalls.length; i++){
			shapeLayer.appendChild(new Ball(newBalls[i]));
		}
	}

	function drawText (text) {
	    animation.clear();
	    //shapeLayer.destroyChilds();

		var offsetCanvas = document.createElement('canvas'),
			octx = offsetCanvas.getContext('2d');
		offsetCanvas.width = canvasWidth;
		offsetCanvas.height = canvasHeight;
		
		//octx.clearRect(0, 0, canvasWidth, canvasHeight);

		octx.beginPath();
		octx.font = "200px Georgia";
		octx.fillStyle = 'black';
		octx.fillText(text, 0, canvasHeight / 2 - 100);
		octx.closePath();

		var imageData = octx.getImageData(0, 0, canvasWidth, canvasHeight),
			data = imageData.data, 
			gap = 6,
			newBalls = [],
			ball = null;

		//octx.clearRect(0, 0, canvasWidth, canvasHeight);
	    for(var i = 0; i < canvasHeight; i += gap){
	    	for(var j = 0; j < canvasWidth; j += gap){
	    		if(data[(i * canvasWidth + j)*4 + 3]){
	    // 			ball = new Ball({
					// 	x : j,
					// 	y : i,
					// 	radius:2
					// });	
					//shapeLayer.appendChild(ball);
	    			newBalls.push({
						x : j,
						y : i,
						radius:2
						//color : colors[~~(Math.random() * colors.length)]
					});	
	    		}
	    	}
	    }

	    showShape(newBalls);

	    animation.restart();

		// for(var i = 0; i < canvasHeight; i += gap){
	 //    	for(var j = 0; j < canvasWidth; j += gap){
	 //          if(data[(i * canvasWidth + j)*4 + 3]){
				
		// 		ball = new AnimateObj({
		// 			x : j,
		// 			y : i,
		// 			color : "red",
		// 			radius : 2
		// 		});
		// 		ball.customDraw = function (ctx) {
		// 		    var t = this;

		// 		    ctx.beginPath();
		// 		    ctx.fillStyle = this.color;
		// 		    ctx.arc(t.x, t.y, t.radius, 0, 2*Math.PI, true);
		// 		    ctx.closePath();
		// 		    ctx.fill();
		// 		}
		// 	    ball.render(ctx);
		// 	}
		//   }
		// }
	}

	input.addEventListener('change', function(){
	   drawText(input.value);
	}, false);










/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(3);
	var Component = __webpack_require__(4);
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



/***/ },
/* 3 */
/***/ function(module, exports) {

	var CSE = {
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
	    },

	    addHandler: function(element, type, handler) {
	            if (element.addEventListener) { /***W3C**/
	                element.addEventListener(type, handler, false);
	            } else if (element.attachEvent) { /***IE**/
	                element.attachEvent("on" + type, handler);
	            } else {
	                element["on" + type] = handler;
	            }
	        },

	    removeHandler: function(element, type, handler) {
	        if (element.removeEventListener) {
	            element.removeEventListener(type, handler, false);
	        } else if (element.detachEvent) {
	            element.detachEvent("on" + type, handler);
	        } else {
	            element["on" + type] = null;
	        }
	    },
	    isMobile : function(){
	        var sUserAgent= navigator.userAgent.toLowerCase(),
	        bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
	        bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
	        bIsMidp= sUserAgent.match(/midp/i) == "midp",
	        bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
	        bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
	        bIsAndroid= sUserAgent.match(/android/i) == "android",
	        bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
	        bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
	        bIsWebview = sUserAgent.match(/webview/i) == "webview";
	        return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
	     }

	}
	module.exports = CSE;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(3);
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



/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'user strict';
	var CSE = __webpack_require__(3);
	var AnimateObj = __webpack_require__(2);
	var utils = __webpack_require__(6);

	var Point = __webpack_require__(7);
	var Color = __webpack_require__(8);

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

/***/ },
/* 6 */
/***/ function(module, exports) {

	var utils = {
	  norm: function(value, min, max) {
	    return (value - min) / (max - min);
	  },

	  lerp : function(norm, min, max) {
	    return (max - min) * norm + min;
	  },

	  lerpAngle : function(a, b, t) {
	    var d = b - a;
	    if (d > Math.PI) d = d - 2 * Math.PI;
	    if (d < -Math.PI) d = d + 2 * Math.PI;
	    return a + d * t;
	  },

	  //按照某个速度靠近某个目标,速度由快变慢
	  lerpDistance : function(aim, cur, ratio) {
	    var delta = cur - aim;
	    return aim + delta * ratio;
	  },

	  map: function(value, sourceMin, sourceMax, destMin, destMax) {
	    return utils.lerp(utils.norm(value, sourceMin, sourceMax), destMin, destMax);
	  },

	  clamp: function(value, min, max) {
	    return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
	  },

	  /*
	  * 计算两个坐标点之间的距离
	  */
	  distance: function(p0, p1, details) {
	    var dx = p1.x - p0.x,
	      dy = p1.y - p0.y,
	      d = Math.sqrt(dx * dx + dy * dy);
	      return details ? [dx, dy, d] : d;
	  },

	  /*
	  * 计算两个坐标点之间的距离
	  */
	  distanceXY: function(x0, y0, x1, y1) {
	    var dx = x1 - x0,
	      dy = y1 - y0;
	    return Math.sqrt(dx * dx + dy * dy);
	  },

	  /*
	  * 两个圆形的碰撞检测
	  * @param {Object} c0 圆形对象0，对象格式为
	  * {
	  *   x:1,
	  *   y:2,
	  *   radius: 10 
	  * }
	  * @param c1 圆形对象1，格式同c0
	  */
	  circleCollision: function(c0, c1) {
	    return utils.distance(c0, c1) <= c0.radius + c1.radius;
	  },

	  /*
	  * 圆形与点的碰撞检测
	  * @param x 点的横坐标
	  * @param y 点的纵坐标
	  * @param circle 圆形对象，格式为：
	  * {
	  *   x:1,
	  *   y:2,
	  *   radius: 10 
	  * }
	  */
	  circlePointCollision: function(x, y, circle) {
	    return utils.distanceXY(x, y, circle.x, circle.y) < circle.radius;
	  },

	  /*
	  * 两个矩形对象的碰撞检测
	  * @param rect1 {Object} 矩形对象，格式为：
	  * {
	  *   x:1,
	  *   y:2,
	  *   width:22,
	  *   height:33
	  * }
	  * @param rect2 {Object} 矩形对象,格式同rect1
	  * @return {boolean} 发生碰撞返回true,否则返回false
	  */
	  rectCollision: function(rect1, rect2){
	        //左边缘检测
	    var leftCl = rect1.x > rect2.x + rect2.width,
	        //右边缘检测
	        rightCl = rect1.x + rect1.width < rect2.x,
	        //上边缘检测
	        topCl = rect1.y > rect2.y + rect2.height,
	        //下边缘检测
	        bottomCl = rect1.y + rect1.height < rect2.y;

	        //以上四个检测有一个为真，则不会发生碰撞
	        return !(leftCl || rightCl ||  topCl || bottomCl);
	  },

	  /*
	  * 判断vaule的大小是否在min和max之间
	  */
	  inRange: function(value, min, max) {
	    return value >= Math.min(min, max) && value <= Math.max(min, max);
	  },

	  /*
	  * 判断点是否在矩形区域中
	  */
	  pointInRect: function(x, y, rect) {
	    return utils.inRange(x, rect.x, rect.x + rect.width) &&
	      utils.inRange(y, rect.y, rect.y + rect.height);
	  },

	  

	  rangeIntersect: function(min0, max0, min1, max1) {
	    return Math.max(min0, max0) >= Math.min(min1, max1) &&
	      Math.min(min0, max0) <= Math.max(min1, max1);
	  },

	  rectIntersect: function(r0, r1) {
	    return utils.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
	      utils.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
	  },

	  degreesToRads: function(degrees) {
	    return degrees / 180 * Math.PI;
	  },

	  radsToDegrees: function(radians) {
	    return radians * 180 / Math.PI;
	  },

	  randomRange: function(min, max) {
	    return min + Math.random() * (max - min);
	  },

	  randomInt: function(min, max) {
	    return min + Math.random() * (max - min + 1);
	  },

	  getmiddle: function(p0, p1) {
	    var x = p0.x,
	      x2 = p1.x;
	    middlex = (x + x2) / 2;
	    var y = p0.y,
	      y2 = p1.y;
	    middley = (y + y2) / 2;
	    pos = [middlex, middley];

	    return pos;
	  },

	  getAngle: function(p0, p1) {
	    var deltaX = p1.x - p0.x;
	    var deltaY = p1.y - p0.y;
	    var rad = Math.atan2(deltaY, deltaX);
	    return rad;
	  },

	  inpercentW: function(size) {
	    return (size * W) / 100;
	  },

	  inpercentH: function(size) {
	    return (size * H) / 100;
	  }

	}
	module.exports = utils;

/***/ },
/* 7 */
/***/ function(module, exports) {

	var Point = function (args) {
	  this.x = args.x;
	  this.y = args.y;
	  this.z = args.z;
	  this.a = args.a;
	  this.h = args.h;
	};

	module.exports = Point;

/***/ },
/* 8 */
/***/ function(module, exports) {

	var Color = function (r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	Color.prototype.render = function() {
		return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
	};

	module.exports = Color;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(3);
	var Component = __webpack_require__(4);
	__webpack_require__(10);
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
	 CSE.inherit(Game, Component);
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

	 module.exports = Game;


/***/ },
/* 10 */
/***/ function(module, exports) {

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license
	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	    }
	    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	        var id = window.setTimeout(function() {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
	        clearTimeout(id);
	    };
	}());

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(3);
	/*
	* 动画分层渲染
	*/
	var Container = __webpack_require__(12);
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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(3);
	var AnimateObj = __webpack_require__(2);

	/**
	* 容器组件基类
	*/

	var Container = function (cfg) {
	    /*
	    * 子组件对象数组
	    */
	    this.childs = [];

	    //调用父类的构造函数
	    Container.superclass.constructor.call(this, cfg);
	}
	CSE.inherit(Container, AnimateObj);

	/**
	* 初始化 - 覆盖继承组件的方法
	*/
	Container.prototype.init = function () {
	    var childs = this.childs;

	    for(var i = 0; i < childs.length ; i++){
	        if(!childs[i].initialized){//避免重复初始化
	            childs[i].init();
	        }
	        
	    }
	    //调用父级初始化
	    Container.superclass.init.call(this);
	}

	/*
	* 渲染组件
	* @param {Context Object} ctx
	*/
	Container.prototype.render = function (ctx) {
	    //绘制子组件
	    var childs = this.childs;
	    for(var i = 0, len = childs.length; i < len; i++){
	        childs[i].render(ctx);
	    }

	    Container.superclass.render.call(this, ctx);
	}

	/*
	* 更新组件
	* @param {Number} deltaTime
	*/
	Container.prototype.update = function (deltaTime) {
	    //更新子组件
	    var childs = this.childs;
	    for(var i = 0, len = childs.length; i < len; i++){
	        childs[i].update.call(childs[i],deltaTime);
	    }

	    Container.superclass.update.call(this, deltaTime);
	}


	/**
	 * 销毁子组件
	 */
	Container.prototype.destroyChilds = function(){
	    var childs = this.childs;
	    //若已经销毁，则直接返回
	    if(!childs) return;

	    for(var i = 0; i < childs.length; i++){
	        if(childs[i].initialized){
	            childs[i].destroy();
	        }   
	    }
	    
	    this.childs = [];
	}

	/**
	 * 销毁组件-覆盖继承组件的方法
	 */
	Container.prototype.destroy = function(){
	    //销毁子组件
	    this.destroyChilds();
	    //删除引用
	    this.childs = null;
	    //调用继承组件销毁方法
	    //Container.superclass.destroy.call(this);
	}

	Container.prototype.appendChild = function(child){
	    this.addChildAt(child, this.childs.length-1);
	}

	Container.prototype.appendChilds = function(childs) {
	    for(var i = 0; i < childs.length ; i++){
	        this.appendChild(childs[i]);
	    }
	};

	Container.prototype.addChildAt = function(child, i) {
	    child.parent = this;
	    this.childs.splice(i,0,child);
	};

	Container.prototype.removeChild = function(child) {
	   var childs = this.childs;

	   for(var i = 0, len = childs.length; i < len; i++){
	        if(childs[i] === child){
	            this.removeChildAt(i);
	            break;
	        }   
	   }

	};

	Container.prototype.removeChildAt = function(i){
	    var child = this.childs.splice(i);

	    child && (child.parent = null);
	}
	module.exports = Container;


/***/ }
/******/ ])
});
;