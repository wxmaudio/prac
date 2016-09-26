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