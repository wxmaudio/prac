function checkURL(name, url) {
    var urlprex;
    if (url.indexOf("http://") < 0 && url.indexOf("https://") < 0 && url.indexOf("ftp://") < 0) {
        urlprex = "http://" + url;
    } else {
        urlprex = url;
    }
    var strRegex = /(http\:\/\/)?([\w.]+)(\/[\w- \.\/\?%&=]*)?/gi;
    if ($.trim(name) !== "" && $.trim(url) !== "" && urlprex.match(strRegex)) {
        return true;
    } else {
        return false;
    }
}