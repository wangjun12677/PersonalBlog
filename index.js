var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");

var app = new express();
app.use(express.static("./page/"));//设置静态文件的位置

app.post("/editEveryDay", loader.get("/editEveryDay"));//post方法获取editEveryDay接口
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"))
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));

app.get("/queryBlogCount", loader.get("/queryBlogCount"));//博客条数 用于分页
app.get("/queryBlogById",loader.get("/queryBlogById"));//根据id查找博客详情

app.get("/addComment",loader.get("/addComment"));//增加评论
app.get("/queryRandomCode",loader.get("/queryRandomCode"));//生成验证码
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"));//根据博客id查询评论
app.get("/queryCommentsCountByBlogId",loader.get("/queryCommentsCountByBlogId"));//根据博客id查询评论总条数

app.get("/queryAllBlog",loader.get("/queryAllBlog"));//根据所有的博客
app.get("/queryRandomTags",loader.get("/queryRandomTags"));//查询标签
app.get("/queryHotBlog",loader.get("/queryHotBlog"));//查询最新热门
app.get("/queryNewComments",loader.get("/queryNewComments"));//查询最新评论

app.get("/queryByTag",loader.get("/queryByTag"));//根据标签查询博客
app.get("/queryByTagCount",loader.get("/queryByTagCount"));//根据标签查询博客总数

app.listen(globalConfig.port,function () {//监听端口
    console.log("服务已启动")
});