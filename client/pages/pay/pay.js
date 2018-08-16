let Log = require('../../common/Log');
let app = getApp();
let dataAccess = require('../../common/dataAccess');
let globalConst = require('../../common/globalConst');
let productData = require('../../mock/productData');
let curAddressData = require('../../mock/curAddressData');
Page({
    data: {
        goodsList: [],
        allGoodsPrice: 0,
        addrs: [],
        yunPrice: 0,
        isUserAccountPay: false,
        curAddressData: ''
    },

    onLoad: function(e) {
        let that = this;
        let goodsList = app.globalData.orderInfo;
        Log.d(goodsList);
        that.setData({
            goodsList: goodsList
        });
        this.totalPrice();
    },

    // 计算订单总价
    totalPrice: function() {
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
    createOrder: function(e) {
        let that = this;
        let orderForSubmit = this.getOrderForSubmit();
        dataAccess.submitOrder({
            data: orderForSubmit,
            callback: function(status, res) {
                Log.d(res);
                if (res.status === globalConst.interfaceStatus.SUCCESS) {
                    let orderReturnInfo = res.data;
                    that.toStartPayPage(orderReturnInfo);
                }
            }
        });
        Log.d(orderForSubmit);
    },

    toStartPayPage:function(orderReturnInfo){
        console.log(orderReturnInfo);
    },

    getOrderForSubmit() {
        let orderForSubmit = {
            user_id: app.globalData.userInfo.id,
            wechat_id:app.globalData.userInfo.wechat_id,
            goods: null
        };
        let items = [];
        let goodsList = this.data.goodsList;
        goodsList.forEach(item => {
            let newItem = {
                good_id: item.id,
                name: item.name,
                good_unit: item.good_unit,
                price: item.good_price,
                count: item.buy_count
            };
            items.push(newItem);
        });
        orderForSubmit.goods = items;
        return orderForSubmit;
    },

    addAddress: function() {
        let that = this;
        wx.chooseAddress({
            success: function(res) {
                let curAddressData = {
                    name: res.userName,
                    postalCode: res.postalCode,
                    nationalCode: res.nationalCode,
                    tel: res.telNumber,
                    province: res.provinceName,
                    city: res.cityName,
                    area: res.countyName,
                    address: res.detailInfo
                };
                Log.d(curAddressData);
                that.setData({
                    curAddressData:curAddressData
                });
            }
        })
    },
    selectAddress: function() {

    }
})