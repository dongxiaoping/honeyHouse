let Log = require('../../common/Log');
let app = getApp();
let dataAccess = require('../../common/dataAccess');
let globalConst = require('../../common/globalConst');
let productData = require('../../mock/productData');
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
        let allGoodsPrice = this.getTotalPrice();
        that.setData({
            allGoodsPrice: allGoodsPrice
        });
        let userInfo = app.globalData.userInfo;
        let accountCash = userInfo.amount;
        that.setData({
            isUserAccountPay: accountCash>allGoodsPrice
        });
    },

    isAddressExist(){
        if(this.data.curAddressData===''){
            return false;
        }
        return true;
    },

    // 计算订单总价
    getTotalPrice: function() {
        let that = this;
        let goodsList = this.data.goodsList;
        let allGoodsPrice = 0;
        for (let i = 0; i < goodsList.length; i++) {
            let carShopBean = goodsList[i];
            allGoodsPrice += carShopBean.good_price * carShopBean.buy_count;
        }
        allGoodsPrice = allGoodsPrice.toFixed(2);
        return allGoodsPrice;
    },

    // 提交订单
    createOrder: function(e) {
        if(!this.isAddressExist()){
            wx.showToast({
                title: '请填写地址!',
                icon:'none'
            });
            return;
        }
        wx.showLoading({
            title: '加载中',
        });
        let that = this;
        let orderForSubmit = this.getOrderForSubmit();
        dataAccess.submitOrder({
            data: orderForSubmit,
            callback: function(status, res) {
                wx.hideLoading();
                Log.d(res);
                if (res.status === globalConst.interfaceStatus.SUCCESS) {
                    if(res.message===globalConst.PayType.wechat){
                        let orderReturnInfo = res.data;
                        that.toStartPayPage(orderReturnInfo);
                    }else{
                        wx.navigateTo({
                            url: "../paySuccessTrans/paySuccessTrans"
                        });
                    }
                    return ;
                }
                Log.e("订单提交失败");
            }
        });
        Log.d(orderForSubmit);
    },

    toStartPayPage:function(orderReturnInfo){
        Log.d(orderReturnInfo);
        let appid = orderReturnInfo.appid;
        let noncestr = orderReturnInfo.noncestr;
        let packaged = orderReturnInfo.package;
        let partnerid = orderReturnInfo.partnerid;
        let prepayid = orderReturnInfo.prepayid;
        let sign = orderReturnInfo.sign;
        let timestamp = ""+orderReturnInfo.timestamp;

        let paySignArray = {
            appId:appid,
            timeStamp:timestamp,
            nonceStr:noncestr,
            package:"prepay_id="+prepayid,
            signType:'MD5'
        };
        dataAccess.getPaySign({
            data: paySignArray,
            callback: function(status, res) {
                Log.d(res);
                if (res.status === globalConst.interfaceStatus.SUCCESS) {
                    wx.requestPayment({
                        'timeStamp': timestamp,
                        'nonceStr': noncestr,
                        'package': "prepay_id="+prepayid,
                        'signType': 'MD5',
                        'paySign': res.data,
                        'success':function(res){
                            Log.d(res);
                            let errMsg = res.errMsg;
                            if(errMsg==="requestPayment:ok"){//成功
                                wx.navigateTo({
                                    url: "../paySuccessTrans/paySuccessTrans"
                                });
                            }else if(errMsg==="requestPayment:fail cancel"){//取消

                            }else{ //失败

                            }
                        },
                        'fail':function(res){ //失败
                            Log.e(res);
                        }
                    })
                }
            }
        });


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
                img:item.child_image,
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
                that.setData({
                    curAddressData:curAddressData
                });
                curAddressData.user_id = app.globalData.userInfo.id;
                Log.d(curAddressData);
                dataAccess.addAddress({
                    data: curAddressData,
                    callback: function(status, res) {
                        Log.d(res);
                        if (res.status === globalConst.interfaceStatus.SUCCESS) {
                        }
                    }
                });
            }
        })
    }
})