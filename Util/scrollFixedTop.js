var FixedDiv = function(sChoose, sCss){
    this.div = $(sChoose);
    this.sCss = sCss || {position:"fixed", top:"0px", left: this.div.offset().left};
}
FixedDiv.prototype = {
    _getHeight: function(){
        return this.div.offset().top;
    },
    init: function(){
        var offsetTop = this._getHeight(),
            self = this;

        $(window).on("scroll", function(){
            var scrollTop = $(document).scrollTop();
            if (scrollTop > offsetTop) {
              self.div.css(self.sCss);
            }else{
                self.div.css({position:"", top:""});
            };
        })
    }  
};

//invoke
// $(function(){
//   var fixedDiv = new FixedDiv($('.fixedWrap'));
//   fixedDiv.init();
// });

