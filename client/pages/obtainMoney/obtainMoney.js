// pages/obtainMoney/obtainMoney.js
var app = getApp();
let dataAccess = require('../../common/dataAccess');
let globalConst = require('../../common/globalConst');
let Log = require('../../common/Log');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: "",
    windowWidth: "",
    recommendUserCount: 0,
    recommendConfig: null,
    recommendBuyCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });

    dataAccess.getRecommendConfig({
      callback: function (status, res) {
        if (res.status === globalConst.interfaceStatus.SUCCESS) {
          let info = res.data;
          that.setData({
            recommendConfig: info,
          });
        }
      }
    })
  },

  zfTipEvent() {
    wx.switchTab({
      url: "../activity/activity"
    });
  },
  
  setRecommendCount(recordList) {
    let recommendUserCount = 0;
    let recommendBuyCount = 0;
    recordList.forEach(item => {
      if (item.model === globalConst.rewardType.recommend_user) {
        recommendUserCount++;
      } else {
        recommendBuyCount++;
      }
    });
    this.setData({
      recommendUserCount: recommendUserCount,
      recommendBuyCount: recommendBuyCount
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
    let that = this;
    let userInfo = app.globalData.userInfo;
    dataAccess.getRecommendRecordsByUserId({
      data: {
        id: userInfo.id
      },
      callback: function (status, res) {
        if (res.status === globalConst.interfaceStatus.SUCCESS) {
          let recordList = res.data;
          that.setRecommendCount(recordList);
          Log.d(recordList);
        }
      }
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})