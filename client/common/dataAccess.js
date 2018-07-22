/**
 * Created by dongxiaoping-nb on 2018/7/22.
 */

let  userInfo = require('../mock/userInfo');
class DataAccess{
    getRecommendQCode() {
        console.log("a.png");
    }
    getUserInfo() {
        console.log(userInfo);
    }
}
module.exports = new DataAccess();
