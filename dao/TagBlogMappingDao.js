var dbutil = require("./DBUtil");
function insertTagBlogMapping(tagId,blogId,ctime,utime,success){//向数据库增加
    var insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`,`ctime`, `utime`) values (?,?,?,?)";
    var params = [tagId,blogId,ctime,utime];
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

function queryByTag(tagId, page,pageSize, success){//根据标签查询博客
    var querySql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    var params = [tagId, page * pageSize, pageSize];
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

function queryByTagCount(tagId, success){//查询该标签的博客总数
    var querySql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    var params = [tagId];
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

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;