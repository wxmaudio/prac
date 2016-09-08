/*
* 加载图片资源
*/
(function(){
    var Image = function(){
        this.url = 
    }

})();





function A(N) {
        var Q = []//图片对象数组
          , O = 0;
        var S = function() {}
        ;
        //N 为图片的url数组
        var N = (typeof N != "object") ? [N] : N;
        //记录图片数目，当图片数目等于总数时执行回调
        function R() {
            O++;
            if (O == N.length) {
                S(Q)
            }
        }
        //根据图片url新建图片对象
        for (var P = 0; P < N.length; P++) {
            Q[P] = new Image();
            Q[P].onload = function() {
                R()
            }
            ;
            Q[P].onerror = function() {
                R()
            }
            ;
            Q[P].src = N[P]
        }
        return {
            done: function(T) {
                S = T || S
            }
        }
    }