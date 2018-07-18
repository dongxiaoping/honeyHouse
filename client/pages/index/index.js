// pages/index/index.js
let list_js = require("../../mock/list.js");
let util_js = require("../../common/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    peopleList: list_js.list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      util_js.test();
      wx.getSystemInfo({
          success: function (res) {
              console.log(res.model)
              console.log(res.pixelRatio)
              console.log(res.windowWidth)
              console.log(res.windowHeight)
              console.log(res.language)
              console.log(res.version)
              that.setData({
                  windowHeight: res.windowHeight,
                  windowWidth: res.windowWidth,
              })
          }
      });

      wx.request({
        url: "http://39.108.181.67:8080/happyFriendRe/happy_friend_server/public/index.php/user/test",
          method:"POST",
          data:{a:3},
          header: {
            //设置参数内容类型为x-www-form-urlencoded
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          },
          success: function (res) {
              console.log(res.data);
              console.log("https://vwcllv78.qcloud.la/public/index.phps");
          }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  eventToDetail:function(){
    wx.navigateTo({
      url: "../../pages/vedioPlay/vedioPlay"
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