let goodDemo = require('../../mock/goodDemo');
let Log = require('../../common/Log');
Page({
  data: {
    //商品信息，假装请求到的信息
    orinGoodMsg: goodDemo,
    good: { //商品

    },
    mainImg: '', //主图
    goodPrice: 99.99, //商品价格
    goodOrinPrice: 999.99,
    goodflowers: [],
    imgUrls: [], ////轮播图
    chooseFlowers: [], //选中的花色
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    flowerImgSelect: '', //选中的花色图片
    flowerNameSelect: "", //
    flowerSelect: 0, //判断是否选中
    isHidden: 0,
    animationData: {}, //选择动画
    showModalStatus: false, //显示遮罩
    goodNum: 1, //商品数量
    select: 0, //商品详情、参数切换
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中',
      })
    }
    let data = that.data.orinGoodMsg; //写死的商品信息
    let goodBaseMsg = data.good; //商品基本信息
    let goodflowersMsg = data.goodflowers; //商品花色信息
    let swiperAy = []; //轮播图
    let goodPrice = 999.99; //显示价格
    let goodOrinPrice = 999.99; //划线价格
    for (let i = 0; i < goodflowersMsg.length; i++) {
      let jo = {
        flower_image: goodflowersMsg[i].flower_image,
        flower_id: goodflowersMsg[i].flower_id,
      };
      swiperAy.push(jo);
    }
    that.setData({ //商品
      mainImg: goodBaseMsg.good_display_img,
      flowerImgSelect: goodBaseMsg.good_display_img,
      good: goodBaseMsg,
      goodflowers: goodflowersMsg,
      imgUrls: swiperAy,
      goodPrice: goodPrice,
      goodOrinPrice: goodOrinPrice,
    });
    if (wx.hideLoading()) {
      wx.hideLoading()
    }
  },

  /**选择类型 */
  chooseFlower: function(data) {
    let that = this;
    let flower_id = data.currentTarget.dataset.select;
    let flower_name = data.currentTarget.dataset.flowerName;
    that.setData({ //把选中值，放入判断值中
      flowerNameSelect: flower_name,
      flowerSelect: flower_id
    });
    let str = flower_id + ',' + flower_name;
    let chooseFlowers = that.data.chooseFlowers;
    chooseFlowers = [];
    chooseFlowers.push(str);
    that.setData({
      chooseFlowers: chooseFlowers,
      flowerImgSelect: data.currentTarget.dataset.img
    })
  },

  /**点击选择花色按钮、显示页面 */
  viewFlowerArea: function(data) {
    let that = this;
    let animation = wx.createAnimation({ //动画
      duration: 500, //动画持续时间
      timingFunction: 'linear', //动画的效果 动画从头到尾的速度是相同的
    });
    animation.translateY(0).step() //在Y轴偏移tx，单位px

    this.animation = animation
    that.setData({
      showModalStatus: true, //显示遮罩
      animationData: animation.export()
    });
    that.setData({ //把选中值，放入判断值中
      isHidden: 1,
    })
  },

  /**隐藏物品子类型选择面板 */
  hideModal: function(data) {
    let that = this;
    that.setData({
      showModalStatus: false, //显示遮罩
      isHidden: 0,
    })
  },

  goodAdd: function(data) {
    let that = this;
    let goodCount = that.data.goodNum + 1;
    that.setData({ //商品数量+1
      goodNum: goodCount
    })

  },

  goodReduce: function(data) {
    let that = this;
    let goodCount = that.data.goodNum - 1;
    that.setData({ //商品数量+1
      goodNum: goodCount
    })

  },

  /**商品详情、参数切换 */
  changeArea: function(data) {
    let that = this;
    let area = data.currentTarget.dataset.area;
    that.setData({
      "select": area
    });

  },

  /**
   * 生成订单
   */
  saveOrder: function(data) {
    let that = this;
    let thatData = that.data;
    let ja = thatData.chooseFlowers; //选中的花色
    let good_id = thatData.good.good_id; //good_id
    let good_name = thatData.good.good_name; //good_name
    let gn = thatData.goodNum; //数量
    let good_price = thatData.goodPrice; //价格v
    let goodDisplayImg = thatData.mainImg; //主图
    if (ja.length > 0) {
      wx.showToast({
        title: '成功！',
        duration: 2000,
      })
    } else {
      wx.showToast({
        title: '您还没有选择花色哦~',
        duration: 2000,

      })
    }
  },

  /**
   * 查看轮播图片
   */
  seeSwiperAll: function(e) {
    this.seePreviewImg(0, e.currentTarget.dataset.img)
  },

  /**
   * 查看花色图片
   * */
  seeFlowersAll: function(e) {
    this.seePreviewImg(1, e.currentTarget.dataset.img)
  },

  /**
   * 预览图片
   *
   * 无法显示本地图片！！！！！！！
   * 无法显示本地图片！！！！！！！
   * 无法显示本地图片！！！！！！！
   *
   * @pd 0表示轮播图 、 1表示花色
   */
  seePreviewImg: function(pd, showImg) {
    let array = [];
    let that = this;
    if (pd === 0) {
      let imgArray = that.data.imgUrls;
      for (let i = 0; i < imgArray.length; i++) {
        array.push(imgArray[i].flower_image)
      }
    } else if (pd === 1) {
      let imgArray = that.data.imgArray;
      for (let i = 0; i < imgArray.length; i++) {
        array.push(imgArray[i].url)
      }
    }
    wx.previewImage({
      current: showImg, // 当前显示图片的http链接
      urls: array // 需要预览的图片http链接列表
    })
  }
});