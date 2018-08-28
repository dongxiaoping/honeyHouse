let dataAccess = require('./common/dataAccess');
let globalConst = require('./common/globalConst');
let Log = require('./common/Log');
App({
  globalData: {
    appConfigInfo:null,
    userInfo: {
      sex: globalConst.sex.UNKOWN,
      nick_name: "",
      phone_number: "",
      wechat_id: "",
      wechat_name: "",
      addr: "",
      recommend_code: "",
      recommend_user_code: "",
      last_login_time: "",
      register_time: ""
    },
    orderInfo: null //订单信息
  },
  onLaunch: function() {
    let that = this;
      dataAccess.getAppConfigInfo({
          callback: function(status, res) {
              if (res.status === globalConst.interfaceStatus.SUCCESS) {
                  let appConfigInfo = res.data;
                  Log.d(appConfigInfo);
                  that.globalData.appConfigInfo = appConfigInfo;
              }
          }
      });
  },

  clearUser:function(){
      this.globalData.userInfo.sex = globalConst.sex.UNKOWN;
      this.globalData.userInfo.nick_name = "";
      this.globalData.userInfo.phone_number = "";
      this.globalData.userInfo.wechat_id = "";
      this.globalData.userInfo.wechat_name = "";
      this.globalData.userInfo.addr = "";
      this.globalData.userInfo.recommend_code = "";
      this.globalData.userInfo.recommend_user_code = "";
      this.globalData.userInfo.last_login_time = "";
      this.globalData.userInfo.register_time = "";
  },

  initUser: function(location) {
    let that = this;
    if (that.globalData.userInfo.wechat_id !== "") {
      Log.i("user has init already");
      Log.d(that.globalData.userInfo);
      return;
    }
    if (location === globalConst.PageSort.INDEX) {
      Log.d("应用从首页进入");
    } else {
      Log.d("应用从推荐文章进入");
    }
    Log.d("begin init user");
    dataAccess.login({
      callback: function(status, res1) {
        let code = res1;
        Log.i("temp_wechat_id:" + code);
        dataAccess.onLogin({
          data: {id: code},
          callback: function(status, res6) {
            Log.d(res6);
            if (res6.status === globalConst.interfaceStatus.SUCCESS) { //成功获取用户唯一标识
              let openid = res6.data.openid;
              Log.d("用户唯一标识:" + openid);
              dataAccess.getUserInfoByWechatId({
                data: {
                  id: openid
                },
                callback: function(status, res2) {
                  Log.d(res2);
                  if (res2.status === globalConst.interfaceStatus.SUCCESS) { //用户已存在
                    let recommend_code = res2.data.recommend_code;
                    let recommend_user_code = that.globalData.userInfo.recommend_user_code;
                    Log.d("用户自己的推荐码:"+recommend_code);
                    Log.d("推荐人推荐码:"+recommend_user_code);
                    if (recommend_code == recommend_user_code) {
                        Log.d("进入自己转发的文章！");
                        wx.showToast({
                            title: '进入自己转发的文章！',
                            duration:3000,
                            icon: 'none'
                        });
                    }else{
                        wx.showToast({
                            title: '欢迎回到蜜之屋！',
                            duration:3000,
                            icon: 'none'
                        });
                    }
                    that.globalData.userInfo = res2.data;
                    that.userVisit();
                    Log.d("老用户，用户已经存在");
                    Log.i(that.globalData.userInfo);
                    return;
                  }
                  that.globalData.userInfo.wechat_id = openid;
                  dataAccess.add_user({
                    data: that.globalData.userInfo,
                    callback: function(status, res3) {
                      Log.d(res3);
                      if (res3.status === globalConst.interfaceStatus.SUCCESS) {
                        dataAccess.getUserInfoByWechatId({
                          data: {
                            id: that.globalData.userInfo.wechat_id
                          },
                          callback: function(status, res4) {
                            if (res4.status === globalConst.interfaceStatus.SUCCESS) {
                              if (location === globalConst.PageSort.ACTIVITY) {
                                Log.d("新用户，从别人转发的文章进入");
                                  wx.showToast({
                                      title: '欢迎新用户加入蜜之屋！',
                                      duration:3000,
                                      icon: 'none'
                                  });
                              } else {
                                Log.d("新用户，从首页入口进入");
                              }
                              that.globalData.userInfo = res4.data;
                              that.userVisit();
                              Log.i(that.globalData.userInfo);
                              return;
                            }
                            Log.e("异常：无法获取用户信息");
                          }
                        });
                        return;
                      }
                      Log.e("异常：无法创建用户");
                    }
                  });
                }
              });
            }
          }
        });
      }
    });
  },
  userVisit: function() {
    let userId = this.globalData.userInfo.id;
    dataAccess.userVisit({
      data: {
        id: userId
      },
      callback: function(status, res3) {

      }
    });
  }
});