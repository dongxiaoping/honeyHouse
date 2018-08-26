/**
 * Created by dongxiaoping-nb on 2018/8/18.
 */
var httpLocation = "https://dongxiaoping.cn";
function getUrlParam(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function kset(key, value){
    window.localStorage.setItem(key, value);
}

function kget(key){
    return window.localStorage.getItem(key);
}

function kremove(key){
    window.localStorage.removeItem(key);
}

function kclear(){
    window.localStorage.clear();
}