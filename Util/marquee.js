/**
 * 跑马灯滚动
 * @param  {[type]} lh    向上滚动高度
 * @param  {[type]} speed 
 * @param  {[type]} delay 向上滚动一定高度后暂停时间
 * @return {[type]}       [description]
 */
function startmarquee(lh, speed, delay) {
    var p = false;
    var t;
    var o = document.getElementById("hotword");
    //内容复制一遍
    o.innerHTML += o.innerHTML;
    o.style.marginTop = 0;
    o.onmouseover = function() {
        p = true;
    }
    o.onmouseout = function() {
        p = false;
    }
    
    function start() {
        //开始移动动画
        t = setInterval(scrolling, speed);
        //不暂停则设置位置，以便进入动画滚动分支
        if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
    }
    //
    function scrolling() {
        if (parseInt(o.style.marginTop) % lh != 0) {
            //向上移动
            o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
            //滚动到一半高度时，移动原位置
            if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2) o.style.marginTop = 0;
        } else {
            //移动lh距离后暂停delay时间后继续移动
            clearInterval(t);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
}
//invoke
//startmarquee(30, 30, 4000);