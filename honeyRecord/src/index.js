var bodyOb = document.body;
var articleString = "";
for(var i=0;i<contentIndex.length;i++){
    articleString += getHtmlStringByArticle(contentIndex[i],i);
}
bodyOb.innerHTML = articleString;

for(var i=0;i<contentIndex.length;i++){
    $("#item0b_"+i).on("tap",function(event){
        var content = $(this).attr("content");
        var randNum = GetRandomNum(1,9999999);
        var pageUrl = "./page/"+content+"?recommendQCode="+recommendQCode+"&rand="+randNum;
        $.mobile.changePage(pageUrl,{transition:"slideup"});
    })
}

var recommendQCode = getUrlParam("recommendQCode");

function getHtmlStringByArticle(item,i){
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
    var setString = "<div id=item0b_"+i+" content='"+item.content+"' class='article-title'><p class='title'>"+item.title+"</p><div class='pic-box'>"+imgString+"</div>" +
        "<div class='desc'> <p>"+item.date+"</p> </div> </div>";
    return setString;
}

function tapEvent(content){
    var randNum = GetRandomNum(1,9999999);
    var pageUrl = "./page/"+content+"?recommendQCode="+recommendQCode+"&rand="+randNum;
    $.mobile.changePage(pageUrl,{transition:"slideup"});
}

function GetRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

