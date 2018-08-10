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
    "recommend_user": 0,
    "recommend_user_buy":1
};

let webPageUrl = "https://dongxiaoping.cn/honeyHouse/honeyRecord/src/index.html"

module.exports = {
    sex: sex,
    webPageUrl:webPageUrl,
    rewardType:rewardType,
    interfaceStatus: interfaceStatus
};