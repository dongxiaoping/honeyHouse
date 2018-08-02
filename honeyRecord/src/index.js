var bodyOb = document.body;
var articleString = "";
for(var i=0;i<contentIndex.length;i++){
    articleString += getHtmlStringByArticle(contentIndex[i]);
    console.log(articleString);
}
bodyOb.innerHTML = articleString;

var userId = getUserId("id");
console.log(userId);

function getHtmlStringByArticle(item){
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
    var setString = "<div ontouchend='tapEvent(\""+item.content+"\")' class='article-title'><p class='title'>"+item.title+"</p><div class='pic-box'>"+imgString+"</div>" +
        "<div class='desc'> <p>"+item.date+"</p> </div> </div>";
    return setString;
}

function tapEvent(content){
    var recommendCode = 123;
    var pageUrl = "./page/"+content+"?recommendCode="+recommendCode;
    $.mobile.changePage(pageUrl,{transition:"slideup"});
}

function getUserId(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

