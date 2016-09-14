var production = process.argv.indexOf('-p') >= 0,//是否为生产环境
    pubFilename = 'GameBox',//最终打包的文件名称
    moduleName = 'GameBox'; //暴露给外部的模块名称

module.exports = {
    entry :{
        [pubFilename] : __dirname + '/index.js'
    },
    output : {
        libraryTarget: 'umd',
        library: [moduleName],
        path : __dirname + '/dist',
        filename : production ? '[name].min.js':'[name].js'
    }
}