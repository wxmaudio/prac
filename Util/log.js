// 发送跟踪事件
    var trace_event = function (_uri, _query, id) {
        if (_uri == null || typeof(_uri) != "string") {
            return;
        }

        // 记录当前毫秒数
        var _now = (new Date()).getTime();

        // 追踪地址字符对象
        var _q = '';
        if (_query != null && typeof(_uri) == "string") {
            _q = _query;
        }

        // 追踪编号，每次追踪 _event_serial_no 加一
        _q += (_q == '' ? '' : '&') + '_sno=' + (++_event_serial_no);

        // 上一次追踪请求记录时间
        _q += '&_tp=' + (_now - _last_event_time);

        // 当前时间与 js 加载执行时间差
        _q += '&_pt=' + (_now - _t_js_in);


        // 页面唯一标识
        _q += '&_pv=' + _page_uuid;

        // 当前毫秒数
        _q += '&_t=' + _now;

        // 随机数
        _q += '&_rnd=' + Math.round(Math.random() * 10000);

        // 更新最后追踪记录时间
        _last_event_time = _now;

        // 加密请求串
        //_q = 's=' + encodeURIComponent(_encode(_q));

        var _img = document.createElement("img");
        _img.setAttribute('width', '0');
        _img.setAttribute('height', '0');

        var _doc = null;
        if (id != null && typeof(id) != "undefined") {
            _doc = document.getElementById(id);
        } else {
            _doc = document.getElementsByTagName('body')[0];
        }

        if (_doc != null && typeof(_doc) != "undefined") {
            _doc.appendChild(_img);
            // 万恶的ie6 设置src要放到最后 不然会有多次请求
            _img.setAttribute('src', _uri + '?' + _q);
        }
    };

    var trace_ad_event = function (_uri, id) {
        if (_uri == null || typeof(_uri) != "string") {
            return;
        }

        var _s = _uri;
        if (_s.indexOf('?') < 0) {
            _s += '?';
        }
        _s += '&_pv=' + _page_uuid;

        var _img = document.createElement("img");
        _img.setAttribute('width', '0');
        _img.setAttribute('height', '0');

        var _doc = null;
        if (id != null && typeof(id) != "undefined") {
            _doc = document.getElementById(id);
        } else {
            _doc = document.getElementsByTagName('body')[0];
        }
        if (_doc != null && typeof(_doc) != "undefined") {
            _doc.appendChild(_img);
            _img.setAttribute('src', _s);
        }
    };