function hotSearchImageZoom() {
    ! function() {
        //图片原始宽高
        var imgWid = 125;

        var imgHei = 75;
        //放大倍数
        var big = 2.81;

        var imgWid2 = 0;

        var imgHei2 = 0;
        //放大以后的图片大小
        imgWid2 = imgWid * big;

        imgHei2 = imgHei * big;

        $(this).find("img").stop(true, true);
        var $container = $('.hotNews-con'),
            conWidth = $container.width();
        $(".hotNews-img").on({
            mouseenter: function() {
                var $this = $(this),
                    //获得相对父级的位置
                    top = $this.position().top,
                    left = $this.position().left;
                //超出容器右侧
                if (left + imgWid2 > conWidth) {
                    left = (left + imgWid2) - conWidth;
                //中心点发生变化 当left > imgWid2 / 2，中心点向左移动
                } else if (left - imgWid2 / 2 > 0) {
                    left = imgWid2 / 2 - imgWid / 2;
                }
                $this.css({
                    'z-index': 90
                }).find('img').stop().animate({
                    width: imgWid2,
                    height: imgHei2,
                    marginLeft: -left,//相对当前的位置左移
                    marginTop: -top,//相对当前的位置上移
                    left: 0
                });
            },
            mouseleave: function() {
                var $this = $(this);
                $this.find('img').stop().animate({
                    width: imgWid,
                    height: imgHei,
                    marginLeft: 0,
                    marginTop: 0
                }, function() {
                    $this.css({
                        'z-index': 2
                    });
                });
            }
        });
    }();
}