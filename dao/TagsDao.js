var dbutil = require("./dbUtil");
function insertTag(tag,ctime,utime,success){//向数据库增加
    var insertSql = "insert into tags (`tag`, `ctime`, `utime`) values (?, ?, ?)";
    var params = [tag,ctime,utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}
function queryTag(tag,success){//查询某个标签
    var querySql = "select * from tags where tag = ?;";
    var params = [tag];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queryAllTag(success){//查询所有标签
    var querySql = "select * from tags;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, function(error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}
module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;