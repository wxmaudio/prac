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