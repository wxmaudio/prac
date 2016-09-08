/**
* 绘制移动背景层
* 支持水平和垂直两种移动方式
* @
*/
window.getMovingBg = (function () {
var getMovingBg = function (img, width, height, speed, isVertical){
	var bg = new CSE.AnimateObj({
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
*背景滚动，只支持水平或垂直滚动
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
return getMovingBg;
})();