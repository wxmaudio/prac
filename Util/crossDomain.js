var create_iframe = function (pid, adbar_id, adbar_width, adbar_height, data, ext_id) {
        var _ext_id_str = '';
        if (ext_id != null && typeof(ext_id) == "string") {
            _ext_id_str = ext_id;
        }

        // 1.0.2 新版本增加
        if (trim(data.ad) == "") {
            trace_event(_trace_uri, "type=none&bar=" + adbar_id, pid);
            return false;
        }

        var _iframe = document.createElement('iframe');
        _iframe.setAttribute('scrolling', 'no');
        _iframe.setAttribute('width', adbar_width);
        _iframe.setAttribute('height', adbar_height);
        _iframe.setAttribute('vspace', '0');
        _iframe.setAttribute('hspace', '0');
        _iframe.setAttribute('allowtransparency', 'true');
        _iframe.setAttribute('marginwidth', '0');
        _iframe.setAttribute('marginheight', '0');
        _iframe.setAttribute('frameBorder', '0');
        _iframe.setAttribute('id', 'chinaso_clb_' + adbar_id + _ext_id_str);
        _iframe.style.cssText = 'border:0; vertical-align:bottom; margin:0; display:none;';

        // iframe 加载回掉函数
        // 加载完成时执行 fill_iframe 方法，并且删除注册事件
        var iframeLodingCallback = function() {
            if (!-[1, ]) {
                if (_iframe.readyState == "complete") {
                    fill_iframe(pid, adbar_id, data.ad, ext_id);
                    removeEvent(_iframe, "readystatechange", iframeLodingCallback)
                }
            } else {
                fill_iframe(pid, adbar_id, data.ad, ext_id);
                removeEvent(_iframe, "load", iframeLodingCallback);
            }
        };

        // 判断 IE8 及以下浏览器
        // 注册 iframe 加载完成回掉处理函数
        if (!-[1, ]) {
            addEvent(_iframe, "readystatechange", iframeLodingCallback);
        } else {
            addEvent(_iframe, "load", iframeLodingCallback);
        }
        var _doc = document.getElementById(pid);
        if (_doc != null && typeof(_doc) != "undefined") {
            _doc.appendChild(_iframe);
            return true;
        } else {
            return false;
        }

    };

    // 填充iframe里的内容
    var fill_iframe = function (pid, adbar_id, html, ext_id) {
        var _ext_id_str = '';
        if (ext_id != null && typeof(ext_id) == "string") {
            _ext_id_str = ext_id;
        }

        // 填充内容
        var _obj = document.getElementById('chinaso_clb_' + adbar_id + _ext_id_str);
        if (_obj && _obj.contentWindow) {
            var _doc = null ;
            try {
                _doc = _obj.contentDocument || _obj.contentWindow.document
            } catch (av) {
                _doc = null;
            }
            if (_doc == null || typeof(_doc) == "undefined") {
                trace_event(_trace_uri, 'type=iframeerr&bar=' + adbar_id, pid);
                _obj.parentNode.style.display = "none";
                return;
            }

            // 防止在ie下加载完成事件多次触发
            setTimeout(function () {
                // 发送加载事件
                if(!-[1,]){ // IE
                    addEvent(_obj, 'readystatechange', function () {
                        if (_obj.readyState == 'complete') {
                            _obj.style.display = 'block';
                            trace_event(_trace_uri, 'type=display&bar=' + adbar_id, pid);
                        }
                    });
                } else {
                    addEvent(_obj, 'load', function () {
                        _obj.style.display = 'block';
                        trace_event(_trace_uri, 'type=display&bar=' + adbar_id, pid);
                    });
                }

                _doc.open();
                _doc.write(html);
                _doc.close();

            }, 20);
        }
    };
