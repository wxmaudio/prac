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
	    document.getElementById("number").innerHTML = score;
	}

	/*
	* 初始化游戏背景画布
	*/
	function initBgLayer(){
	    var bgLayer = new CSE.Layer({canvas: "bg"});
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
	    var layer = new CSE.Layer();
	    var canvas = layer.setCanvas("canvas");
	    var playctx = layer.context;

	    //绘制小球
	    var particleNum = 15;
	    var particles = getParticles(particleNum, canvas.width, canvas.height);
	    layer.appendChilds(particles);


	    //绘制玩家
	    var player = new CSE.Player({
	       img : ImageLoader.get('player'),
	       width : 112,
	       height : 106,
	       radius : 50,//用于碰撞检测
	       x : canvas.width/2 - 50,
	       y : canvas.height/2 - 40
	    });
	    //添加游戏鼠标控制
	    player.addControl();
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
	    var game = new CSE.Game();

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
	   var allLoad = false;

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
/***/ function(module, exports) {

	var particles = [];
	function getParticles (num, width, height) {
		for(var i = 0; i < num ; i ++){
		    var colorArr = ["#005588", "#080"];
		    var scoreArr = [1,2];
		    var type = Math.random()>0.5? 1:0;
		    var particle = new CSE.AnimateObj({
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

/***/ }
/******/ ])
});
;