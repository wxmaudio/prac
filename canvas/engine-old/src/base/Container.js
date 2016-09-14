//var CSE = require('./base');
//var AnimateObj = require('./AnimateObj');
/**
 * 容器组件基类
 */
 CSE.Container = (function(){
    var Container = function (cfg) {
        /*
        * 子组件对象数组
        */
        this.childs = [];

        //调用父类的构造函数
        Container.superclass.constructor.call(this, cfg);
    }
    CSE.inherit(Container, CSE.AnimateObj);

    /**
    * 初始化 - 覆盖继承组件的方法
    */
    Container.prototype.init = function () {
        var childs = this.childs;

        for(var i = 0; i < childs.length ; i++){
            if(!childs[i].initialized){//避免重复初始化
                childs[i].init();
            }
            
        }
        //调用父级初始化
        Container.superclass.init.call(this);
    }

    /*
    * 渲染组件
    * @param {Context Object} ctx
    */
    Container.prototype.render = function (ctx) {
        //绘制子组件
        var childs = this.childs;
        for(var i = 0, len = childs.length; i < len; i++){
            childs[i].render(ctx);
        }

        Container.superclass.render.call(this, ctx);
    }

    /*
    * 更新组件
    * @param {Number} deltaTime
    */
    Container.prototype.update = function (deltaTime) {
        //更新子组件
        var childs = this.childs;
        for(var i = 0, len = childs.length; i < len; i++){
            childs[i].update.call(childs[i],deltaTime);
        }

        Container.superclass.update.call(this, deltaTime);
    }


    /**
     * 销毁子组件
     */
    Container.prototype.destroyChilds = function(){
        var childs = this.childs;
        //若已经销毁，则直接返回
        if(!childs) return;

        for(var i = 0; i < childs.length; i++){
            if(childs[i].initialized){
                childs[i].destroy();
            }   
        }
    }

    /**
     * 销毁组件-覆盖继承组件的方法
     */
    Container.prototype.destroy = function(){
        //销毁子组件
        this.destroyChilds();
        //删除引用
        this.childs = null;
        //调用继承组件销毁方法
        //Container.superclass.destroy.call(this);
    }

    Container.prototype.appendChild = function(child){
        this.addChildAt(child, this.childs.length-1);
    }

    Container.prototype.addChildAt = function(child, i) {
        child.parent = this;
        this.childs.splice(i,0,child);
    };

    Container.prototype.removeChild = function(child) {
       var childs = this.childs;

       for(var i = 0, len = childs.length; i < len; i++){
            if(childs[i] === child){
                this.removeChildAt(i);
                break;
            }   
       }

    };

    Container.prototype.removeChildAt = function(i){
        var child = this.childs.splice(i);

        child && (child.parent = null);
    }
    return Container;
 })();