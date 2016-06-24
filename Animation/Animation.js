(function(){
	//动画体
	function draw(timestamp){
		var drawTime = timestamp || Date.now(),
		    diff = drawTime - startTime;
		console.log(diff);
		startTime = drawTime;


		var test = document.getElementById('test');
		var left = parseInt(test.style.left) || 0;
		if(left < 500){
			test.style.left = (left + 10)+'px';
			requestAnimationFrame(draw);
		}	
	}

	var requestAnimationFrame = window.requestAnimationFrame ||
								window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame ||
								window.msRequestAnimationFrame;
	var startTime =  window.mozAnimationStartTime || Date.now();
	
	//invoke
	requestAnimationFrame(draw);
})();							 