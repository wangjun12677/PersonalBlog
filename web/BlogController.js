var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();

function queryHotBlog(request, response){
    blogDao.queryHotBlog(4,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryHotBlog", queryHotBlog);


function queryAllBlog(request, response){
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/queryAllBlog", queryAllBlog);

function queryBlogById(request, response){//根据id查询博客请求
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
        blogDao.addViews(parseInt(params.bid), function (result) {

        })
    });
}
path.set("/queryBlogById", queryBlogById);

function queryBlogCount(request, response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set("/queryBlogCount", queryBlogCount);

function queryBlogByPage(request,response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
        for (var i = 0 ; i < result.length ; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");//过滤掉img标签
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");//过滤掉标签
            result[i].content = result[i].content.substring(0, 300);//最多显示300个字符
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end();
    })
}
path.set("/queryBlogByPage",queryBlogByPage)

function editBlog(request,response){
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g,"").replace("，",",")//中文逗号换成英文逗号
    request.on("data", function(data){
        blogDao.insertBlog(params.title, data.toString(),tags,0,timeUtil.getNow(),timeUtil.getNow(),function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0; i < tagList.length; i++){
                if(tagList[i] == ""){
                    continue;
                }
                queryTag(tagList[i], blogId);
            }
        });
    });
}
path.set("/editBlog",editBlog)
function queryTag(tag, blogId) {
    tagsDao.queryTag(tag, function (result) {
        console.log()
        if (result == null || result.length == 0) {
            insertTag(tag, blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
        }
    });
}
function insertTag(tag, blogId) {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        insertTagBlogMapping(result.insertId, blogId);
    });
}

function insertTagBlogMapping(tagId, blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), function (result) {});
}

module.exports.path = path;

