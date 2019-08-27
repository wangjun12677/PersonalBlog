var fs = require("fs");
var globalConfig = require("./config")
var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globalConfig["web_path"]);//读取所有文件名 数组

for(var i = 0; i < files.length; i++){
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i]);//循环引入web_path下的每个文件
    if(temp.path){//web_path对象目录下导出的是否有path 有path表示有数据请求
        for(var [key,value] of temp.path){
            if(pathMap.get(key) == null){//pathMap.get(key)为什么没有重复的key会返回undefind
                pathMap.set(key,value)
            }else{
                throw new Error("url path异常,url:" + key)
            }
        }
        controllerSet.push(temp)//这个变量干什么的

    }
}
// console.log(pathMap)
// console.log(controllerSet)
module.exports = pathMap;//导出web页面下的每个文件的数据请求函数 不重复
