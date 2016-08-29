/**
 * 滚动公告.每隔delay的时间以speed的速度向上滚动lh的高度
 * @param lh 参与滚动的每一个元素高度.
 * @param speed 滚动的每一个元素以speed毫秒一个像素值滚动.
 * @param delay 当前元素滚动完成后延时delay毫秒后再接着滚动.
 * @example scrollNotice(30, 30, 4000)
 * @returns {boolean}
 */
function scrollNotice(id, lh, speed, delay) {
    var p = false; //是否锁定滚动动画.
    var t; //计时器.
    var o = document.getElementById(id); //滚动div外层容器.
    if(!o) return false;
    var oHeight = o.scrollHeight * 2; //容器两倍高度.

    o.innerHTML += o.innerHTML; //将现有内容复制一份放入到原容器中.
    o.style.marginTop = 0; //设置行内样式
    o.onmouseover = function() {
        p = true;
    }
    o.onmouseout = function() {
        p = false;
    }
    function start() {
        t = setInterval(scrolling, speed);
        if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
    }

    function scrolling() {
        //若还没有滚动到一条公告的高度
        if (parseInt(o.style.marginTop) % lh != 0) {
            o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
            //若容器的marginTop值超出其两倍高度的一半,将其设置为0,从头开始滚动.
            if (Math.abs(parseInt(o.style.marginTop)) >= oHeight / 2) o.style.marginTop = 0;
        } else {
            //滚动到一条的高度，则停止滚动
            clearInterval(t);
            //暂停delay的时间然后继续滚动
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
}
startmarquee(30, 30, 4000);