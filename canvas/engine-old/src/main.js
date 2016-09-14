//加载游戏中的所有图片
var imageList = [
{ 
    key : 'bg',
    url : './images/bg.jpg'
},
{
    key : 'player',
    url : './images/player.png'
}
]

ImageLoader.load(imageList, function(){
//显示游戏操作按钮
document.getElementById("operation").style.display = 'block'; 

//绘制游戏背景画布
var bgLayer = new CSE.Layer({canvas: "bg"});
var bgctx = bgLayer.context;
//初始化背景画布图案
bgctx.drawImage(ImageLoader.get('bg'), 0, 0);

//绘制游戏背景
var bg = getMovingBg(ImageLoader.get('bg'), 320, 1126, 1, true);
bgLayer.appendChild(bg);


//绘制游戏主画布
var layer = new CSE.Layer();
var canvas = layer.setCanvas("canvas");
var playctx = layer.context;

//绘制小球
var particleNum = 15;
var particles = [];
for(var i = 0; i < particleNum ; i ++){
    var colorArr = ["#005588", "#080"];
    var scoreArr = [1,2];
    var type = Math.random()>0.5? 1:0;
    var particle = new CSE.AnimateObj({
        index: i,//序号
        type : 'particle',//标明孩子节点类型
        x : Math.round(canvas.width * Math.random()),
        y : 0,
        rangeX : [0, canvas.width],
        rangeY : [0, canvas.height],
        vy : 2 * Math.random(),//垂直向下运动
        vx : 0, //垂直向上运动
        radius : 10,//半径大小
        width : 20,
        height : 20,
        color : colorArr[type],
        autoChange : true
    });
    particle.customDraw = function (ctx) {
        var t = this;

        ctx.beginPath();
        ctx.fillStyle = t.color;
        ctx.arc(t.x, t.y, t.radius, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
    }

    particles.push(particle);
    layer.appendChild(particle);
}

//绘制玩家
var player = new CSE.Player({
   img : ImageLoader.get('player'),
   width : 112,
   height : 106,
   radius : 50,//用于碰撞检测
   x : canvas.width/2 - 50,
   y : canvas.height/2 - 40
});
//添加游戏鼠标控制
player.addControl();
//注册发生碰撞时的回调
player.onHit = function(target, index){
    target.visible = false;
    setScore();
}
layer.appendChild(player);


//拓展画布更新函数，循环利用节点池中的节点,同时进行碰撞检测
layer.onupdate = function(){
    var alive = 0, hideIndexs = [];
    //与player的碰撞检测
    player.hitTest(particles);

    //注意：layer中可能有多种类型
    layer.childs.forEach(function(child, i){
        if(typeof child.type === 'string' && child.type == 'particle'){

            if(child.visible){
                alive++;
            }else{
                hideIndexs.push(i);
            }
        }    
    });

    //向屏幕中产生回收的旧节点
    if(alive < 10 && hideIndexs.length > 0){
        var index = hideIndexs.shift(),child;
        child = layer.childs[index];

        child.x = Math.round(canvas.width * Math.random());
        child.y = 0;
        child.visible = true;
    }
}


//UI
//记录分数
var score = 0;
function setScore(){
    score ++;
    document.getElementById("number").innerHTML = score;
}


//新建游戏对象，添加刚才创建的游戏画布层对象
var game = new CSE.Game();
game.addLayer(bgLayer);
game.addLayer(layer);

//注册游戏控制事件
document.getElementById('start').onclick = function(){
    game.start()
};
document.getElementById('stop').onclick = function(){
    game.stop();
}
document.getElementById('destroy').onclick = function(){
    game.destroy();
};

});



