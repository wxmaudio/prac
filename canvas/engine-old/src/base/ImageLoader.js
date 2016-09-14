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

function loadOneImage(url, callback, key){
   //若已经缓存，则直接返回
   if(_loadedImages[key]){
      callback(true);
      return ;
   }

   var img = new Image();
   img.src = url;

   img.onload = function(){
      //缓存图片
      key && (_loadedImages[key] = img);
      callback(true);

      //清除绑定事件
      img.onload = img.onerror = null;
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
 * @param {Function} [onProgress] 加载过程中回调，可用于提示加载进度
 * @param  {string} [timeout] 超时时间，默认10000ms
 * @return {[type]}
 */
function loadImages(images, onComplete, onProgress timeout){

    if(images.length === 0){
        onComplete();
    }

    /*
    * 图片加载定时器
    */
    var _imageTimeOut = null;

    //超时则返回
    _imageTimeOut = setTimeout(function(){
       onComplete(false);
    }, timeout || 10000);

    function onloaded(){
        loadedNums++;
        //通知加载进度
        if(typeof onProgress === 'function'){
           onProgress(loadedNums, images.length);
        }
      
        if(images.length === loadedNums){
          
            //图片加载完成，清除定时器
            clearTimeout(_imageTimeOut);
            onComplete(true);
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
