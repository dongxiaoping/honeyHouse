// pages/activity/activity.js
let app = getApp();
let globalConst = require('../../common/globalConst');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        recommendQCode:"",
        url:""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let recommendQCode = "";
        let url = "";
        if(this.isShareCome(options)){
            recommendQCode = options.recommendQCode;
            url = options.url;
        }else{
            let userInfo = app.globalData.userInfo;
            recommendQCode =  userInfo.recommend_code;
            url = globalConst.webPageUrl;
        }
        this.setData({
            recommendQCode: recommendQCode
        });
        this.setData({
            url: url
        });
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
            title: "来自蜂蜜屋的文章",
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