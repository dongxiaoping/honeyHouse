let dataAccess = require('../../common/dataAccess');
let globalConst = require('../../common/globalConst');
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
    console.log(app.globalData.userInfo);

    let recommendDataOfUser = dataAccess.getRecommendDataOfUser();
    that.setData({
      recommendQCode: recommendQCode
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