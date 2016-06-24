  /**
  *  获得一个在(x,y)范围内的随机数
  *  @return {Number} 
  */
function getRangeRandom(x,y){

    var start = (x<y)? x : y;
    var result = Math.ceil(start + Math.random()*Math.abs(y-x));
    return result;
  }

/**
   * 获取 0~30° 之间的一个任意正负值
   * @return {String}
   */
function get30DegRandom(){
     return ((Math.random()>0.5)? '' :'-') + Math.ceil(Math.random()*30);
}