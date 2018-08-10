let dataAccess = require('../../common/dataAccess');
let globalConst = require('../../common/globalConst');
let Log = require('../../common/Log');
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        windowHeight: "",
        windowWidth: "",
        userInfo: "", //用户基本信息
        recommendQCode: "", //推荐二维码地址
        recommendDataOfUser: "" //推荐数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        let recommendQCode = "";
        Log.d(app.globalData.userInfo);

        dataAccess.getRecommendRecordsByUserId({
            data:{id:app.globalData.userInfo.id},
            callback: function(status, res) {
                if(res.status ===globalConst.interfaceStatus.SUCCESS){
                    Log.d(res);
                }
            }
        });
        that.setData({
            userInfo: app.globalData.userInfo
        });
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    honeyPromotionEvent: function() {
        console.log("转发推广二维码");
    }
})