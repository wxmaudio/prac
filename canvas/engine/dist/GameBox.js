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

	__webpack_require__(1)();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 游戏主逻辑
	 */

	var ImageLoader = __webpack_require__(2);
	var imageList = __webpack_require__(3);
	var getParticles = __webpack_require__(4);
	var Player = __webpack_require__(8);
	var getMovingBg = __webpack_require__(12);
	var Game = __webpack_require__(13);
	var Layer = __webpack_require__(15);

	/**
	 * 加载过程中提示效果
	 * @param  {number} loaded 已经加载数目
	 * @param  {number} total 总数目
	 * @return {null}
	 */
	function loading(loaded, total){
	   var percent = (loaded / total) * 100;
	   document.getElementById("loadProgress").innerHTML = percent;
	}

	//UI
	//记录分数
	var score = 0;
	function setScore(){
	    score ++;
	    document.getElementById("score").innerHTML = score;
	}

	/*
	* 初始化游戏背景画布
	*/
	function initBgLayer(){
	    var bgLayer = new Layer({canvas: "bg"});
	    var bgctx = bgLayer.context;
	    //初始化背景画布图案
	    bgctx.drawImage(ImageLoader.get('bg'), 0, 0);

	    //绘制游戏背景
	    var bg = getMovingBg(ImageLoader.get('bg'), 320, 1126, 1, true);
	    bgLayer.appendChild(bg);
	    return bgLayer;
	}

	/*
	* 绘制游戏主画布
	 */
	function initMainLayer(){
	    var layer = new Layer();
	    var canvas = layer.setCanvas("main");
	    var playctx = layer.context;

	    //绘制小球
	    var particleNum = 15;
	    var particles = getParticles(particleNum, canvas.width, canvas.height);
	    layer.appendChilds(particles);


	    //绘制玩家
	    var player = new Player({
	       img : ImageLoader.get('player'),
	       canvas : canvas,
	       width : 112,
	       height : 106,
	       radius : 50,//用于碰撞检测
	       x : canvas.width/2 - 50,
	       y : canvas.height/2 - 40,
	       vx : 2,
	       vy : 0
	    });
	    //添加游戏鼠标控制
	    player.addControl(document.getElementById('gamePannel'));
	    //注册发生碰撞时的回调
	    player.onHit = function(target, index){
	        target.visible = false;
	        setScore();
	    }
	    layer.appendChild(player);


	    //拓展画布更新函数，循环利用节点池中的节点,同时进行碰撞检测
	    layer.onupdate = function(){
	        var alive = 0, hideIndexs = [];
	        //与player的碰撞检测
	        player.hitTest(particles);

	        //注意：layer中可能有多种类型
	        layer.childs.forEach(function(child, i){
	            if(typeof child.type === 'string' && child.type == 'particle'){

	                if(child.visible){
	                    alive++;
	                }else{
	                    hideIndexs.push(i);
	                }
	            }    
	        });

	        //向屏幕中产生回收的旧节点
	        if(alive < 10 && hideIndexs.length > 0){
	            var index = hideIndexs.shift(),child;
	            child = layer.childs[index];

	            child.x = Math.round(canvas.width * Math.random());
	            child.y = 0;
	            child.visible = true;
	        }
	    }

	    return layer;
	}

	/*
	* 游戏初始化
	 */
	function initGame(){
	    //新建游戏对象
	    var game = new Game();

	    //创建背景画布层
	    var bgLayer = initBgLayer();

	    //创建画布层
	    var mainLayer = initMainLayer();

	    game.addLayer(bgLayer);
	    game.addLayer(mainLayer);

	    //注册游戏控制事件
	    document.getElementById('start').onclick = function(){
	        game.start()
	    };
	    document.getElementById('stop').onclick = function(){
	        game.stop();
	    }
	    document.getElementById('destroy').onclick = function(){
	        game.destroy();
	    };

	    return game;
	}

	/*
	* 游戏加载成功回调
	 */
	function loaded(state){
	    if(!state){
	        alert('加载游戏出错，请稍后再试！');
	        return false;
	    }

	    //显示游戏操作按钮
	    document.getElementById("operation").style.display = 'block'; 
	    initGame();
	}

	function init(){
	   //加载游戏中的所有图片
	    ImageLoader.load(imageList,loaded , loading); 
	}

	module.exports = init;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	* 加载图片资源
	*/
	"use strict"; 

	/*
	* 已加载图片对象
	* 包含图片的加载状态 state
	* @private
	*/
	var _loadedImages = {
	  state : 'init'
	};
	/*
	* 已加载图片数量
	*/
	var loadedNums = 0;

	function loadOneImage(url, callback, key){
	   //若已经缓存，则直接返回
	   if(_loadedImages[key]){
	      callback(true);
	      return ;
	   }

	   var img = new Image();

	   img.src = url;

	   img.onload = function(){
	      //缓存图片
	      key && (_loadedImages[key] = img);
	      callback(true);

	      //清除绑定事件
	      img.onload = img.onerror = null;
	   }

	   img.onerror = function(){
	      key && (_loadedImages[key] = null);
	      callback(false);
	   }
	}

	/**
	 * 加载图片数组
	 * @param  {Object} images 图片数组
	 * @param  {Function} onComplete 加载成功回调
	 * @param {Function} [onProgress] 加载过程中回调，可用于提示加载进度
	 * @param  {string} [timeout] 超时时间，默认10000ms
	 * @return {[type]}
	 */
	function loadImages(images, onComplete, onProgress, timeout){

	    if(images.length === 0){
	        onComplete(true);
	    }

	    /*
	    * 图片加载定时器
	    */
	    var _imageTimeOut = null;

	    //超时则返回
	    _imageTimeOut = setTimeout(function(){
	       onComplete(false);
	    }, timeout || 10000);

	    function onloaded(){
	        loadedNums++;
	        //通知加载进度
	        if(typeof onProgress === 'function'){
	           onProgress(loadedNums, images.length);
	        }
	      
	        if(images.length === loadedNums){

	            _loadedImages.state = 'loaded';
	            //图片加载完成，清除定时器
	            clearTimeout(_imageTimeOut);

	            onComplete(true);
	        }
	    }

	    _loadedImages.state = 'loading';

	    for(var i = 0; i< images.length; i++){
	        loadOneImage(images[i].url, onloaded, images[i].key, timeout);
	    } 
	}
	/**
	 * 获取已加载的Image对象
	 * @param {String} id
	 */
	function get(id){
	    return _loadedImages[id];
	}

	/** 
	 * 获得图片加载状态
	 * @return {string} 取值代表的含义
	 * init : 已初始化
	 * loading : 加载中
	 * loaded : 加载完成
	 */
	function getState(){
	  return _loadedImages.state;
	}

	function getList(){
	  return _loadedImages;
	}

	var ImageLoader = {
	  load : loadImages,
	  get : get,
	  getList : getList,
	  getState : getState
	}

	module.exports = ImageLoader;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * 图像资源列表
	 */
	var ImageRes = [
			{ 
			    key : 'bg',
			    url : './images/bg.jpg'
			},
			{
			    key : 'player',
			    url : './images/player.png'
			}
		];


	module.exports = ImageRes;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var AnimateObj = __webpack_require__(5);
	var particles = [];

	function getParticles (num, width, height) {
		for(var i = 0; i < num ; i ++){
		    var colorArr = ["#005588", "#080"];
		    //var scoreArr = [1,2];
		    var type = Math.random()>0.5? 1:0;
		    var particle = new AnimateObj({
		        index: i,//序号
		        type : 'particle',//标明孩子节点类型
		        x : Math.round(width * Math.random()),
		        y : 0,
		        rangeX : [0, width],
		        rangeY : [0, height],
		        vy : 2 * Math.random(),//垂直向下运动
		        vx : 0, //垂直向上运动
		        radius : 10,//半径大小
		        width : 20,
		        height : 20,
		        color : colorArr[type],
		        autoChange : true
		    });
		    particle.customDraw = function (ctx) {
		        var t = this;

		        ctx.beginPath();
		        ctx.fillStyle = t.color;
		        ctx.arc(t.x, t.y, t.radius, 0, 2*Math.PI, true);
		        ctx.closePath();
		        ctx.fill();
		    }

		    particles.push(particle);
		}
		return particles;
	}
	module.exports = getParticles;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(6);
	var Component = __webpack_require__(7);
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(6);
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var CSE = __webpack_require__(6);
	var AnimateObj = __webpack_require__(5);
	var utils = __webpack_require__(9);
	var win2canvas = __webpack_require__(10);
	var KeyEvent = __webpack_require__(11);

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


