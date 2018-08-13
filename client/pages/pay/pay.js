let Log = require('../../common/Log');
let app = getApp();
let productData = require('../../mock/productData');
let curAddressData = require('../../mock/curAddressData');
Page({
    data: {
        goodsList: [],
        allGoodsPrice: 0,
        addrs: [],
        yunPrice:0,
        isUserAccountPay:false,
        curAddressData: ''
    },

    onLoad: function (e) {
        let that = this;
        let goodsList = app.globalData.orderInfo;
        Log.d(goodsList);
        that.setData({
            goodsList: goodsList,
            curAddressData:curAddressData
        });
        this.totalPrice();
    },

    // 计算订单总价
    totalPrice: function () {
        let that = this;
        let goodsList = this.data.goodsList;
        let allGoodsPrice = 0;
        for (let i = 0; i < goodsList.length; i++) {
            let carShopBean = goodsList[i];
            allGoodsPrice += carShopBean.good_price * carShopBean.buy_count;
        }
        that.setData({
            allGoodsPrice: allGoodsPrice.toFixed(2)
        })
    },
    
    // 提交订单
    createOrder: function (e) {

    },

    addAddress: function () {
/*        wx.navigateTo({
            url: "/pages/address/index"
        })*/
    },
    selectAddress: function () {
    }
})