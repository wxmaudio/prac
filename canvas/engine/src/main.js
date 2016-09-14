/**
 * 游戏主逻辑
 */

var ImageLoader = require('./util/ImageLoader');
var imageList = require('./resource/image');
var getParticles = require('./component/Particles');


/**
 * 加载过程中提示效果
 * @param  {number} loaded 已经加载数目
 * @param  {number} total 总数目
 * @return {null}
 */
function loading(loaded, total){
   var percent = (loaded / total) * 100;
   document.getElementById("loadProgress").innerHTML = percent;
}

//UI
//记录分数
var score = 0;
function setScore(){
    score ++;
    document.getElementById("number").innerHTML = score;
}

/*
* 初始化游戏背景画布
*/
function initBgLayer(){
    var bgLayer = new CSE.Layer({canvas: "bg"});
    var bgctx = bgLayer.context;
    //初始化背景画布图案
    bgctx.drawImage(ImageLoader.get('bg'), 0, 0);

    //绘制游戏背景
    var bg = getMovingBg(ImageLoader.get('bg'), 320, 1126, 1, true);
    bgLayer.appendChild(bg);
    return bgLayer;
}

/*
* 绘制游戏主画布
 */
function initMainLayer(){
    var layer = new CSE.Layer();
    var canvas = layer.setCanvas("canvas");
    var playctx = layer.context;

    //绘制小球
    var particleNum = 15;
    var particles = getParticles(particleNum, canvas.width, canvas.height);
    layer.appendChilds(particles);


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

    return layer;
}

/*
* 游戏初始化
 */
function initGame(){
    //新建游戏对象
    var game = new CSE.Game();

    //创建背景画布层
    var bgLayer = initBgLayer();

    //创建画布层
    var mainLayer = initMainLayer();

    game.addLayer(bgLayer);
    game.addLayer(mainLayer);

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

    return game;
}

/*
* 游戏加载成功回调
 */
function loaded(state){
    if(!state){
        alert('加载游戏出错，请稍后再试！');
        return false;
    }

    //显示游戏操作按钮
    document.getElementById("operation").style.display = 'block'; 
    initGame();
}

function init(){
   //加载游戏中的所有图片
    ImageLoader.load(imageList,loaded , loading); 
}

module.exports = init;