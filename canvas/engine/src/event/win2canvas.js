/**
 * [win2canvas 视口坐标转换为canvas坐标]
 * @param  {Object} canvas element 对象
 * @param  {number} winX window下x轴坐标（可能是视口或文档坐标）
 * @param  {number} winY window下y轴坐标
 * @return {Object}         在canvas中的坐标
 */
function win2canvas (elem, winX, winY) {
	var box = elem.getBoundingClientRect();
	return {
		x : winX - box.left * (elem.width / box.width),
		y : winY - box.top * (elem.height / box.height)
	}
}

module.exports = win2canvas;