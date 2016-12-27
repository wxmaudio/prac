'use strict';
var Game = require('../core/Game');
var Layer = require('../core/Layer');
var Ball = require('../component/Ball');
//var AnimateObj = require('../core/AnimateObj');
var Point = require('../component/Point');

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








