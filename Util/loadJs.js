// 加载js
    var async_request_js = function (id, _url, callback) {
        var _doc = document.getElementById(id);
        if (_doc == null || typeof(_doc) == "undefined") {
            return;
        }

        var _js = document.createElement('script');
        _js.setAttribute('type', 'text/javascript');
        _js.setAttribute('src', _url);
        _js.setAttribute('async', 'async');

        if (callback != null && typeof(callback) != "undefined") {
            if (!-[1,]) { //if IE
                //IE6、IE7 support js.onreadystatechange
                _js.onreadystatechange = function () {
                    if (_js.readyState == 'loaded' || _js.readyState == 'complete') {
                        _js.onreadystatechange=null;
                        callback();
                    }
                }
            } else {
                _js.onload = function () {
                    _js.onload=null;
                    callback();
                }
            }
        }

        _doc.appendChild(_js);
    };

    // 阻塞加载js
    var block_request_js = function (_url) {
        var _s = '<s' + 'cript type="text/javascript" ';
        _s += 'src="' + _url + '">';
        _s += '</s' + 'cript>';
        document.write(_s);
    };