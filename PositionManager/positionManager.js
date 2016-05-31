/*
* 稿件位置管理类
* @class PositionManager
* @static
* @author wxmaudio
 */
var PositionManager = (function(ctx){
    /**
     * @method getAllSortNum [异步返回已经占用的排序数组]
     * @param  {Object} articleObj [article对象，含tableName，tableId，queryId]
     * @param  {String} sourceType [来源]
     * @param  {String} sortNum    [排序号]
     * @return {Object}  [已经占用的排序Promise对象]    
     */
    function getAllSortNum(articleObj,sourceType,sortNum){
            if(typeof sortNum )
            var url = ctx +"/content/validateSortNum.htm";
            return $.ajax({
                type:"POST",
                url: url,
                data:{
                         tableName : articleObj.tableName || '',
                         tableId : articleObj.tableId || '',
                         nodeId : articleObj.queryId || '',
                         sourceType : sourceType,
                         sortNum : sortNum
                }
            });
    }

    function isArray(a) {
        return Array.isArray(a) || Object.prototype.toString.call(a) === '[object Array]';
    }
   
    function ifUsed(sortNum,ids){
        var i = 0;
         if(isArray(ids)){
                for(;i<ids.length;i++){
                    if(sortNum == ids[i]){
                       return true;
                    }
                }
         }
         return false;
    }
    //验证排序号是否占用
    function ifUsedInFixedArray(sortNum,usedMsg){
        return function(data){
            var data = $.parseJSON(data);//已经占用的排序号数组
            var checkSortPromise = new $.Deferred();
            
            if(ifUsed(sortNum,data)){
                var msg = usedMsg || "排序号已经被占用！请勿选择以下排序号：" + data.join(",");
                checkSortPromise.reject(msg);
            }else{
                checkSortPromise.resolve();
            }

            checkSortPromise.fail(function(msg){
                  alert(msg);
            })
            return checkSortPromise.promise();
        }
    }
     
    function getSortFail(){
        alert("排序号验证失败，请稍后再试！");
    }


   /**
     * @method checkSortIfUsed [查看排序号是否占用]
     * @param  {Object} articleObj [article对象，含tableName，tableId，queryId]
     * @param  {String} sourceType [来源]
     * @param  {String} sortNum    [排序号]
     * @param  {String} usedMsg [排序号被占用时提示用户的信息]
     * @return {Object}  [排序号是否占用Promise对象]    
     */
    function checkSortIfUsed(articleObj,sourceType,sortNum,usedMsg){
        var p = getAllSortNum(articleObj,sourceType,sortNum).then(ifUsedInFixedArray(sortNum,usedMsg),getSortFail);
        
        return p;
    }

    
    /**
     * 数组元素从fromIndex移动到toIndex，
     * 若向下移动：fromIndex+1~toIndex位置的数据跳过锁定位置的元素顺次向上移动一位；
     * 若向上移动：toIndex+1~fromIndex位置的数据跳过锁定位置的元素顺次向下移动一位；
     * @param  {Number} fromIndex     [移动前的位置index，注意序号从0开始]
     * @param  {Number} toIndex       [移动到的位置index，注意序号从0开始]
     * @param  {Array} arr         [移动的数组]
     * @param  {Array} fixedIndexArr [移动数组中位置固定的index组成的数组，注意序号从0开始]
     * @return {Object}               返回对象包括移动后的数组，移动后的序列号数组
     *     {
                arr : arr,//移动后的数组
                indexs : indexArr //移动后的序列号数组，注意序号是从1开始的，以适应业务后台需求
            }
        @example
        如[a,b,c],0位置移动到1位置，fixedIndexArr为[],函数应返回
        {   arr:[b,a,c],
            indexs:[2,1,3]
        }
     */
    function getMovedSequence(fromIndex, toIndex,arr, fixedIndexArr) {
        var len = arr;//移动数组的长度
        var indexArr = [];//移动元素自然序号数组
        var temp,tempIndex;
        function isFixed(index){
            return (fixedIndexArr.length >0 
                && fixedIndexArr.indexOf(fromIndex) != -1);
        }

        //越界或不能移动则返回null
        if(fromIndex <0
           || fromIndex >= len
           || toIndex <0
           || toIndex >= len
           || isFixed(fromIndex)
           || isFixed(toIndex)){ 
            return null;
        }

        //未传入id数组或占用序号数组返回null
        if(!isArray(arr) || !isArray(fixedIndexArr)){
            return null;
        }
        
        //获取id数组的自然序号存入indexArr，注意序号是从1开始的
        indexArr = arr.map(function(value, index) {
            return index + 1;
        });

        //未移动
        if(fromIndex === toIndex){
            return{
                arr : arr,
                indexs : indexArr
            }
        }


        temp = arr[fromIndex];
        tempIndex = indexArr[fromIndex];

        //向下移动
        if(fromIndex < toIndex){
            for(var i= fromIndex + 1 ;i<=toIndex ; i++){
                //固定节点不移动
                if(isFixed(i)) continue;
                var j = i-1;
                //一直向上寻找直到找到一个未固定位置的节点
                while(isFixed(j)
                    && j > fromIndex){
                    j --;
                }
                arr[j] = arr[i];
                indexArr[j] = indexArr[i];
            }
            
        }

        //节点向上移动，toIndex~fromIndex之间的节点向下移动
        if(fromIndex > toIndex){
            for(var i= fromIndex - 1 ;i>=toIndex ; i--){
                //固定节点不移动
                if(isFixed(i)) continue;
                var j = i+1;
                //一直向下寻找直到找到一个未固定位置的节点
                while(isFixed(j)
                    && j < fromIndex){
                    j ++;
                }
                arr[j] = arr[i];
                indexArr[j] = indexArr[i];
            }
        }

        arr[toIndex] = temp;
        indexArr[toIndex] = tempIndex;

        return{
            arr : arr,
            indexs : indexArr
        }
    }


    return {
        ifSortUsed : checkSortIfUsed,
        getMovedSequence : getMovedSequence
    }

})(ctx);