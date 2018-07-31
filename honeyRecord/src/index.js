console.log(indexList);
var bodyOb = document.body;
var articleString = "";
for(var i=0;i<indexList.length;i++){
    articleString += getHtmlStringByArticle(indexList[i]);
    console.log(articleString);
}
bodyOb.innerHTML = articleString;

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
        "<div class='desc'> <p>2018-07-10  分享到朋友圈</p> </div> </div>";
    return setString;
}

function tapEvent(content){
    alert(content);
}
