(function(window,undefined){
  var tpl = '<video id="preview-{index}" controls class="{uiClass}" data-custom="{customData}">\n'+
  '         <source src="{src}" type="{type}"></source></video>\n'+
  '       <div class="file-caption" title="{filename}">{filename}</div>\n';
  var index = 0;

  var getURL = function(){
    return window[window.URL ? 'URL' : 'webkitURL'];
  };
  var uniqId = function () {
    return Math.round(new Date().getTime() + (Math.random() * 100));
  };

  function FilePreview(wrapperElement,uiClass){
    if(!wrapperElement){
      return;
    }
    this.wrapper = wrapperElement;
    this.uiClass = uiClass || "file-preview-frame";
    //this.previewId = index;
    //index ++;
  }

  FilePreview.prototype = {
    constructor: FilePreview,
    renderVideo : function(url,file,customData){
      var id = uniqId(),
      html = tpl.replace(/\{src}/g, url)
      .replace(/\{filename}/g, file.name)
      .replace(/\{type}/g, file.type)
      .replace(/\{index}/g,id)
      .replace(/\{customData}/g,customData);

      var div = document.createElement("div");
      div.className = this.uiClass;
      div.innerHTML = html;

      this.wrapper.appendChild(div);

      var prevObj = document.getElementById("preview-" + id),
          URL = getURL();
      prevObj.onload = function(){
        if(URL){
          URL.revokeObjectURL(url);
        }
      }
      return id;
    },
    previewVideo : function(file,customData){
     if(!file){
       return false;
     }
     var URL = getURL(),
     self = this;
     if(URL){
      var url = URL.createObjectURL(file);
      self.renderVideo(url,file,customData);
      //URL.revokeObjectURL(url); 
      return;
    }
    if (!window.FileReader) {
      console.log('Not support preview');
      return;
    }

    var reader = new window.FileReader();
    reader.onload = function(evt){
     self.renderVideo(evt.target.result,file,customData);
   }
   render.readAsDataURL(file);
 }
}

window.FilePreview = FilePreview;

})(window);
