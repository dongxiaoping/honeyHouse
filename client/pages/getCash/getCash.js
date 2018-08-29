let dataAccess = require('../../common/dataAccess');
var app = getApp();
let Log = require('../../common/Log');
let globalConst = require('../../common/globalConst');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      extractReqCode:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      let userInfo = app.globalData.userInfo;
      dataAccess.get_cash_extract_wait_deal({
          data: {
              user_id: userInfo.id
          },
          callback: function(status, res) {
              if (res.status === globalConst.interfaceStatus.SUCCESS) {
                  Log.d(res);
                  let extractReqCode = res.data.flow_num;
                  Log.d(extractReqCode);
                  that.setData({
                      extractReqCode: extractReqCode,
                  });
              }
          }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },


  eventGetCashCode:function(){
      let that = this;
      let userInfo = app.globalData.userInfo;
      dataAccess.cashExtractReq({
          data: {
              user_id: userInfo.id
          },
          callback: function(status, res) {
              if (res.status === globalConst.interfaceStatus.SUCCESS) {
                  Log.d(res);
                  let extractReqCode = res.data;
                  that.setData({
                      extractReqCode: extractReqCode,
                  });
              }else if(res.status === globalConst.interfaceStatus.FAILL){
                  if(res.message==="cash-not-enough"){
                      wx.showToast({
                          title: "金额要超过"+res.data+"元才可提取！",
                          duration:3000,
                          icon: 'none'
                      });
                  }
              }
          }
      });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})