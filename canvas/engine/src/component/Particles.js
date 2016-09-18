var AnimateObj = require('../core/AnimateObj');
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