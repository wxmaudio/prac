$(function() {
    /**
     * 获取元素的尺寸和文档坐标，并在record对象里记录下宽于或高于容器的边界值
     * @param  {Elemnt} dom    元素节点
     * @param  {Object} record 记录容器边界值对象
     * @return {null}        
     */
    function getDomSize(dom,record){
        var d = $(dom).offset();//元素的文档坐标
        if(!d) return;
        d.left < record.minL && (record.minL = d.left);
        d.top < record.minT && (record.minT = d.top);
        var right = d.left + dom.offsetWidth, bottom = d.top + dom.offsetHeight;
        right > record.maxR && (record.maxR = right);
        bottom > record.maxB && (record.maxB = bottom);
    }


    function getModSize($dom){
        var dom = $dom.get(0),
        child  = dom.firstChild,
        cset = [];
        if(child) do{
            //可见的元素节点或内容不为空的文字节点
            if(child.nodeType == 1 && (child.offsetHeight || child.offsetWidth) || child.nodeType == 3 && $.trim(child.nodeValue).length){
                cset.push(child);
            }
            child = child.nextSibling;
        }while(child);
        var record = {minT: 99999,minL: 99999,maxR: 0,maxB: 0};
        $dom.parent();
        cset.length ? ($(cset).each(function() {
            if (3 == this.nodeType) {//文字节点
                var b = document.createElement("xx"), a = this.parentNode;
                a.insertBefore(b, this);//在文字节点前面加上新建节点XX
                b.appendChild(this);//新建节点XX包裹文字节点
                getDomSize(b, record);//在一定范围内设置包裹节点的位置
                a.insertBefore(this, b);//把文字节点重新挪回和新建节点XX平级
                a.removeChild(b)//删除节点
            } else//dom 节点
            //var b = []; A(this, b); $.each(b, function() {
                getDomSize(this, record)
            // })
    }), a = record.maxB - record.minT, d = record.maxR - record.minL) :
        (d = $dom.width(),//没有子元素的时则取本元素的宽度
            a = $dom.height(),//高度
            b = $dom.offset(),
            record.minL = b.left,
            record.minT = b.top);

        20 > a && (a = 20); //设置最小高度为20
        20 > d && (d = 20); //设置最小宽度为20
        return {width: d,height: a,left: record.minL,top: record.minT}
    }

    var index = null;
    function addMasker($mod){
    	var a = getModSize($mod);
    	$("[mid='"+$mod.attr('index')+"']").remove();
    	var masker = $('<div class="mod-mask-layer"></div>')
        .css({width: a.width,
            height: a.height,
            position: "absolute",
            left: a.left,
            top: a.top,
            opacity: 0.3
        })
        .attr("title",$mod.attr("title")||"")
        .attr("mid",$mod.attr('index'))
        .hover(function() {
        	$(this).addClass("mod-mask-layer-hover")
        }, function() {
        	$(this).removeClass("mod-mask-layer-hover")
        });
        if($mod.hasClass("empty")){
          masker.addClass("not-config");
      }
      masker.appendTo(document.body);
  }
   // window.onload = function(){
    $(".plugindiv").each(function(){
        var $mod = $(this);
        if($(this).is(":hidden")){
            $(this).show();
        }
        if($(this).hasClass("empty")){
            if($(this).parent() && $(this).parent().height() === 0){
                $(this).addClass("mod-defaultH");
            }
        };
        if($(this).height() == 0){
            $(this).addClass("mod-defaultH");
        }
        addMasker($mod);

        cover
        $(window).load(function(){
            addMasker($mod);
        });
    });
});