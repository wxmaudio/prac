//http://www.chinaso.com/search/relation.htm?q=%E7%94%B0%E6%9C%B4%E7%8F%BA&id=1556159_1556159
(function() {
    if (typeof window["relation"] == "function")
        return false;
    var e = null , n = false, t = null , i = null , r = null , o = null , a = {}, l = null , s = null , f = null , u = true, c = false, h = 0, d = 0, g, m = [.512, .64, .8, 1, 1.25, 1.5625, 1.953125], v = ["#56b31e", "#0099ff", "#ff9999"];
    BK_LINE_COLOR = "#e0e0e0",
    BIG_RADIUS = 90,
    SMALL_RADIUS = 47,
    BK_POINTS_NUM = 30,
    curZoom = 3,
    backgroundPoints = [],
    isDescShow = false;
    var w = null 
      , y = null 
      , p = null 
      , x = null 
      , M = null 
      , b = null 
      , P = null 
      , I = null 
      , S = null ;
    var k = "url(/app/www/images/ico/handopen.cur),default"
      , A = "url(/app/www/images/ico/handclose.cur),default";
    function C() {
        if (!t || !t.nodes || !t.nodes.length || !t.links) {
            return false
        }
        return true
    }
    function D(e) {
        var n = window.location.toString().split("?");
        if (!n[1]) {
            return null 
        }
        n = n[1].split("#")[0];
        n = n.split("&");
        for (var t in n) {
            var i = (n[t] || "").split("=");
            if (i[0] == e) {
                return decodeURIComponent(i[1])
            }
        }
        return null 
    }
    function R() {
        var e = document.compatMode == "BackCompat" ? "body" : "documentElement";
        return {
            width: document[e].clientWidth,
            height: document[e].clientHeight
        }
    }
    var _ = function() {
        var e = window.navigator.userAgent.toLowerCase();
        var n = {};
        if (e.indexOf("se 2.x") != -1) {
            n.se = true
        }
        if (e.indexOf("android") != -1) {
            n.and = true
        }
        if (e.indexOf("iphone") != -1) {
            n.ios = true
        }
        return n
    }();
    (function() {
        var e = 0;
        var n = ["webkit", "moz", "ms"];
        for (var t = 0; t < n.length && !window.requestAnimationFrame; ++t) {
            window.requestAnimationFrame = window[n[t] + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[n[t] + "CancelAnimationFrame"] || window[n[t] + "CancelRequestAnimationFrame"]
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(n) {
                var t = (new Date).getTime();
                var i = Math.max(0, 16 - (t - e));
                var r = window.setTimeout(function() {
                    n(t + i)
                }, i);
                e = t + i;
                return r
            }
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(e) {
                clearTimeout(e)
            }
        }
    })();
    function T(n) {
        if (!n.canvas || !n.data)
            return;
        I = n.noResult;
        S = n.notSupport;
        y = n.infoBox;
        w = n.bgMask;
        p = $(y).find("img")[0];
        M = $(y).find(".personPopPicTex")[0];
        x = $(y).find(".personPopInfor")[0];
        b = $(y).find(".bthPerMore")[0];
        P = $(y).find(".bhtClosedPop")[0];
        if (document.createElement("canvas").getContext) {
            i = n.canvas;
            r = i.getContext("2d");
            bgCanvasDom = n.bgCanvas;
            o = bgCanvasDom.getContext("2d");
            t = n.data;
            e = R();
            W(e);
            bgCanvasDom.style.display = "";
            setTimeout(function() {
                te();
                X();
                B(t)
            }, 100)
        } else {
            w.style.display = "";
            S.style.display = ""
        }
    }
    function B(e) {
        t = q(e);
        if (C()) {
            I.style.display = "none";
            O();
            Z()
        } else {
            W(R());
            I.style.display = ""
        }
    }
    function F() {
        y.style.display = "none";
        w.style.display = "none";
        isDescShow = false
    }
    function L(n) {
        if (!n) {
            return
        }
        isDescShow = true;
        p.src = n.src;
        M.innerHTML = n.name;
        x.innerHTML = "<p>" + (n.introduction || "") + "</p>";
        b.href = "http://baike.chinaso.com/wiki/search?q=" + encodeURIComponent(n.name || "");
        var t = $(y).height()
          , i = $(y).width();
        y.style.top = (e.height - t) / 2 + "px";
        y.style.left = (e.width - i) / 2 + "px";
        y.style.display = "";
        w.style.display = ""
    }
    function q(e) {
        try {
            e = JSON.parse(e)
        } catch (n) {
            return
        }
        if (!e || !e.nodes || !e.nodes.length || !e.links) {
            return e
        }
        for (var t in e.nodes) {
            var i = e.nodes[t];
            i.image = new Image;
            i.image.src = i.src;
            i.r = SMALL_RADIUS;
            a[i.id] = i;
            if (i.level == 0) {
                l = i;
                f = i
            }
            if (i.level === 0 || i.level === 1) {
                i.shown = true
            }
        }
        if (!l) {
            l = e.nodes[0]
        }
        for (var t in e.links) {
            var r = e.links[t]
              , o = a[r.id_from]
              , s = a[r.id_to];
            if (!o || !s) {
                continue
            }
            o.links = o.links || [];
            o.links.push(r);
            o.neighbors = o.neighbors || [];
            if (o === l || o.level === 1 && s.level === 2) {
                o.neighbors.push(s)
            }
            if (o.level === 2 || s.level === 2) {
                r.level = 2
            } else {
                r.level = 1
            }
        }
        l.r = BIG_RADIUS;
        return e
    }
    function O() {
        if (!l) {
            return
        }
        l.x = i.width / 2;
        l.y = i.height / 2;
        var e = (l.neighbors || []).length, n;
        if (e == 0) {
            return
        }
        n = Math.PI * 2 / e;
        var t = 15
          , r = (t - e) * 20;
        if (e > 1) {
            r += 60 / Math.sin(Math.PI / e)
        }
        for (var o in l.neighbors) {
            var a = l.neighbors[o];
            a.angle = n * o;
            a.xSpace = r;
            a.ySpace = r;
            a.x = l.x + Math.round(a.xSpace * Math.cos(a.angle));
            a.y = l.y - Math.round(a.ySpace * Math.sin(a.angle));
            U(a, a.neighbors)
        }
    }
    function U(e, n) {
        if (!l || !l.neighbors) {
            return
        }
        var t = (n || []).length
          , i = []
          , r = l.neighbors.length;
        for (var o = 0; o < t; o++) {
            i.push(Math.PI / (r > 8 ? 12 : 9) * Math.ceil(o / 2) * (o % 2 == 0 ? -1 : 1))
        }
        i.sort(function(e, n) {
            return e - n
        });
        for (var o = 0; o < t; o++) {
            var a = n[o]
              , s = i[o];
            if (a.level === 2) {
                var f = o + 1;
                if (typeof a.x === "undefined" && typeof a.y === "undefined") {
                    a.x = e.x + (e.xSpace * .8 + f * 70) * Math.cos(e.angle + s);
                    a.y = e.y - (e.ySpace * .8 + f * 70) * Math.sin(e.angle + s)
                }
            }
        }
    }
    function Y(e, n, t, i, r, o) {
        var a = t.x
          , l = t.y
          , s = i.x
          , u = i.y
          , c = t.r
          , h = i.r
          , d = Math.sqrt((a - s) * (a - s) + (l - u) * (l - u));
        if (!_.and) {
            c += t === f ? 10 : 7;
            h += i === f ? 10 : 7
        }
        var g = a + (s - a) * c / d
          , m = l + (u - l) * c / d
          , v = s - (s - a) * h / d
          , w = u - (u - l) * h / d;
        e.beginPath();
        e.lineWidth = o;
        e.strokeStyle = r;
        e.moveTo(g, m);
        e.lineTo(v, w);
        e.closePath();
        e.stroke();
        if (t == f) {
            var y = a + s + (c - h) * (s - a) / d
              , p = l + u + (c - h) * (u - l) / d;
            y /= 2;
            p /= 2;
            e.textAlign = "center";
            e.textBaseline = "middle";
            e.font = "14px Microsoft Yahei";
            var x = e.measureText(n.name).width + 6;
            e.fillStyle = r;
            e.fillRect(y - x / 2, p - 10, x, 20);
            e.fillStyle = "white";
            e.fillText(n.name, y, p)
        }
    }
    function Z() {
        if (!C()) {
            return
        }
        r.clearRect(-h, -d, i.width / m[curZoom], i.height / m[curZoom]);
        var e = t.links;
        for (var n in e) {
            var o = e[n]
              , s = a[o.id_from]
              , u = a[o.id_to];
            if (!s || !u) {
                continue
            }
            if (o.level !== 2 && s !== f && u !== f || o.level === 2 && s.shown && u.shown) {
                Y(r, o, s, u, BK_LINE_COLOR, 1)
            }
        }
        var c = [];
        c.push(l);
        for (var n in l.neighbors) {
            var g = l.neighbors[n];
            if (g) {
                c.push(g);
                if (g.neighbors && g.neighbors.length) {
                    c = c.concat(g.neighbors)
                }
            }
        }
        for (var n in c) {
            var w = c[n];
            if (!w.shown) {
                continue
            }
            if (w.image.height) {
                N(r, w)
            } else {
                w.image.onload = function(e, n) {
                    return function() {
                        N(e, n)
                    }
                }(r, w)
            }
        }
        for (var n in e) {
            var o = e[n]
              , s = a[o.id_from]
              , u = a[o.id_to];
            if (s && u && s == f) {
                Y(r, o, s, u, v[o.type], 2)
            }
        }
    }
    function N(e, n) {
        e.save();
        e.beginPath();
        e.arc(n.x, n.y, n.r + 1, 0, 2 * Math.PI, true);
        e.clip();
        e.closePath();
        var t = Math.min(n.image.height, n.image.width);
        if (n.image.height > 10) {
            e.drawImage(n.image, 0, 0, t, t, n.x - n.r, n.y - n.r, 2 * n.r, 2 * n.r)
        } else {
            e.fillStyle = "#14101c";
            e.fillRect(n.x - n.r, n.y - n.r, 2 * n.r, 2 * n.r)
        }
        e.fillStyle = "rgba(0,0,0,0.5)";
        if (n == l && n == s) {
            e.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
            e.font = "18px Microsoft Yahei";
            e.textAlign = "center";
            e.textBaseline = "bottom";
            e.fillStyle = "white";
            e.fillText(n.name, n.x, n.y);
            e.font = "14px Microsoft Yahei";
            e.textBaseline = "top";
            e.fillText("查看详情", n.x, n.y + 10)
        } else {
            e.font = "14px Microsoft Yahei";
            var i = e.measureText("阳").width / 2 + 16;
            e.fillRect(n.x - n.r, n.y + n.r - i, n.r * 2, i);
            e.textBaseline = "top";
            e.textAlign = "center";
            e.fillStyle = "white";
            e.fillText(n.name, n.x, n.y + n.r - i)
        }
        e.restore();
        if (n == f) {
            E(e, n, n.r, 6, "#ffffff");
            E(e, n, n.r + 6, 4, "#0099ff")
        } else {
            E(e, n, n.r, 3, "#ffffff");
            E(e, n, n.r + 3, 4, "#e0e0e0")
        }
    }
    function E(e, n, t, i, r) {
        if (_.and) {
            return
        }
        e.beginPath();
        e.fillStyle = r;
        e.arc(n.x, n.y, t, 0, 2 * Math.PI, true);
        e.arc(n.x, n.y, t + i, 0, 2 * Math.PI, false);
        e.fill();
        e.closePath()
    }
    function X() {
        i.onmousedown = G;
        i.onmousemove = Q;
        i.onmouseup = J;
        i.onmousewheel = ee;
        i.onclick = ne;
        i.style.cursor = k;
        if (navigator.userAgent.toLowerCase().indexOf("firefox") >= 0) {
            i.addEventListener("DOMMouseScroll", ee, false)
        }
        window.onresize = function() {
            n = true
        }
        ;
        setInterval(function() {
            if (n && t) {
                n = false;
                e = R();
                W(e);
                Z()
            }
        }, 250);
        for (var r = 0; r < BK_POINTS_NUM; r++) {
            backgroundPoints.push({
                x: e.width * Math.random(),
                y: e.height * Math.random(),
                angle: Math.PI * 2 * Math.random(),
                r: Math.random() <= .5 ? 11 : 14
            })
        }
        window.requestAnimationFrame(H)
    }
    var K = 0;
    function H() {
        K++;
        if (K % 2 !== 0) {
            window.requestAnimationFrame(H);
            return
        }
        K %= 2;
        o.clearRect(0, 0, e.width, e.height);
        for (var n = 0; n < backgroundPoints.length; n++) {
            var t = backgroundPoints[n];
            t.x += Math.cos(t.angle);
            t.y -= Math.sin(t.angle);
            if (t.x - t.r < 0) {
                t.angle = Math.PI * .5 - Math.PI * Math.random()
            }
            if (t.x + t.r > e.width) {
                t.angle = -(Math.PI * Math.random() + Math.PI * .5)
            }
            if (t.y - t.r < 0) {
                t.angle = -1 * Math.PI * Math.random()
            }
            if (t.y + t.r > e.height) {
                t.angle = Math.PI * Math.random()
            }
        }
        o.lineWidth = 2;
        o.strokeStyle = "#ABC8F8";
        for (var n = 0; n < backgroundPoints.length; n++) {
            o.beginPath();
            o.arc(backgroundPoints[n].x, backgroundPoints[n].y, backgroundPoints[n].r, 0, Math.PI * 2, true);
            o.closePath();
            o.stroke()
        }
        window.requestAnimationFrame(H)
    }
    function W(e) {
        i.setAttribute("width", e.width);
        i.setAttribute("height", e.height);
        bgCanvasDom.setAttribute("width", e.width);
        bgCanvasDom.setAttribute("height", e.height);
        r.scale(m[curZoom], m[curZoom]);
        r.translate(h, d)
    }
    function z(e, n) {
        var t = i.getBoundingClientRect();
        return {
            x: e - t.left * (i.width / t.width),
            y: n - t.top * (i.height / t.height)
        }
    }
    function G(e) {
        if (!C()) {
            return
        }
        c = true;
        u = true;
        var n = z(e.clientX || e.pageX, e.clientY || e.pageY);
        g = n;
        e.preventDefault();
        i.style.cursor = A
    }
    function J() {
        c = false;
        i.style.cursor = k
    }
    function j(e, n) {
        if (!e.shown) {
            return false
        }
        r.beginPath();
        r.arc(e.x, e.y, e.r, 0, Math.PI * 2, true);
        r.closePath();
        if (r.isPointInPath(n.x, n.y)) {
            return true
        }
        return false
    }
    function Q(e) {
        if (!C()) {
            return
        }
        var n = z(e.clientX || e.pageX, e.clientY || e.pageY)
          , o = false;
        e.preventDefault();
        if (g && g.x == n.x && g.y == n.y) {
            return
        }
        if (c) {
            u = false;
            var l = n.x - g.x
              , m = n.y - g.y;
            h += l;
            d += m;
            g = n;
            r.translate(l, m);
            Z();
            i.style.cursor = A
        } else {
            o = t.nodes.some(function(e) {
                if (!e.shown) {
                    return false
                }
                if (j(e, n)) {
                    if (s != e || f != e) {
                        s = e;
                        f = e;
                        for (var t in e.links) {
                            var i = a[e.links[t].id_to];
                            if (i.level == 2) {
                                i.shown = true
                            }
                        }
                        Z()
                    }
                    return true
                }
                return false
            });
            if (o) {
                i.style.cursor = "pointer"
            } else {
                if (s) {
                    s = null ;
                    Z()
                }
                i.style.cursor = k
            }
        }
    }
    function V(n) {
        r.scale(n, n);
        r.translate(e.width / 2 * (1 - n) / n, e.height / 2 * (1 - n) / n);
        h = h / n + e.width / 2 * (1 - n) / n;
        d = d / n + e.height / 2 * (1 - n) / n
    }
    function ee(e) {
        var n = 1.25
          , t = .8
          , i = e.wheelDelta || -e.detail;
        if (i > 0 && curZoom < 6) {
            curZoom++;
            V(n)
        } else {
            if (i < 0 && curZoom > 0) {
                curZoom--;
                V(t)
            }
        }
        Z()
    }
    function ne(e) {
        if (isDescShow) {
            F();
            return
        }
        if (!C() || !u) {
            return
        }
        var n = z(e.clientX, e.clientY);
        e.preventDefault();
        t.nodes.forEach(function(e) {
            if (j(e, n)) {
                if (e == l) {
                    L(e)
                } else {
                    setTimeout(function() {
                        window.location = "/search/relation.htm?q=" + encodeURIComponent(e.name) + (e.id ? "&id=" + e.id : "")
                    }, 0)
                }
            }
        })
    }
    function te() {
        w.onclick = function() {
            F();
            this.style.display = "none"
        }
        ;
        P.onclick = function(e) {
            e.preventDefault();
            F()
        }
    }
    window.relation = T
})();
