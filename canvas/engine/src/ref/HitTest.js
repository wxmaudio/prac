/**
     * @private
     * 获取精灵当前帧碰撞区域
     */
    Sprite.prototype.__getCollRect = function() {
        if(this.anim && this.anim.currentFrame) {
            return this.anim.currentFrame.collRect;
        }
    }
    /**
     * 碰撞检测
     * @param {Sprite Object} sprite2
     */
    Sprite.prototype.hitTest = function(sprite2) {
        var collRect1 = this.__getCollRect(), collRect2 = sprite2.__getCollRect(), coll1, coll2, result = false;

        if(collRect1 && collRect2) {
            var i1, len1 = collRect1.length, i2, len2 = collRect2.length;

            for( i1 = 0; i1 < len1; i1++) {
                coll1 = collRect1[i1];

                for( i2 = 0; i2 < len2; i2++) {
                    coll2 = collRect2[i2];

                    if(Math.abs((this.x + coll1[0] + coll1[2] / 2) - (sprite2.x + coll2[0] + coll2[2] / 2)) < (coll1[2] + coll2[2]) / 2 && Math.abs((this.y + coll1[1] + coll1[3] / 2) - (sprite2.y + coll2[1] + coll2[3] / 2)) < (coll1[3] + coll2[3]) / 2) {
                        result = true;
                        break;
                    }
                }
            }
        }
        sprite2 = collRect1 = collRect2 = coll1 = coll2 = null;
        return result;
    }