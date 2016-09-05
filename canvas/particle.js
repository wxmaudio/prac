function Particles (num) {
	//颗粒的数量
	this.num = num;
	//颗粒的x轴坐标数组
	this.x = [];
	//颗粒的y轴坐标数组
	this.y = [];
	//半径
	this.r = [];

	this.vx = [];

	this.vy = [];

	this.color = [];

	this.alive = [];

	this.width = 0;//活动水平范围

	this.height = 0;//活动垂直范围
}

Particles.prototype = {
	constructor : Particles,
	init : function(width, height){
		this.width = width;
		this.height = height;

		for(var i = 0; i < this.num ; i++){
			this.x[i] = width * Math.random();
			this.y[i] = height/2 * Math.random();
			this.r[i] = 10;
			this.vx[i] = 5 * Math.random();
			this.vy[i] = 0;//水平运动
			this.color[i] = "#005588";
			this.alive[i] = true;//均为活动节点
		}
	},
	renderImage : function () {
		
	},
	renderBall : function(ctx, i){
		var t = this;

		ctx.beginPath();

		ctx.fillStyle = t.color[i];
		ctx.beginPath();
		ctx.arc(t.x[i], t.y[i], t.r[i], 0,2*Math.PI, true);
		ctx.closePath();
    	ctx.fill();

    	ctx.closePath();
	},
	render : function (ctx) {
		//每次渲染需要清除上一次的绘制
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		for(var i = 0; i < this.num ; i++){
			//如果是活动节点才开始绘制
		    if(this.alive[i]){
		    	this.renderBall(ctx, i);
		    }			
		}
	},
	update : function (){
		var t = this;
		for (var i = 0; i < t.num ; i++){
			if (t.x[i] < 0){
				t.alive[i] = false;//颗粒死亡
			}
			t.x[i] += -t.vx[i];//向左运动
		}
	}
}