/***/ },
/* 9 */
/***/ function(module, exports) {

	var utils = {
	  norm: function(value, min, max) {
	    return (value - min) / (max - min);
	  },

	  lerp: function(norm, min, max) {
	    return (max - min) * norm + min;
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
	  distance: function(p0, p1) {
	    var dx = p1.x - p0.x,
	      dy = p1.y - p0.y;
	    return Math.sqrt(dx * dx + dy * dy);
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
/* 10 */
/***/ function(module, exports) {

	/**
	 * [win2canvas 视口坐标转换为canvas坐标]
	 * @param  {Object} canvas 对象
	 * @param  {number} clientX 视口x轴坐标
	 * @param  {number} clientY 视口y轴坐标
	 * @return {Object}         在canvas中的坐标
	 */
	function win2canvas (canvas, clientX, clientY) {
		var box = canvas.getBoundingClientRect();
		return {
			x : clientX - box.left * (canvas.width / box.width),
			y : clientY - box.top * (canvas.height / box.height)
		}
	}

	module.exports = win2canvas;

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	* 键盘事件管理
	*/

	var KeyEvent = function() {
	}
	/**
	 * 按键与ascii码对应表
	 */
	KeyEvent.__keyCodeMap = {
	    VK_ESCAPE : 27, // ESC键
	    VK_RETURN : 13, // 回车键
	    VK_TAB : 9, // TAB键
	    VK_CAPITAL : 20, // Caps Lock键
	    VK_SHIFT : 16, // Shift键
	    VK_CONTROL : 17, // Ctrl键
	    VK_MENU : 18, // Alt键
	    VK_SPACE : 32, // 空格键
	    VK_BACK : 8, // 退格键
	    VK_LWIN : 91, // 左徽标键
	    VK_RWIN : 92, // 右徽标键
	    K_APPS : 93, // 鼠标右键快捷键

	    VK_INSERT : 45, // Insert键
	    VK_HOME : 36, // Home键
	    VK_PRIOR : 33, // Page Up
	    VK_NEXT : 34, // Page Down
	    VK_END : 35, // End键
	    VK_DELETE : 46, // Delete键
	    VK_LEFT : 37, // 方向键(←)
	    VK_UP : 38, // 方向键(↑)
	    VK_RIGHT : 39, // 方向键(→)
	    VK_DOWN : 40, // 方向键(↓)

	    VK_F1 : 112, // F1键
	    VK_F2 : 113, // F2键
	    VK_F3 : 114, // F3键
	    VK_F4 : 115, // F4键
	    VK_F5 : 116, // F5键
	    VK_F6 : 117, // F6键
	    VK_F7 : 118, // F7键
	    VK_F8 : 119, // F8键
	    VK_F9 : 120, // F9键
	    VK_F10 : 121, // F10键
	    VK_F11 : 122, // F11键
	    VK_F12 : 123, // F12键

	    VK_NUMLOCK : 144, // Num Lock键
	    VK_NUMPAD0 : 96, // 小键盘0
	    VK_NUMPAD1 : 97, // 小键盘1
	    VK_NUMPAD2 : 98, // 小键盘2
	    VK_NUMPAD3 : 99, // 小键盘3
	    VK_NUMPAD4 : 100, // 小键盘4
	    VK_NUMPAD5 : 101, // 小键盘5
	    VK_NUMPAD6 : 102, // 小键盘6
	    VK_NUMPAD7 : 103, // 小键盘7
	    VK_NUMPAD8 : 104, // 小键盘8
	    VK_NUMPAD9 : 105, // 小键盘9
	    VK_DECIMAL : 110, // 小键盘.
	    VK_MULTIPLY : 106, // 小键盘*
	    VK_PLUS : 107, // 小键盘+
	    VK_SUBTRACT : 109, // 小键盘-
	    VK_DIVIDE : 111, // 小键盘/
	    VK_PAUSE : 19, // Pause Break键
	    VK_SCROLL : 145, // Scroll Lock键

	    A : 65, // A键
	    B : 66, // B键
	    C : 67, // C键
	    D : 68, // D键
	    E : 69, // E键
	    F : 70, // F键
	    G : 71, // G键
	    H : 72, // H键
	    I : 73, // I键
	    J : 74, // J键
	    K : 75, // K键
	    L : 76, // L键
	    M : 77, // M键
	    N : 78, // N键
	    O : 79, // O键
	    P : 80, // P键
	    Q : 81, // Q键
	    R : 82, // R键
	    S : 83, // S键
	    T : 84, // T键
	    U : 85, // U键
	    V : 86, // V键
	    W : 87, // W键
	    X : 88, // X键
	    Y : 89, // Y键
	    Z : 90, // Z键

	    NUMPAD0 : 48, // 0键
	    NUMPAD1 : 49, // 1键
	    NUMPAD2 : 50, // 2键
	    NUMPAD3 : 51, // 3键
	    NUMPAD4 : 52, // 4键
	    NUMPAD5 : 53, // 5键
	    NUMPAD6 : 54, // 6键
	    NUMPAD7 : 55, // 7键
	    NUMPAD8 : 56, // 8键
	    NUMPAD9 : 57 // 9键
	}
	/**
	 * 按键状态表
	 */
	KeyEvent.__keyDownMap = {};

	/**
	 * 添加按键事件监听
	 */
	KeyEvent.addListener = function() {
	    document.onkeydown = function(e) {
	        var e = e || event, code = e.keyCode || e.which;
	        KeyEvent.__keyDownMap[code] = true;
	    }

	    document.onkeyup = function(e) {
	        var e = e || event, code = e.keyCode || e.which;
	        KeyEvent.__keyDownMap[code] = false;
	    }
	}
	/**
	 * 移除按键事件监听
	 */
	KeyEvent.removeListener = function() {
	    document.onkeydown = null;
	    document.onkeyup = null;
	}
	/**
	 * 检查某个按键是否被按下
	 * @param {String} key
	 */
	KeyEvent.check = function(key) {
	    var code = KeyEvent.__keyCodeMap[key];
	    return !!KeyEvent.__keyDownMap[code];
	}

	module.exports = KeyEvent;



/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var AnimateObj = __webpack_require__(5);

	/**
	* 绘制移动背景层
	* 支持水平和垂直两种移动方式
	*/
	var getMovingBg = function (img, width, height, speed, isVertical){
		var bg = new AnimateObj({
		//注意这里的宽高设置需要等比例
		/*
		* 背景图显示宽度
		*/
		width : width,
		/*
		* 背景图显示高度
		*/
		height : height,
		img : img,
		/*
		* 背景滚动的速度, 
		* 当垂直滚动时，正值向下滚动,负值向上滚动
		* 当水平滚动时，
		*/
		speed : speed, 
		rollLen : 0, //背景滚动的距离
		/*
		* 只支持水平或垂直滚动,true为垂直，false为水平
		*/
		isVertical : isVertical,
		//自动更新父级画布
		autoChange : true
	});

	/*
	* 背景滚动，只支持水平或垂直滚动
	*/
	bg.customDraw = function(ctx){
		//向上运动，调整因子r为-1；向下运动，调整因子为1
		var r = this.speed > 0 ? 1 : -1;

		//背景不运动
		if(this.speed === 0){
			ctx.drawImage(this.img, 0 , 0, this.width, this.height);
			return ;
		}

		//垂直运动
		if(this.isVertical){	
			ctx.drawImage(this.img, 0 , this.rollLen - r * this.height, this.width, this.height);
			ctx.drawImage(this.img, 0 , this.rollLen, this.width, this.height);
				
		}else{//水平运动
			ctx.drawImage(this.img, -r * this.width + this.rollLen, 0, this.width, this.height);
			ctx.drawImage(this.img, this.rollLen, 0, this.width, this.height);
		}

	}

	bg.update = function(){
		this.rollLen += this.speed;

		var r = this.speed > 0 ? 1 : -1;
		if(this.isVertical && r * this.rollLen > this.height ||
		  !this.isVertical && r * this.rollLen > this.width){
			this.rollLen = 0;
		}
		this.parent.change();
	}
	 return bg;
	}

	module.exports = getMovingBg;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(6);
	var Component = __webpack_require__(7);
	__webpack_require__(14);
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(6);
	/*
	* 动画分层渲染
	*/
	var Container = __webpack_require__(16);
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
	* 清除画布层
	*/
	Layer.prototype.clear = function(){
	    //画布层变化时才清除画布
	    if(this.context && this._change){
	        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    }
	}

	module.exports = Layer;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var CSE = __webpack_require__(6);
	var AnimateObj = __webpack_require__(5);

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