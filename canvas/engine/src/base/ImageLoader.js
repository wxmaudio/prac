/*
* 加载图片资源
*/
"use strict"; 

/*
* 已加载图片对象
* @private
*/
var _loadedImages = {};
/*
* 已加载图片数量
*/
var loadedNums = 0;

var loadingState = "init";

function loadOneImage(url, callback, key, timeout){
   //若已经缓存，则直接返回
   if(_loadedImages[key]){
      callback(true);
      return ;
   }

   /*
    * 图片加载定时器
    */
    var _imageTimeOut = null;

   _imageTimeOut = setTimeout(function(){
      callback(false);
    }, timeout || 10000);


   var img = new Image();
   img.src = url;

   img.onload = function(){
      //缓存图片
      key && (_loadedImages[key] = img);

      callback(true);
      if(_imageTimeOut) {
          clearTimeout(_imageTimeOut);
      }
   }

   img.onerror = function(){
      key && (_loadedImages[key] = null);
      callback(false);
   }
}

/**
 * 加载图片数组
 * @param  {Object} images 图片数组
 * @param  {Function} onComplete 加载成功回调
 * @param  {string} [timeout] 超时时间，默认10000ms
 * @return {[type]}
 */
function loadImages(images, onComplete, timeout){

    if(images.length === 0){
        onComplete();
    }

    function onloaded(){
        loadedNums++;
        if(images.length === loadedNums){
            //console.log(_loadedImages);
            onComplete();
        }
    }

    for(var i = 0; i< images.length; i++){
        loadOneImage(images[i].url, onloaded, images[i].key, timeout);
    }
  
}
/**
 * 获取已加载的Image对象
 * @param {String} id
 */
function get(id){
    return _loadedImages[id];
}

var ImageLoader = {
  load : loadImages,
  get : get
}
