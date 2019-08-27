var dbutil = require("./DBUtil");
function inserEveryDay(content,ctime,success){//向数据库增加
    var insertSql = "insert into every_day (`content`, `ctime`) values (?, ?)";
    var params = [content,ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params, function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}
function queryEveryDay(success){//查找数据库
    var querySql = "select * from every_day order by id desc limit 1;";
    var params = [];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params, function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

module.exports.inserEveryDay = inserEveryDay;
module.exports.queryEveryDay = queryEveryDay;