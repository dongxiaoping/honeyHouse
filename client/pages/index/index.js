let Log = require('../../common/Log');
let dataAccess = require('../../common/dataAccess');
let globalConst = require('../../common/globalConst');
var app = getApp();
Page({
  data: {
    goodInfo: null,
    isFirstShow:true,
    swipeImages: [], ////轮播图
    selectedChildInfo: null,
    isChildPanelShow: false,
    animationData: {}, //物品子类型选中面板显示动画
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    app.initUser(globalConst.PageSort.INDEX);
  },

  getGoodSellCount: function(goodInfo) {
    let count = 0;
    let list = goodInfo.child_list;
    list.forEach(item => {
      count += item.good_sell_count;
    });
    return count;
  },

  onShow: function() {
    let that = this;
    if (wx.showLoading&&this.data.isFirstShow) {
      this.data.isFirstShow = false;
      wx.showLoading({
        title: '加载中',
      })
    }
    dataAccess.getGoodByGoodCategoryId({
      data: {
        id: 1
      },
      callback: function(status, res) {
          if (wx.hideLoading()) {
              wx.hideLoading()
          }
        if (res.status === globalConst.interfaceStatus.SUCCESS) {
          let goodInfo = res.data; //接口原始商品数据
          goodInfo.good_sell_count = that.getGoodSellCount(goodInfo);
          let swipeImages = that.getSwipeImages(goodInfo);
          let selectedChildInfo = goodInfo.child_list[0];
          selectedChildInfo.buy_count = 1;
          that.setData({
            goodInfo: goodInfo,
            selectedChildInfo: selectedChildInfo,
            swipeImages: swipeImages
          });
          Log.d(goodInfo);
        }
      }
    });
  },

  onHide: function() {
      this.hideModal();
  },

  getSwipeImages: function(goodInfo) {
    let swipeImages = [];
    let listStr = goodInfo.image_list;
    let list = JSON.parse(listStr);
    Log.d(listStr);
    list.forEach(item => {
      let it = {
        child_image: item
      };
      swipeImages.push(it);
    });
    return swipeImages;
  },

  /**选择类型 */
  chooseChildGood: function(data) {
    let that = this;
    let item = data.currentTarget.dataset;
    let childInfo = {
      id: item.goodCode,
      name: item.goodName,
      good_orin_price: item.goodOrinPrice,
      good_price: item.goodPrice,
      good_unit: item.goodUnit,
      buy_count: 1,
      child_image: item.childImage
    };
    Log.d(childInfo);
    that.setData({
      selectedChildInfo: childInfo
    });
  },

  /**点击选择花色按钮、显示页面 */
  viewChildSelectArea: function(data) {
    let that = this;
    Log.d(that.data.selectedChildInfo);
    let animation = wx.createAnimation({ //动画
      duration: 500, //动画持续时间
      timingFunction: 'linear', //动画的效果 动画从头到尾的速度是相同的
    });
    animation.translateY(0).step(); //在Y轴偏移tx，单位px
    that.setData({
      animationData: animation.export()
    });
    that.setData({ //把选中值，放入判断值中
      isChildPanelShow: true,
    })
  },

  hideModal: function(data) {
    let that = this;
    that.setData({
      isChildPanelShow: false,
    })
  },

  goodAdd: function(data) {
    let that = this;
    let selectedChildInfo = that.data.selectedChildInfo;
    selectedChildInfo.buy_count += 1;
    that.setData({
      selectedChildInfo: selectedChildInfo
    })
  },

  goodReduce: function(data) {
    let that = this;
    let selectedChildInfo = that.data.selectedChildInfo;
    selectedChildInfo.buy_count = (selectedChildInfo.buy_count >= 2) ? (selectedChildInfo.buy_count - 1) : 1;
    that.setData({
      selectedChildInfo: selectedChildInfo
    })
  },

  saveOrder: function(data) {
    if (!this.data.selectedChildInfo) {
      wx.showToast({
        title: '您还没有选择商品哦~',
        duration: 2000,

      });
      return;
    }
    let selectedGoods = this.data.selectedChildInfo;
    selectedGoods.category_name = this.data.goodInfo.name;
    app.globalData.orderInfo = [selectedGoods];
    Log.d(app.globalData.orderInfo);
    wx.navigateTo({
      url: "../pay/pay"
    });
  },

  /**
   * 预览图片
   * 无法显示本地图片！！！！！！！
   */
  seePreviewImg: function(e) {
    let showImg = e.currentTarget.dataset.img;
    Log.d(showImg);
    let array = [];
    let that = this;
    let imgArray = that.data.swipeImages;
    for (let i = 0; i < imgArray.length; i++) {
      array.push(imgArray[i].child_image)
    }
    Log.d(showImg);
    Log.d(array);
    wx.previewImage({
      current: showImg, // 当前显示图片的http链接
      urls: array // 需要预览的图片http链接列表
    })
  }
});