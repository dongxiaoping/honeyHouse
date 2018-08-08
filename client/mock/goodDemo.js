let goodDemo={
    "good_id": "17", //ok
    "good_name": "土",//ok 名称
    "good_mark": "原汁原味 按升计价 分小瓶装大瓶装", //ok 描述
    "good_detail":[],//详情 存图片
    "good_standard":[],//规格 存图片
    "good_main_img_list": ["http://papwt4d89.bkt.clouddn.com/fm_1.png", "http://papwt4d89.bkt.clouddn.com/fm_2.png"],//ok
    "goodChildList": [
        {
            "child_name": "小",
            "child_good_id": "11d75c6a560a4345b232706f7642de22",
            "good_sell_count": 30, // 销量
            "good_price":"30",//单位价格
            "good_orin_price":"35",//折扣之前的价格
            "good_unit": "瓶", // 单位
            "child_image": "http://papwt4d89.bkt.clouddn.com/fm_2.png"
        },
        {
            "child_name": "大",
            "child_good_id": "eff884ebeb7c42008f38a58785818031",
            "good_sell_count": 40, // 销量
            "good_price":"45",//单位价格
            "good_orin_price":"50",//折扣之前的价格
            "good_unit": "瓶", //ok 单位
            "child_image": "http://papwt4d89.bkt.clouddn.com/fm_3.png"
        }
    ]
};

module.exports = goodDemo;