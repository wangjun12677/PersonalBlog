var everyDay = new Vue({
    el:"#every-day",
    data:{
        content:"发就拉个卡扣"
    },
    computed:{
        getContent:function(){
            return this.content;
        }
    },
    created:function(){
        axios({
            url:"/queryEveryDay",
            method:"get",
        }).then(function(resp){
            everyDay.content = resp.data.data[0].content;
        }).catch(function(resp){
            console.log('请求失败')
        })
    }
});
var article = new Vue({
    el:"#article-list",
    data:{
        page:1,
        pageSize:5,
        count:100,
        pageNumList:[],
        articleList:[
            {
                title:"这个是标题",
                content:"使用php内置的hexdec函数在把超大的十六进制转换到十进制整型表示时",
                date:"2018-1-1",
                views:"101",
                tags:"test1 test2",
                id:"1",
                link:""
            }
        ]
    },
    computed: {
        jumpTo:function(){
            return function(page){
                this.getPage(page,this.pageSize);
            }
        },
        getPage:function () {
            return function(page,pageSize){
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                var tag = "";

                for (var i = 0 ; i < searcheUrlParams.length ; i ++) {
                    if (searcheUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searcheUrlParams[i].split("=")[1];
                        }catch (e) {
                            console.log(e);
                        }
                    }
                }
                if(tag == ""){//不是查询情况 显示所有的博客
                    axios({
                        method:"get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list = []
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article.articleList = list;
                        article.page = page;
                    }).catch(function(resp){
                        console.log("请求错误");
                    });
                    axios({//请求count
                        method:"get",
                        url:"/queryBlogCount"
                    }).then(function(resp){
                        article.count = resp.data.data[0].count;
                        article.generatePageTool;
                    });
                }else{//根据标签查询博客
                    axios({
                        method:"get",
                        url: "/queryByTag?page=" + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
                    }).then(function(resp){
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        article.articleList = list;
                        article.page = page;
                    }).catch(function(resp){
                        console.log("请求错误");
                    });
                    axios({//请求count
                        method:"get",
                        url:"/queryByTagCount?tag=" + tag
                    }).then(function(resp){
                        article.count = resp.data.data[0].count;
                        article.generatePageTool;
                    });
                }

            }
        },
        generatePageTool:function(){
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2){
                result.push({text:nowPage-2, page:nowPage-2})
            }
            if(nowPage > 1){
                result.push({text:nowPage-1, page:nowPage-1})
            }
            result.push({text:nowPage, page:nowPage})
            if(nowPage + 1 <= (totalCount + pageSize -1) / pageSize){
                result.push({text:nowPage+1, page:nowPage+1})
            }
            if(nowPage + 2 <= (totalCount + pageSize -1) / pageSize){
                result.push({text:nowPage+2, page:nowPage+2})
            }
            result.push({text:">>",page:parseInt((totalCount + pageSize -1) / pageSize)})
            this.pageNumList = result;
            return result;
        }
    },
    created:function(){
        //请求数据给articleList赋值
        this.getPage(this.page,this.pageSize);

    }
})