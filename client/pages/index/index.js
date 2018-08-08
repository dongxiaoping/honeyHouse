let goodDemo = require('../../mock/goodDemo');
let Log = require('../../common/Log');
Page({
    data: {
        goodInfo:null,
        swipeImages: [], ////轮播图
        selectedChildInfo:null,
        isChildPanelShow: false,
        animationData: {}, //物品子类型选中面板显示动画
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
        let selectedChildInfo = goodInfo.goodChildList[0];
        selectedChildInfo.buy_count = 1;
        that.setData({
            goodInfo:goodInfo,
            selectedChildInfo:selectedChildInfo,
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
        let item = data.currentTarget.dataset;
        let childInfo ={
            child_good_id:item.goodCode,
            child_name:item.goodName,
            buy_count:1,
            child_image:item.childImage
        };
        Log.d(childInfo);
        that.setData({
            selectedChildInfo:childInfo
        });
    },

    /**点击选择花色按钮、显示页面 */
    viewChildSelectArea: function(data) {
        let that = this;
        Log.d(that.data.selectedChildInfo);
        let animation = wx.createAnimation({ //动画
            duration: 500, //动画持续时间
            timingFunction: 'linear', //动画的效果 动画从头到尾的速度是相同的
        });
        animation.translateY(0).step(); //在Y轴偏移tx，单位px
        that.setData({
            animationData: animation.export()
        });
        that.setData({ //把选中值，放入判断值中
            isChildPanelShow: true,
        })
    },

    hideModal: function(data) {
        let that = this;
        that.setData({
            isChildPanelShow: false,
        })
    },

    goodAdd: function(data) {
        let that = this;
        let selectedChildInfo = that.data.selectedChildInfo;
        selectedChildInfo.buy_count+=1;
        that.setData({
            selectedChildInfo: selectedChildInfo
        })
    },

    goodReduce: function(data) {
        let that = this;
        let selectedChildInfo = that.data.selectedChildInfo;
        selectedChildInfo.buy_count=(selectedChildInfo.buy_count>=2)?(selectedChildInfo.buy_count-1):1;
        that.setData({
            selectedChildInfo: selectedChildInfo
        })
    },

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