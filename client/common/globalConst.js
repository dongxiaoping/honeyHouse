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

let OrderStatus = {
    "all":0,
    "wait_pay": 1,
    "has_pay":2,
    "good_delivered": 3,
    "success": 4,
    "cancel": 5
};

let PayType = {
    wechat:1,//微信
    account:2,//账户
    mix:3,
    other:4,
};

let OrderDes = [
    "全部",
    "待付款",
    "待发货",
    "待收货",
    "已完成",
    "已取消"
];

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
    PageSort:PageSort,
    OrderStatus:OrderStatus,
    PayType:PayType,
    OrderDes:OrderDes
};