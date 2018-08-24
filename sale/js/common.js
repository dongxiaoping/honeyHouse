/**
 * Created by dongxiaoping-nb on 2018/8/18.
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function backToMainEvent(){
    var recommendQCode = getUrlParam("recommendQCode");
    var pageUrl = "https://dongxiaoping.cn/honeyHouse/honeyRecord/src/index.html?recommendQCode="+recommendQCode;
    console.log(pageUrl);
    $.mobile.changePage(pageUrl,{transition:"slideup"});
}