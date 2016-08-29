/**
 * 倒计时组件
 */
!function(name, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports[name] = factory();
  else
    this[name] = factory();
}("CountDown",function(){
/**
 * 计算现在距离未来某个时间还有多长时间
 * @param  {Date | string} current 当前时间
 * @param  {Date | string} future  未来时间
 * @return {Object} 时间对象
 * @example
 * getDiffTime(new Date(),new Date(2016,8,26,17,18,0));
 */
function getDiffTime(current, future) {
   if(typeof current === "string"){
       current = parseTime(current);
   }
   if(typeof future === "string"){
       future = parseTime(future);
   }
  
   if(!current || !future){
     return null;
   }

   //现在距离未来某个时间还有多少秒
   var diff = Math.round((future.getTime() - current.getTime())/1000),
       days = 0,
       hours = 0,
       minutes = 0,
       seconds = 0;
   
   //未来时间小于等于当前时间，返回null
   if(diff <= 0){
      return null;
   }

   days = Math.floor(diff / (24 * 60 * 60));
   diff = diff % (24 * 60 * 60);
   hours = Math.floor(diff / (60 * 60));
   diff = diff % (60 * 60);
   minutes = Math.floor(diff / 60);
   seconds = diff % 60;

   return {
     days : days,
     hours : hours,
     minutes : minutes,
     seconds : seconds
   }
}
function parseFormatTime(str){
   var d = Date.parse(str);
   return isNaN(d) ? null :new Date(d);
}

function parseTime(str){
  var arr = [];
  str = str.replace(/:/g, '-');
  str = str.replace(/ /g, '-');
  arr = str.split("-");
  if(arr.length < 6) return null;
  for(var i=0;i<arr.length;i++){
    arr[i] = parseInt(arr[i]);
  }
  return new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5]);
}

function renderDiffDay(current, future , dayId ,wrapId){
   var d = getDiffTime(current,future),
       day = document.getElementById(dayId),
       wrapper = document.getElementById(wrapId);

    if(!d){
       wrapper && (wrapper.style.display = "none");
    }else{
       day && (day.innerHTML = d.days);
    }
    return d;
}


function renderTime(wrapperId, d ,patten){
   var w = document.getElementById(wrapperId);
   if(typeof d === 'string') {
       d = parseTime(d);
   }
   
   patten = patten || "YYYY年M月D日";

   patten = patten.replace(/YYYY|yyyy/, d.getFullYear());
   patten = patten.replace(/M|m/, d.getMonth() + 1);
   patten = patten.replace(/D|d/, d.getDate());

   w && (w.innerHTML = patten);
}

 return {
   getDiffTime : getDiffTime,
   renderTime : renderTime,
   renderDiffDay : renderDiffDay
 };
});

(function initBox(index){
  var boxIDPrefix = ["JTeacher","JMoon","JNational"],
      pre = "";
  if(index >= boxIDPrefix.length) {return false;}
  pre = boxIDPrefix[index];

  //渲染节日时间
  CountDown.renderTime(pre + "Time", document.getElementById(pre + "FutureTime").value);
  //渲染节日距离今天的时间
  CountDown.renderDiffDay(document.getElementById(pre + "CurTime").value, document.getElementById(pre + "FutureTime").value, pre + "DiffDay", pre + "DiffDayWrapper");
})(2);