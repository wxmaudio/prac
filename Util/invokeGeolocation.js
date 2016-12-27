B.init(function() {
    var h = $("#weather");
    var n = $(".weather-shield");
    var d;
    var g;
    var s;
    var a = h.siblings(":not(.fixed)").add(n);
    var p = $("#skinSwitch").attr("data-skinUrl");
    var r = $("#skinSwitch").attr("data-skinColor");
    var k = B.Index;
    var i = function(t, u) {
        B.log.send($.extend({
            ct: 10,
            clk_from: "weather"
        }, t), u)
    }
    ;
    if ($("#skinSwitch").attr("data-time") === "on") {
        n.css("background-color", r);
        n.css("background-image", "url(" + p + ")")
    }
    var l = $("#skin-container");
    if ($("body").hasClass("has-background")) {
        var o = l.css("background-color");
        var f = l.css("background-image");
        n.css("background-color", o);
        n.css("background-image", f)
    }
    function c(t) {
        g.removeClass("loading");
        s.html(s.data("city"));
        if (t) {
            i({
                cst: 9,
                clk_info: "a1_l" + t
            })
        }
    }
    function j(t, u) {
        var v = t.addr.city;
        g.removeClass("loading");
        if (v) {
            i({
                cst: 0,
                clk_info: "a1_l1"
            });
            v = v.replace(/[省市]$/, "");
            if (v == s.data("city")) {
                i({
                    cst: 0,
                    clk_info: "a1_l2"
                });
                return s.html(v)
            }
            m().done(function(w) {
                if (!w.errno && w.data && w.data[0] && w.data[0].value) {
                    i({
                        cst: 0,
                        clk_info: "a1_l3"
                    })
                } else {
                    c(4)
                }
            }).fail(function() {
                c(3)
            })
        } else {
            c(2)
        }
    }
    function b() {
        h.addClass("expand");
        a.css({
            "-webkit-transition": "-webkit-transform .3s linear",
            "-webkit-transform": "translate3d(0, " + n.data("height") + "px, 0)"
        }).one("webkitTransitionEnd", function(t) {
            k.timer(function() {
                d.css("z-index", "0");
                k.$el.css("padding-bottom", "1px")
            })
        })
    }
    function q() {
        d.css("z-index", null );
        a.css({
            "-webkit-transition-timing-function": "ease",
            "-webkit-transform": null 
        }).one("webkitTransitionEnd", function(t) {
            h.removeClass("expand");
            a.css("-webkit-transition", null );
            k.$el.css("padding-bottom", null )
        });
        i({
            cst: 2,
            clk_info: "a1_b2"
        })
    }
    function m() {
        var u = $.Deferred();
        var t = h.find(".weather-detail");
        $.ajaxget({
            url: "?action=getweather",
            dataType: "json"
        }).done(function(v) {
            n.before(v.result.content);
            t.remove()
        }).then(function(v) {
            d = h.find(".weather-detail");
            g = d.find(".weather-detail-gps span").first();
            s = g.next().next();
            u.resolve(v)
        }).fail(function() {
            u.reject()
        });
        return u
    }
    function e() {
        var t = $(".weather-outline");
        var u = null ;
        h.on("click", ".weather-outline, .icon-weather-toggle", function(v) {
            k.avoidPenetration(k.$el);
            if (!h.data("inited")) {
                m().then(function() {
                    b();
                    h.data("inited", 1)
                });
                return
            }
            if (!h.hasClass("expand")) {
                b()
            } else {
                q()
            }
        }).on("click", '[data-action="loc"]', function(v) {
            if (g.hasClass("loading")) {
                return
            }
            if (u) {
                clearTimeout(u)
            }
            u = setTimeout(function() {
                u = null ;
                if (g.hasClass("loading")) {
                    c(1)
                }
            }, 9000);
            g.removeClass("fail").addClass("loading");
            s.html("正在获取定位信息");
            B.geolocation.getPosition({
                html5Timeout: 4000,
                moplusTimeout: 5000,
                onSuccess: j,
                //获取定位失败
                onFail: function() {
                    if (u) {
                        clearTimeout(u);
                        c(1)
                    }
                }
            });
            i({
                cst: 2,
                clk_info: "a1_b3"
            });
            return false
        }).on("click", ".weather-detail-forecast", function(v) {
            i({
                cst: 2,
                clk_info: "a1_b4"
            }, function() {
                window.location.href = h.find(".weather-detail a").attr("href")
            });
            return false
        });
        $("#logo, #userinfo-wrap").on("click", function(v) {
            if (h.hasClass("expand") && v.target.parentNode.nodeName != "A" && v.target.id != "login" && v.target.id != "userinfo") {
                q()
            }
        })
    }
    e()
});
define("wiseindex/start/hashView", function() {
    function a() {
        var e = window;
        var c = $("#commonBase").data("prepath").replace(/#/g, "&");
        var b = $.extend(true, B.Index, {
            $el: $("#__SF___mine"),
            $view: $("#index-view"),
            widget: {},
            prepath: c
        });
        var f = b.$view;
        var d = B.log.send;
        B.hash.on("change:iview", function(j, h, g, i) {
            if (i == null ) {
                b.$view.trigger("hide")
            } else {
                $(".plus.edit .edit-back").trigger("click", 1)
            }
            B.Index.Modal.hide()
        });
        f.on("replace", function(h) {
            var g = h._args;
            if (g && g.$view) {
                f.children().hide();
                g.$view.show();
                b.avoidPenetration(g.$view)
            }
            return false
        }).on("show", function(h) {
            var g = h.data;
            if (g && g.$view) {
                b.$el.data("scrollY", e.pageYOffset).hide();
                f.add(g.$view).show();
                b.avoidPenetration(g.$view)
            }
            return false
        }).on("hide", function(i) {
            var h = $(this);
            b.$el.show();
            var g = b.$el.data("scrollY");
            if (g) {
                setTimeout(function() {
                    e.scrollTo(0, g)
                }, 0)
            }
            b.$el.data("scrollY", null );
            f.add(f.children()).hide();
            b.avoidPenetration($("#index-card"));
            return false
        }).on("click", ".back-arrow", function(g) {
            var h = $(this).parents(".view-wrap").attr("id").match(/([^-]*)/)[0];
            d({
                ct: 10,
                cst: 2,
                clk_from: h,
                clk_info: "a5_b1"
            });
            b.back();
            return false
        })
    }
    return {
        init: a
    }
});
;define("wiseindex/start/thirdparty", function(b, a) {
    function c() {
        window.B.listen("tabs/news/index", "cardinited", function() {
            d();
            function d() {
                var e;
                if (window.sSession.newIndexTplName === "ecomads") {
                    e = location.protocol + "//m.baidu.com/static/ecom/js/wise/home/ecomAds_exp_4b9b97d"
                } else {
                    e = location.protocol + "//m.baidu.com/static/ecom/js/wise/home/ecomAds_5f3f8bc"
                }
                window.require.config({
                    paths: {
                        "ecom/wise/home": e
                    }
                });
                window.require(["ecom/wise/home"], function(f) {
                    f.init()
                })
            }
        }, {
            listenpre: 1
        })
    }
    a.init = c
});
;define("wiseindex/lib/thunder/mediaDuration", function() {
    var b = window;
    function a(f) {
        var d = this;
        var e = b.thunderConf || {};
        if (!e.startTime && b.performance) {
            e.startTime = b.performance.timing.domLoading
        }
        function c(h, g, i) {
            var j = setTimeout(function() {
                d.send({
                    sessionTime: i
                });
                var k = (h + g) < 60000 ? (h + g) : 60000;
                c(g, k, i + h)
            }, h)
        }
        c(3000, 3000, 3000)
    }
    return {
        mName: "mediaDuration",
        mFunc: a
    }
});
;var thunderPlugins = ["wiseindex/lib/thunder/mediaDuration"];
define("wiseindex/lib/thunder/thunder", function() {
    var c = window;
    function d(f) {
        var e = this;
        e.opt = f || {};
        e.baseParams = e.opt.baseParams || {};
        e.config(f, true);
        if (f.autoBind) {
            e.bind()
        }
    }
    d.prototype = {
        config: function(h, e) {
            var g = this;
            for (var f in h) {
                g.opt[f] = h[f]
            }
            g.baseURL = g.opt.baseURL || "//hpd.baidu.com/v.gif";
            g.domHook = g.opt.domHook;
            g.skipPrevent = !!g.opt.skipPrevent;
            g.logRegx = g.opt.logRegx || "(.*?):(.*?);";
            g.baseParams = b(g.baseParams, h.baseParams)
        },
        send: function(h, n, e) {
            var o = this;
            o.__sendPreHook && o.__sendPreHook(h);
            var f = "l" + Date.now();
            var l = window[f] = new Image();
            var j = "";
            var g = null ;
            e = e || o.baseURL;
            l.onload = l.onerror = l.onabort = function() {
                window[f] = null ;
                if (g) {
                    clearTimeout(g);
                    g = null ;
                    n && n();
                    o.__sendAfrHook && o.__sendAfrHook(h, false)
                }
            }
            ;
            h = h || {};
            h.r = f;
            var m = o.baseParams;
            h = b(b({}, m), h);
            for (var k in h) {
                if (h.hasOwnProperty(k)) {
                    j += "&" + k + "=" + encodeURIComponent(h[k])
                }
            }
            l.src = e + "?" + j.slice(1);
            if (typeof n === "function") {
                g = setTimeout(function() {
                    g = null ;
                    n()
                }, 500)
            }
            o.__sendAfrHook && o.__sendAfrHook(h, true)
        },
        bindLogHook: function(e) {
            var f = this;
            e.on("click", f.domHook, f.hookClick.bind(this, f))
        },
        hookClick: function(j, l) {
            var n = this;
            var i = j.getAttribute(n.domHook);
            var k = j.getAttribute("href");
            var m = null ;
            var f = {};
            var g = new RegExp(n.logRegx);
            var h = null ;
            while ((h = g.exec(i)) ) {
                f[h[1]] = h[2]
            }
            if (j.tagName.toLowerCase() === "a" && k) {
                l.preventDefault();
                m = function() {
                    c.location.href = k
                }
            }
            n.send(n.baseURL, f, m)
        }
    };
    function b(g, f) {
        if (!f || !g) {
            return g
        }
        for (var e in f) {
            g[e] = f[e]
        }
        return g
    }
    thunderPlugins.forEach(function(f, e) {
        require([f], function(g) {
            d.prototype[g.mName] = g.mFunc
        })
    });
    var a = null ;
    return {
        create: function(f, e) {
            return new d(f)
        },
        get: function(e) {
            return a || (a = this.create(e))
        }
    }
});
;define("start/superstart", ["wiseindex/start/hashView", "wiseindex/start/thirdparty", "wiseindex/lib/thunder/thunder"], function(d, e, h) {
    var a = window;
    function i() {
        d.init();
        f();
        B._fireInit();
        e.init();
        require(["wiseindex/lib/sf/activityController"], function(j) {
            j.start()
        });
        g();
        b();
        c()
    }
    function f() {
        a.B.thunderLog = h.create({
            baseParams: {
                logid: a.sSession.logid,
                ct: 1
            }
        })
    }
    function g() {
        if (window.B.asynJs.length > 0) {
            $.each(B.asynJs, function(j, k) {
                setTimeout(function() {
                    $.loadJs($("#" + k).attr("data-src"))
                }, 1)
            })
        }
        B.asynLoad = function(j) {
            if (!~B.asynJs.indexOf(j)) {
                B.asynJs.push(j);
                $.loadJs($("#" + j).attr("data-src"))
            }
        }
    }
    function b() {
        if (sSession.netSwitch && navigator.connection) {
            nettype = navigator.connection.type;
            if (nettype == 5) {
                B.cookie("net", "4g-3", {
                    "max-age": 48000,
                    path: "/"
                })
            }
        }
    }
    function c() {
        $(window).add(document).on("unload", function() {
            window.scrollTo(0, 0)
        })
    }
    return {
        init: i
    }
});
$(document).ready(function() {
    require(["start/superstart"], function(a) {
        a.init()
    })
});
