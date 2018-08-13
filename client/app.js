let dataAccess = require('./common/dataAccess');
let globalConst = require('./common/globalConst');
let Log = require('./common/Log');
App({
    globalData: {
        userInfo: {
            sex:globalConst.sex.UNKOWN,
            nick_name:"",
            phone_number:"",
            wechat_id:"",
            wechat_name:"",
            addr:"",
            recommend_code:"",
            recommend_user_code:"",
            last_login_time:"",
            register_time:""
        },
        orderInfo:null//订单信息
    },
    onLaunch: function () {

    },
    initUser:function(){
        let that = this;
        if(that.globalData.userInfo.wechat_id!==""){
            Log.i("user has init already");
            Log.d(that.globalData.userInfo);
            return ;
        }
        Log.d("begin init user");
        dataAccess.getWechatLoginCode({
            callback: function(status, res1) {
                let code = res1;
                Log.i("wechat_id:"+code);
                dataAccess.getUserInfoByWechatId({
                    data:{id:code},
                    callback: function(status, res2) {
                        Log.d(res2);
                        if(res2.status ===globalConst.interfaceStatus.SUCCESS){//用户已存在
                            that.globalData.userInfo = res2.data;
                            that.userVisit();
                            Log.d("老用户，用户已经存在");
                            Log.i(that.globalData.userInfo);
                            return ;
                        }
                        that.globalData.userInfo.wechat_id = code;
                        dataAccess.add_user({
                            data:that.globalData.userInfo,
                            callback: function(status, res3) {
                                Log.d(res3);
                                if(res3.status ===globalConst.interfaceStatus.SUCCESS){
                                    dataAccess.getUserInfoByWechatId({
                                        data:{id:that.globalData.userInfo.wechat_id},
                                        callback: function(status, res4) {
                                            if(res4.status ===globalConst.interfaceStatus.SUCCESS){
                                                that.globalData.userInfo = res4.data;
                                                that.userVisit();
                                                Log.d("新用户");
                                                Log.i(that.globalData.userInfo);
                                                return ;
                                            }
                                            Log.e("异常：无法获取用户信息");
                                        }
                                    });
                                    return ;
                                }
                                Log.e("异常：无法创建用户");
                            }
                        });
                    }
                });
            }
        });
    },
    userVisit:function(){
        let userId = this.globalData.userInfo.id;
        dataAccess.userVisit({
            data:{id:userId},
            callback: function(status, res3) {

            }
        });
    }
});