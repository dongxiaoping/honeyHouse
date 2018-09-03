/**
 * Created by dongxiaoping-nb on 2018/7/22.
 */

let userInfo = require('../mock/userInfo');
let recommendDataOfUser = require('../mock/recommendDataOfUser');
let globalConst = require('./globalConst');
let config = require('../common/config');
let serverHttp = config.serverHttp;
class DataAccess {
    cash_voucher_to_user(args){
        wx.request({
            url: serverHttp + '?s=cashvoucher/cash_voucher_to_user',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    get_cash_extract_wait_deal(args){
        wx.request({
            url: serverHttp + '?s=cashextract/get_cash_extract_wait_deal',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    cashExtractReq(args){
        wx.request({
            url: serverHttp + '?s=cashextract/cash_extract_req',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    getAppConfigInfo(args){
        wx.request({
            url: serverHttp + '?s=app/get_app_config_info',
            data: "",
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    getRecommendConfig(args){
        wx.request({
            url: serverHttp + '?s=recommend/get_recommend_config',
            data: "",
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    getOrdersOfUser(args){
        wx.request({
            url: serverHttp + '?s=order/get_orders_of_user',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    submitOrder(args){
        wx.request({
            url: serverHttp + '?s=order/submit_order',
            data: args.data,
            method: 'POST',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    addAddress(args){
        wx.request({
            url: serverHttp + '?s=address/add_address',
            data: args.data,
            method: 'POST',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    getPaySign(args){
        wx.request({
            url: serverHttp + '?s=pay/get_pay_sign',
            data: args.data,
            method: 'POST',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    onLogin(args){
        wx.request({
            url: serverHttp + '?s=user/on_login',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    getRecommendRecordsByUserId(args){
        wx.request({
            url: serverHttp + '?s=recommend/get_recommend_records_by_user_id',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    getGoodByGoodCategoryId(args){
        wx.request({
            url: serverHttp + '?s=good/get_goods_by_category',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }

    //个人推荐二维码地址
    getRecommendQCode(args) {
        wx.request({
            url: serverHttp + '?s=pic/getRecommendHoneyLocationQRcode',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            },
            complete: function() {
                // args.callback(globalConst.interfaceStatus.TIME_OUT, "");
            }
        })
    }

    //用户基本信息
    getUserInfoByWechatId(args) {
        wx.request({
            url: serverHttp + '?s=user/get_user_info_by_wechat_id',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            },
            complete: function() {
                //args.callback(globalConst.interfaceStatus.TIME_OUT, "");
            }
        })
    }

    //获取临时登录凭证（code）
    login(args){
        wx.login({
            success: function(res) {
                if (res.code) {
                    args.callback(globalConst.interfaceStatus.SUCCESS, res.code);
                } else {
                    args.callback(globalConst.interfaceStatus.FAILL, "");
                }
            }
        });
    }
    //创建新用户
    add_user(args){
        wx.request({
            url: serverHttp + '?s=user/add_user',
            data: args.data,
            method: 'POST',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            },
            complete: function() {
                //  args.callback(globalConst.interfaceStatus.TIME_OUT, "");
            }
        })
    }

    //上报用户访问
    userVisit(args){
        wx.request({
            url: serverHttp + '?s=user/user_visit',
            data: args.data,
            method: 'GET',
            success: function(res) {
                args.callback(globalConst.interfaceStatus.SUCCESS, res.data);
            },
            fail: function() {
                args.callback(globalConst.interfaceStatus.FAILL, "");
            }
        })
    }
}
module.exports = new DataAccess();