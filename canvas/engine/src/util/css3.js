function transform (x, y, z) {
	var prefix = ['-webkit-', 'o-', 'ms-', 'moz-'];

}

cssTransform = function (x, y) {
            var translation = 'translate(' + x + 'px,' + y + 'px)';
            return {
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-ms-transform': translation,
                '-o-transform': translation,
                'transform': translation
            };
        };

function setRotate(obj,deg){
   if(!obj) return;
   var prefix = ['webkit', 'Moz', 'ms', 'O', ''],
       value = 'rotate('+deg+'deg)',
       attr = 'Transform';
   for(var i =  0 ; i < prefix.length ; i ++){
      if(!prefix[i]){
        attr = attr.toLowerCase();
      }
      obj.style[prefix[i] + attr] = value;
   }
}