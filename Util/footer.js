/**
 * 固定居底部的footer
 * @param {[type]} d  [description]
 * @param {[type]} h  [description]
 * @param {[type]} e) {                   var l [description]
 */
document.writeln("<LINK href=\"http://www.ewrwerwer.com/static/component/cms/footer/css/footer.css\" type=text/css rel=stylesheet>");
document.writeln("<div id=\"footer\">");
document.writeln("<div class=\"f_menu\">");
document.writeln("<li><a href=\"http://ad.ewrwerwer.com/\" target=\"_blank\" rel=\"nofollow\ class=\"otherclick\">加入dfsdf推广</a><em>|</em><a href=\"http://open.ewrwerwer.com/data/resource/url/new\" target=\"_blank\" rel=\"nofollow\ class=\"otherclick\">申请网址收录</<em>|</em><a href=\"http://www.ewrwerwer.com/aboutus.html\" target=\"_blank\" rel=\"nofollow\" class=\"otherclick\">关于dfsdf搜索</a><em>|</em><a href=\"http://hr.ewrwerwer.com\" target=\"_blank\" rel=\"nofollow\" class=\"otherclick\">招贤纳士</a><em>|</em><a href=\"http://www.ewrwerwer.com/privstate.html\" target=\"_blank\" rel=\"nofollow\" class=\"otherclick\">隐私申明</a></li>"); 
document.writeln("<li><span>© 2012xcxxo</span><a href=\"http://www.ewrwerwer.com/statement.html\" target=\"_blank\" rel=\"nofollow\">使用前必读</a> <a href=\"http://www.miibeian.gov.cn/\" target=\"_blank\" rel=\"nofollow\">京ICP证：110095号</a> <span>京公网安备: 110115001303</span></li>");

document.writeln("</div></div>");

function setHeight(d, h, e) {

        var l = d.offsetHeight ? e - d.offsetHeight: e,

        m = h - l,

        f = Math.max(m, 0);

        if(f<1){

          f=59;

        }

        d.style.height = f + "px";

        return f;

    }

    function adjustFooter(){

       var footer = document.getElementById("footer");

       if (!footer) return;

       setHeight(footer, getWindowHeight(), document.body.offsetHeight);

    }

    function getWindowHeight(){

       if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;

       else if (document.body && document.body.clientHeight) return document.body.clientHeight;

       return 0

    }

    adjustFooter();

    if (window.addEventListener) window.addEventListener("resize", adjustFooter, false);

    else window.attachEvent("onresize", adjustFooter);

