var win2canvas = require('./win2canvas');

function isPinching (e) {
   var changed = e.changedTouches.length,
       touching = e.touches.length;

   return changed === 1 || changed === 2 && touching === 2;
}

function isDragging (e) {
   var changed = e.changedTouches.length,
       touching = e.touches.length;

   return changed === 1 && touching === 1;
}

//计算两点之间的距离
function distance(p1, p2){
	var dx = p1.x - p2.x,
		dy = p1.y - p2.y;
   return Math.square(Math.pow(dx, 2) + Math.pow(dy, 2));
}


function scale (e){
	if(isPinching(e)){
		var touch1 = e.touches.item(0),
			touch2 = e.touches.item(1),
			p1 = {x:touch1.clientX, y:touch1.clientY},
			p2 = {x:touch2.clientX, y:touch2.clientY};

		return distance(p1,p2);
	}
	return 0;
}


module.exports = {
	isPinching : isPinching,
	isDragging : isDragging
}