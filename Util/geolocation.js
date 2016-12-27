define("lib/geolocation", function() {
    var g = "http://api.map.baidu.com/geocoder/v2/"
      , l = "http://127.0.0.1:6259/geolocation?timeout=10000&gps=1&mcmdf=inapp_wiselocation"
      , m = "http://api.map.baidu.com/?qt=rgc&dis_poi=100&poi_num=10&ie=utf-8&oue=1&res=api"
      , c = "http://aladdin.wapmap.baidu.com/plugin"
      , f = {
        autoLoc: {
            expireTime: 0,
            onlyFromCookie: false,
            onlyFromHTML5: false,
            onlyFromNative: false,
            autoSaveToCookie: true,
            html5Timeout: 8000,
            nativeTimeout: 8000,
            onSuccess: null ,
            onFail: null 
        },
        search: {
            timeout: 8000,
            onSuccess: null ,
            onFail: null 
        }
    };
    if (location.protocol.indexOf("https") != -1) {
        g = "https://sp2.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3/geocoder/v2/";
        m = "https://sp2.baidu.com/9_Q4sjOpB1gCo2Kml5_Y_D3/?qt=rgc&dis_poi=100&poi_num=10&ie=utf-8&oue=1&res=api";
        c = "https://sp2.baidu.com/90gHaDqh_cgXo1ufo-zN2TxrfQVwcu8e/plugin"
    }
    var e = function(s, r, q) {
        typeof s === "function" && s(r, q)
    }
    ;
    var h = {
        getPosition: function(t) {
            t = j({}, f.autoLoc, t);
            var w = t.onSuccess
              , x = t.onFail;
            var v = t.expireTime;
            if (v > 0 || (v === 0 && t.onlyFromCookie === true)) {
                var q = p.get();
                if (q && (parseInt(Date.now(), 10) - q.timestamp <= v || v === 0)) {
                    e(t.onSuccess, q.output(), {
                        from: "cookie"
                    });
                    return
                }
            }
            if (t.onlyFromCookie === true) {
                e(t.onFail, {
                    error: 1
                });
                return
            }
            var r = this;
            var u = /android/i.test(navigator.userAgent);
            var s = function(y) {
                if (u && !/micromessenger/i.test(navigator.userAgent)) {
                    i(function(z) {
                        k(z, function(A) {
                            if (t.autoSaveToCookie === true) {
                                A = r.savePosition(A)
                            }
                            e(t.onSuccess, A, {
                                from: "native"
                            })
                        }, function() {
                            e(t.onFail, {
                                error: 3
                            })
                        }, t.nativeTimeout)
                    }, function() {
                        e(t.onFail, {
                            error: 3
                        })
                    }, t.nativeTimeout)
                } else {
                    e(t.onFail, y)
                }
            }
            ;
            if (t.onlyFromHTML5 || !t.onlyFromNative) {
                a(function(y) {
                    n(y, function(z) {
                        if (t.autoSaveToCookie === true) {
                            z = r.savePosition(z)
                        }
                        e(t.onSuccess, z, {
                            from: "html5"
                        })
                    }, function() {
                        if (u && !t.onlyFromHTML5) {
                            s({
                                error: 2
                            })
                        } else {
                            e(t.onFail, {
                                error: 3
                            })
                        }
                    }, t.html5Timeout)
                }, function(y) {
                    if (u && !t.onlyFromHTML5) {
                        s(y)
                    } else {
                        e(t.onFail, y)
                    }
                }, t.html5Timeout)
            } else {
                s({
                    error: 2
                })
            }
        },
        searchAddress: function(q, s, r) {
            r = j({}, f.search, r, {
                addr: q || "",
                city_code: s || 0
            });
            d({
                url: c,
                data: {
                    ptype: 2,
                    addr: q || "",
                    city_code: s || 0
                },
                timeout: r.timeout,
                onSuccess: function(w) {
                    var D = [];
                    if (w && w.content) {
                        var A = w.current_city.code;
                        var z = [].concat(w.content);
                        for (var x = 0; x < z.length; x++) {
                            var u = z[x];
                            var v = u.geo.split("|")[2].replace(";", "").split(",");
                            var t, C;
                            if (u.city_type != null ) {
                                t = C = u.cname
                            } else {
                                t = u.name;
                                C = u.addr
                            }
                            var y = new b(v[0],v[1],200,A,undefined,t,C);
                            D.push(y.output())
                        }
                    }
                    e(r.onSuccess, D)
                },
                onFail: function() {
                    e(r.onFail, {
                        error: 1
                    })
                }
            })
        },
        savePosition: function(q) {
            return p.set(q)
        },
        clearPosition: function() {
            return p.remove()
        },
        mercatorToAddress: function(q) {
            var r = {
                timeout: 8000,
                onSuccess: null ,
                onFail: null 
            };
            q = j({}, r, q);
            k({
                longitude: q.x,
                latitude: q.y,
                accuracy: q.accuracy
            }, function(s) {
                s.accuracy = s.accuracy || 200;
                e(q.onSuccess, s)
            }, function() {
                e(q.onFail, {
                    error: 1
                })
            }, q.timeout)
        }
    };
    function a(s, u, q) {
        if (!navigator.geolocation) {
            e(u, {
                error: 2
            })
        }
        var t = null 
          , r = false;
        navigator.geolocation.getCurrentPosition(function(v) {
            clearTimeout(t);
            e(s, v.coords)
        }, function(v) {
            if (r) {
                return
            }
            r = true;
            clearTimeout(t);
            if (v.code === v.PERMISSION_DENIED) {
                e(u, {
                    error: 4
                })
            } else {
                e(u, {
                    error: 2
                })
            }
        }, {
            timeout: q,
            maximumAge: 0,
            enableHighAccuracy: true
        });
        t = setTimeout(function() {
            if (r) {
                return
            }
            r = true;
            clearTimeout(t);
            e(u, {
                error: 2
            })
        }, q)
    }
    var i = function(r, t, q) {
        var s = null ;
        e(t)
    }
    ;
    var n = function(r, s, t, q) {
        d({
            url: g,
            data: {
                ak: "5ygSQXEZzZQpF2AHVmp3GpfP",
                location: r.latitude + "," + r.longitude,
                output: "json",
                pois: 1,
                ret_coordtype: "mc",
                coordtype: "wgs84ll"
            },
            timeout: q,
            onSuccess: function(v) {
                if (!v && v.status != 0 && !v.result && v.result.cityCode === undefined) {
                    if (v.status != 0) {
                        B.log.send({
                            ct: 10,
                            cst: 9,
                            clk_from: "geolocation",
                            clk_info: v.status
                        })
                    }
                    e(t)
                } else {
                    v = v.result;
                    var u = new b(v.location.lng,v.location.lat,r.accuracy,v.cityCode,Date.now(),v.formatted_address,v.formatted_address,v.addressComponent,v.pois);
                    e(s, u.output())
                }
            },
            onFail: t
        })
    }
    ;
    /**
     * 发含经纬度信息的jsonp请求给后台获得定位城市
     * @param  {[type]} r 定位结果
     * @param  {[type]} s 成功回调
     * @param  {[type]} t 失败回调
     * @param  {[type]} q 超时
     * @return {[type]}   [description]
     */
    var k = function(r, s, t, q) {
        d({
            url: m,
            data: {
                x: r.longitude,
                y: r.latitude
            },
            timeout: q,
            onSuccess: function(w) {
                var z = w && w.content
                  , x = z && z.address_detail
                  , y = x && x.city_code
                  , v = z && z.surround_poi;
                delete z.address_detail.city_code;
                if (z && x && y) {
                    var u = new b(r.longitude,r.latitude,r.accuracy,y,undefined,z.address,z.address,x,v);
                    e(s, u.output())
                } else {
                    e(t)
                }
            },
            onFail: t
        })
    }
    ;
    function b(z, v, r, w, t, q, A, u, s) {
        this.x = parseFloat(z);
        this.y = parseFloat(v);
        this.accuracy = parseFloat(r);
        this.cityCode = parseInt(w, 10);
        this.timestamp = parseInt(t, 10) || "";
        this.name = q || "";
        this.address = A || "";
        this.addr = u;
        this.pois = s;
        if (this.pois && this.pois.length) {
            this.pois = this.pois.sort(function(y, x) {
                return parseInt(y.distance) - parseInt(x.distance)
            })
        }
    }
    b.prototype.getCookieString = function() {
        return this.x + "_" + this.y + "_" + this.accuracy + "_" + this.cityCode + "_" + this.timestamp
    }
    ;
    b.prototype.output = function() {
        return {
            x: this.x,
            y: this.y,
            accuracy: this.accuracy,
            cityCode: this.cityCode,
            timestamp: this.timestamp,
            name: this.name,
            address: this.address,
            addr: this.addr || {},
            pois: this.pois
        }
    }
    ;
    b.readFromCookie = function(q) {
        var r = q.split("_");
        return new b(r[0],r[1],r[2],r[3],r[4])
    }
    ;
    b.readFromObject = function(q) {
        return new b(q.x,q.y,q.accuracy,q.cityCode,q.timestamp,q.name,q.address,q.addr,q.pois)
    }
    ;
    var p = {
        domain: ".baidu.com",
        path: "/",
        key: "BAIDULOC",
        duration: 172800000,
        get: function() {
            if (!navigator.cookieEnabled) {
                return false
            }
            var q = document.cookie.match(new RegExp(this.key + "=([^;]+);?"));
            if (q) {
                return b.readFromCookie(q[1])
            }
            return false
        },
        set: function(q) {
            if (!navigator.cookieEnabled) {
                return false
            }
            q = b.readFromObject(q);
            var r = new Date();
            r.setTime(r.getTime() + this.duration);
            q.timestamp = parseInt(Date.now(), 10);
            document.cookie = this.key + "=" + q.getCookieString() + ";domain=" + this.domain + ";path=" + this.path + ";expires=" + r.toGMTString();
            return q.output()
        },
        remove: function() {
            if (!navigator.cookieEnabled) {
                return false
            }
            document.cookie = this.key + "=;domain=" + this.domain + ";path=" + this.path + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            return true
        }
    };
    var j = function(q) {
        var r = [].slice.call(arguments, 1);
        for (var s = 0; s < r.length; s++) {
            for (var t in r[s]) {
                q[t] = r[s][t]
            }
        }
        return q
    }
    ;
    var o = 0;
    var d = function(y) {
        var s = {
            timeout: 8000,
            data: {},
            onSuccess: null ,
            onFail: null 
        };
        y = j({}, s, y);
        var v = "geojsonp" + (++o);
        y.data.callback = v;
        var w = false;
        var r = setTimeout(function() {
            delete window[v];
            w = true;
            e(y.onFail)
        }, y.timeout);
        window[v] = function(z) {
            clearTimeout(r);
            if (w) {
                return
            }
            e(y.onSuccess, z);
            delete window[v]
        }
        ;
        var q = y.url + (y.url.indexOf("?") + 1 ? "&" : "?");
        var t = [];
        for (var x in y.data) {
            t.push(x + "=" + encodeURIComponent(y.data[x]))
        }
        q += t.join("&");
        var u = document.createElement("script");
        u.onerror = function() {
            clearTimeout(r);
            e(y.onFail)
        }
        ;
        u.type = "text/javascript";
        u.src = q;
        document.getElementsByTagName("head")[0].appendChild(u)
    }
    ;
    B.geolocation = h
});
require(["lib/geolocation"]);
