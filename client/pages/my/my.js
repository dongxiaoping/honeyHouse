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
    recommendConfig:null,
    recommendUserCount: 0,
    recommendBuyCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    Log.d("onLoad");
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });

    dataAccess.getRecommendConfig({
        callback: function(status, res) {
            if (res.status === globalConst.interfaceStatus.SUCCESS) {
                let info = res.data;
                this.setData({
                    recommendConfig: info,
                });
            }
        }
    })
  },

  eventToOrderPage() {
    wx.navigateTo({
      url: "../allOrderPage/allOrderPage"
    });
  },

    zfTipEvent(){
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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    Log.d("onShow");
    let userInfo = app.globalData.userInfo;
    let wechat_id = userInfo.wechat_id;
    Log.d(userInfo);
    dataAccess.getRecommendRecordsByUserId({
      data: {
        id: userInfo.id
      },
      callback: function(status, res) {
        if (res.status === globalConst.interfaceStatus.SUCCESS) {
          let recordList = res.data;
          that.setRecommendCount(recordList);
          Log.d(recordList);
        }
      }
    });
    dataAccess.getUserInfoByWechatId({
      data: {
        id: wechat_id
      },
      callback: function(status, res2) {
        Log.d(res2);
        if (res2.status === globalConst.interfaceStatus.SUCCESS) {
          let info = res2.data;
          app.globalData.userInfo = info;
          that.setData({
            userInfo: info
          })
        }
      }
    });
  },

  testClearInfo:function(){
      app.clearUser();
      wx.showToast({
          title: '清空完成！',
          duration:3000,
          icon: 'none'
      });
      Log.d("清空缓存数据");
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

  }
})