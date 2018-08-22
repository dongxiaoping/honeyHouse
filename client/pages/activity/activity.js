// pages/activity/activity.js
let app = getApp();
let Log = require('../../common/Log');
let globalConst = require('../../common/globalConst');
let util = require('../../common/util');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        recommendQCode:"",
        randNum:1,
        url:""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let time = 10;
        let that = this;
        let url = "";
        let randNum= util.getRandomNum(1,999999);
        this.setData({
            randNum: randNum
        });
        if(this.isShareCome(options)){
            app.clearUser();
            app.globalData.userInfo.recommend_user_code = options.recommendQCode;
            Log.d(options);
            url = globalConst.webPageUrl;
            time=1000;
            Log.d("转发文章进入Activity");
            Log.d("推荐人推荐码:"+options.recommendQCode);
        }else{
            Log.d("Tab跳转进入Activity");
            url = globalConst.webPageUrl;
        }
        setTimeout(function(){
            let userInfo = app.globalData.userInfo;
            let recommendQCode =  userInfo.recommend_code;
            Log.d(recommendQCode);
            that.setData({
                recommendQCode: recommendQCode,
                url: url
            });
        },time);
        app.initUser(globalConst.PageSort.ACTIVITY);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    isShareCome:function(options){
        if(options.url){
            return true;
        }
        return false;
    },

    onShareAppMessage(options) {
        let webViewUrl = options.webViewUrl;
        let url = this.getUrlFromWebViewUrl(webViewUrl);
        let param = this.getParamFromWebViewUrl(webViewUrl);
        let appUrl = "pages/activity/activity?url="+url+"&"+param;
        return {
            title: "喝好蜂蜜 来蜜之屋",
            path: appUrl,
            success: function(res) {
            },
            fail: function(res) {
            }
        }
    },
    getUrlFromWebViewUrl(webViewUrl){
       let list =  webViewUrl.split("?");
       return list[0];
    },
    getParamFromWebViewUrl(webViewUrl){
        let list =  webViewUrl.split("?");
        return list[1];
    }
})