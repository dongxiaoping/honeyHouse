
var httpLocation = "https://dongxiaoping.cn";
$(function(){
    $.get(httpLocation+"/honeyHouse/server/public/index.php?s=article/get_online_articles",function(res,status){
        var list = JSON.parse(res);
        var articleList = list.data;
        var bodyOb = document.body;
        var articleString = "";
        for(var i=0;i<articleList.length;i++){
            articleString += getHtmlStringByArticle(articleList[i],i);
        }
        bodyOb.innerHTML = articleString;

        var recommendQCode = getUrlParam("recommendQCode");
        for(var i=0;i<articleList.length;i++){
            $("#item0b_"+i).on("tap",function(event){
                var content = $(this).attr("content");
                var articleId = $(this).attr("article_id");
                console.log(articleId);
                $.get(httpLocation+"/honeyHouse/server/public/index.php?s=article/add_article_visit&id="+articleId,function(res,status){});
                var randNum = GetRandomNum(1,9999999);
                var pageUrl = "./page/"+content+"?recommendQCode="+recommendQCode+"&rand="+randNum;
                window.location.href = pageUrl;
            })
        }
    });
});

function getHtmlStringByArticle(articleItem,i){
    var item = articleItem["content"];
    var imgString = "";
    if(item.images[0]){
        var imageUrl = item.images[0];
        imgString+= "<img class='img-set' src='"+imageUrl+"'>";
    }
    if(item.images[1]){
        var imageUrl = item.images[1];
        imgString+= "<img  style='margin-left: 2%;margin-right: 2%;' class='img-set' src='"+imageUrl+"'>";
    }

    if(item.images[2]){
        var imageUrl = item.images[2];
        imgString+= "<img class='img-set' src='"+imageUrl+"'>";
    }
    var setString = "<div id=item0b_"+i+"  article_id='"+articleItem.id+"' content='"+item.content+"' class='article-title'><p class='title'>"+item.title+"</p><div class='pic-box'>"+imgString+"</div>" +
        "<div class='desc'> <p>"+item.date+"  "+item.visit_count+"访问量</p> </div> </div>";
    return setString;
}

function GetRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}



