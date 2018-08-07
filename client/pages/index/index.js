let goodDemo = require('../../mock/goodDemo');
let Log = require('../../common/Log');
Page({
    data: {
        //////////////////////////////////////////////
        //不可变量
        good: { },//商品基本信息
        goodChildList: [], //商品子类信息
        swipeImages: [], ////轮播图
        /////////////////////////////////////////////

        //////////////////////////////////////////////
        //可变量
        goodNum: 1, //购买商品数量
        childImgSelect: '', //选中子类物品图片
        childNameSelect: "", //选中子类物品名称
        selectedChildGoodId: 0, //选中子类型物品ID
        /////////////////////////////////////////////

        //////////////////////////////////////////////
        //控制变量
        isChildPanelShow: false,
        animationData: {}, //物品子类型选中面板显示动画
        showModalStatus: false, //显示子类型选中面板的遮罩
        /////////////////////////////////////////////
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        if (wx.showLoading) {
            wx.showLoading({
                title: '加载中',
            })
        }
        let goodInfo = goodDemo;//接口原始商品数据
        let swipeImages = this.getSwipeImages(goodInfo.good,goodInfo.goodChildList);
        that.setData({
            childImgSelect: goodInfo.good.good_display_img,
            good: goodInfo.good,
            goodChildList: goodInfo.goodChildList,
            swipeImages: swipeImages
        });
        if (wx.hideLoading()) {
            wx.hideLoading()
        }
    },

    getSwipeImages:function(goodBaseMsg,goodChildList){
        let swipeImages = [{child_image: goodBaseMsg.good_display_img}];
        for (let i = 0; i < goodChildList.length; i++) {
            let jo = {child_image: goodChildList[i].child_image};
            swipeImages.push(jo);
        }
        return swipeImages;
    },

    /**选择类型 */
    chooseChildGood: function(data) {
        let that = this;
        Log.d( data);
        let child_good_id = data.currentTarget.dataset.select;
        let child_name = data.currentTarget.dataset.flowerName;
        that.setData({ //把选中值，放入判断值中
            childNameSelect: child_name,
            selectedChildGoodId: child_good_id
        });
        let str = child_good_id + ',' + child_name;
        that.setData({
            childImgSelect: data.currentTarget.dataset.img
        })
    },

    /**点击选择花色按钮、显示页面 */
    viewChildSelectArea: function(data) {
        let that = this;
        let animation = wx.createAnimation({ //动画
            duration: 500, //动画持续时间
            timingFunction: 'linear', //动画的效果 动画从头到尾的速度是相同的
        });
        animation.translateY(0).step(); //在Y轴偏移tx，单位px
        that.setData({
            showModalStatus: true, //显示遮罩
            animationData: animation.export()
        });
        that.setData({ //把选中值，放入判断值中
            isChildPanelShow: true,
        })
    },

    /**隐藏物品子类型选择面板 */
    hideModal: function(data) {
        let that = this;
        that.setData({
            showModalStatus: false, //显示遮罩
            isChildPanelShow: false,
        })
    },

    goodAdd: function(data) {
        let that = this;
        let goodCount = that.data.goodNum + 1;
        that.setData({ //商品数量+1
            goodNum: goodCount
        })
    },

    goodReduce: function(data) {
        let that = this;
        let goodCount = that.data.goodNum - 1;
        that.setData({ //商品数量+1
            goodNum: goodCount
        })
    },

    /**
     * 生成订单
     */
    saveOrder: function(data) {
/*        let that = this;
        let thatData = that.data;
        let good_id = thatData.good.good_id; //good_id
        let good_name = thatData.good.good_name; //good_name
        let gn = thatData.goodNum; //数量
        let good_price = thatData.goodPrice; //价格
        let goodDisplayImg = thatData.good.good_display_img;//主图
        if (ja.length > 0) {
            wx.showToast({
                title: '成功！',
                duration: 2000,
            })
        } else {
            wx.showToast({
                title: '您还没有选择花色哦~',
                duration: 2000,

            })
        }*/
    },

    /**
     * 预览图片
     * 无法显示本地图片！！！！！！！
     */
    seePreviewImg: function(e) {
        let showImg = e.currentTarget.dataset.img;
        Log.d(showImg);
        let array = [];
        let that = this;
        let imgArray = that.data.swipeImages;
        for (let i = 0; i < imgArray.length; i++) {
            array.push(imgArray[i].child_image)
        }
        Log.d(showImg);
        Log.d(array);
        wx.previewImage({
            current: showImg, // 当前显示图片的http链接
            urls: array // 需要预览的图片http链接列表
        })
    }
});