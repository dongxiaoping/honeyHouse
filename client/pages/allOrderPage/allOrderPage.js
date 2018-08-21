let dataAccess = require('../../common/dataAccess');
var app = getApp();
let globalConst = require('../../common/globalConst');
let Log = require('../../common/Log');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      allOrderList:[],
      selectedOrderType:0,
      showOrderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this;
      dataAccess.getOrdersOfUser({
          data:{user_id:app.globalData.userInfo.id,order_status:null},
          callback: function(status, res) {
              if(res.status ===globalConst.interfaceStatus.SUCCESS){
                  let allOrderList = res.data;
                  allOrderList = that.initOrderData(allOrderList);
                  that.setData({
                      allOrderList: allOrderList,
                      showOrderList:allOrderList
                  });
                  Log.d(allOrderList);
              }
          }
      });
  },

    initOrderData(orderList){
      for(let i=0;i<orderList.length;i++){
          let totalPrice = 0;
          orderList[i].orderDes = globalConst.OrderDes[orderList[i].order_status];
          let goods = orderList[i].goods;
          for(let j=0;j<goods.length;j++){
              totalPrice +=goods[j].count*goods[j].price;
          }
          orderList[i].totalPrice = totalPrice.toFixed(2);
      }
      return orderList;
    },

    eventOrderCategoryChange(e){
        let type = e.currentTarget.dataset.type;
        type = parseInt(type);
        let orderList = this.getOrderListByType(type);
        this.setData({
            selectedOrderType:type,
            showOrderList:orderList
        });
    },

    getOrderListByType(type){
        let list = this.data.allOrderList;
        if(type===globalConst.OrderStatus.all){
            return list;
        }
        let selectedList = [];
        for(let j=0;j<list.length;j++){
            if(list[j].order_status===type){
                selectedList.push(list[j]);
            }
        }
        return selectedList;
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