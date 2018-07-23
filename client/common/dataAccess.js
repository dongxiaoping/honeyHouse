/**
 * Created by dongxiaoping-nb on 2018/7/22.
 */

let  userInfo = require('../mock/userInfo');
let  recommendDataOfUser = require('../mock/recommendDataOfUser');

class DataAccess{
    //个人推荐二维码地址
    getRecommendQCode() {
        return "http://papwt4d89.bkt.clouddn.com/qcode.png";
    }

    //用户基本信息
    getUserInfo() {
        return userInfo;
    }

    //用户推荐成绩数据
    getRecommendDataOfUser(){
        return recommendDataOfUser;
    }
}
module.exports = new DataAccess();
