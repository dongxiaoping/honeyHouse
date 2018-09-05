// pages/rechargeVoucher/rechargeVoucher.js
var app = getApp();
let Log = require('../../common/Log');
let globalConst = require('../../common/globalConst');
let dataAccess = require('../../common/dataAccess');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      voucherCode:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  bindFormSubmit: function (e) {
    let valueCode = e.detail.value.textarea;
    let userInfo = app.globalData.userInfo;
    let userId = userInfo.id;
    if(valueCode===""){
        wx.showToast({
            title: '请输入正确的代金券码！',
            duration: 3000,
            icon: 'none'
        });
      return ;
    }
    Log.d(valueCode);
    dataAccess.cash_voucher_to_user({
        data: {
            user_id: userId,
            code:"'"+valueCode+"'"
        },
        callback: function(status, res) {
            if (res.status === globalConst.interfaceStatus.SUCCESS) {
                let info = res.data;
                wx.showToast({
                    title: '充值成功',
                    duration: 3000,
                    icon: 'none'
                });
                wx.switchTab({
                    url: "../my/my"
                });
            }else{
                wx.showToast({
                    title: '提取失败，请联系客服！',
                    duration: 3000,
                    icon: 'none'
                });
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