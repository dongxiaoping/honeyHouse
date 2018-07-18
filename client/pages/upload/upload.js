var tabs = [
  {
    name: "上传视频"
  },
  {
    name: "上传图片"
  }
];

//var arr = [];
//这里是个大坑！！！空数组一定要设置到最外面，不然每次上传的时候，都会先清空，当初快给我整奔溃了，一定要注意。

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    tempFilePaths: '',
    picSrc:"",
    vedioSrc:""
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          //计算相关宽度
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68//计算内容区高度，rpx -> px计算
        });
      }
    });
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
    console.log("bindChange:" + current);
  },

  chooseImage:function(){
    var self = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
       // arr = arr.concat(tempFilePaths);
        //把获取到的图片的地址（数组），赋值给data中的src。    
        self.setData({ picSrc: tempFilePaths });
      }
    })
  },

  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 15,
      camera: 'back',
      success: function (res) {
        that.setData({
          vedioSrc: res.tempFilePath
        })
      }
    })
  },

  eventClearVideo:function(){
    this.setData({
      vedioSrc: ""
    })
  },

  navTabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    console.log("navTabClick:" + e.currentTarget.id);
  },

  uploadVideo:function(){
    console.log("上传视频");
  },

  eventClearPic:function(){
    this.setData({
      picSrc: ""
    })
  },

  uploadPic:function(){
    console.log("上传图片");
  }
})