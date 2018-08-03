let dataAccess = require('./common/dataAccess');
let globalConst = require('./common/globalConst');
App({
    onLaunch: function () {
        let that = this;
        let newUserInfo = {"sex":1,
            "nick_name":1,
            "phone_number":1,
            "wechat_id":"",
            "wechat_name":1,
            "addr":1,
            "recommend_code":"",
            "recommend_user_code":"",
            "last_login_time":1,
            "register_time":1
        };

        dataAccess.getWechatLoginCode({
            callback: function(status, res1) {
                let code = res1;
                console.log(code);
                dataAccess.getUserInfoByWechatId({
                    data:{id:code},
                    callback: function(status, res2) {
                        if(res2.status ===globalConst.interfaceStatus.SUCCESS){
                            let userInfo = res2.data;
                            that.globalData.userInfo = userInfo;
                            that.userVisit();
                            console.log(that.globalData.userInfo);
                            return ;
                        }
                        newUserInfo.wechat_id = code;
                        dataAccess.add_user({
                            data:newUserInfo,
                            callback: function(status, res3) {
                                if(res3.status ===globalConst.interfaceStatus.SUCCESS){
                                    dataAccess.getUserInfoByWechatId({
                                        data:{id:code},
                                        callback: function(status, res4) {
                                            if(res4.status ===globalConst.interfaceStatus.SUCCESS){
                                                let userInfo = res4.data;
                                                that.globalData.userInfo = userInfo;
                                                that.userVisit();
                                                console.log(that.globalData.userInfo);
                                                return ;
                                            }
                                            console.log("异常：无法获取用户信息");
                                        }
                                    });
                                    return ;
                                }
                                console.log("异常：无法创建用户");
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
    },
    globalData: {
        userInfo: null
    }
});