let sex ={
    MEN:2,
    FEMALE:1,
    UNKOWN:0
};

let interfaceStatus = {
    "FAILL": 0,
    "SUCCESS":1,
    "TIME_OUT": 2
};

let rewardType = {
    "recommend_user": 1,
    "recommend_user_buy":2
};

let webPageUrl = "https://dongxiaoping.cn/honeyHouse/honeyRecord/src/index.html"

let PageSort = {
    ACTIVITY:"pages/activity",
    INDEX:"pages/index",
};
module.exports = {
    sex: sex,
    webPageUrl:webPageUrl,
    rewardType:rewardType,
    interfaceStatus: interfaceStatus,
    PageSort:PageSort
};