var touchDot = 0;//触摸时的原点
var time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动
var interval = "";// 记录/清理时间记录
var src = "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400";
Page({
  data: {
    playSrc:src
  },

  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo');
    this.videoContext.play();
  },

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
  },

  // 触摸开始事件
  touchStart: function (e) {
      touchDot = e.touches[0].pageX; // 获取触摸时的原点
      // 使用js计时器记录时间
      interval = setInterval(function () {
          time++;
      }, 100);
  },

  // 触摸移动事件
  touchMove: function (e) {
      var touchMove = e.touches[0].pageX;
      console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
      // 向左滑动
      if (touchMove - touchDot <= -40 && time < 10) {
          console.log('向左滑动');
      }
      // 向右滑动
      if (touchMove - touchDot >= 40 && time < 10) {
          console.log('向右滑动');

      }
  },

  // 触摸结束事件
  touchEnd: function (e) {
      clearInterval(interval); // 清除setInterval
      time = 0;
  }

});