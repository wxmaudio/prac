(function(){
	var Player = function (cfg) {
		this.width = 50;
		this.height = 80;

		if(CSE.isMobile()){
			this.eventType = {
				start : 'touchstart',
				move : 'touchmove',
				end : 'touchend'
			}
		}else{
			this.eventType = {
				start : 'mousestart',
				move : 'mousemove',
				end : 'mouseend'
			}
		}
		
		Player.superclass.constructor.call(this, cfg);
	}
	CSE.inherit(Player, CSE.AnimateObj);

	/*
	* 用鼠标或手势或键盘控制player
	*/
	Player.prototype.addControl = function(){
		var elem = document.getElementById('gameCanvas');
		var self = this, move = false;
		CSE.addHandler(elem,this.eventType.start,function(e){
			self.setPosition(e);
			move = true;
		});
		CSE.addHandler(elem,this.eventType.move,function(e){
			e.preventDefault();
			if(move){
				self.setPosition(e);
			}
		});
		CSE.addHandler(elem,this.eventType.end,function(e){
			move = false;
		});
	};

    /**
     * @private
     * 边界检查
     */
    Player.prototype._borderCheck = function() {
    	var rangeX = [0, 320],
    	    rangeY = [0, 640];

    	//左右边界检查
        if(this.x < rangeX[0]) {
            this.x = rangeX[0];
        } else if(this.x > rangeX[1] - this.width) {
            this.x = rangeX[1] - this.width;
        }

        //上下边界检查
        if(this.y < rangeY[0]){
        	this.y = rangeY[0];
        } else if(this.y > rangeY[1] - this.height){
        	this.y = rangeY[1] - this.height;
        }

    }

	Player.prototype.setPosition = function(e){
		this.x = e.clientX - this.width/2;
		this.y = e.clientY - this.height/2;

		this._borderCheck();
		console.log("setPosition");

		//刷新父层画布
		parent.change();

	}

	Player.prototype.draw = function(ctx) {
		ctx.drawImage(this.img, this.x, this.y);
	};

	CSE.Player = Player;
})();