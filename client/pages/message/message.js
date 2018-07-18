var tabs = [
    {
        name: "已发布"
    },
    {
        name: "已参与"
    },
    {
        name: "通知"
    }
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: tabs,     //展示的数据
        slideOffset: 0,//指示器每次移动的距离
        activeIndex: 0,//当前展示的Tab项索引
        sliderWidth: 96,//指示器的宽度,计算得到
        contentHeight: 0//页面除去头部Tabbar后，内容区的总高度，计算得到
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderWidth: res.windowWidth / that.data.tabs.length,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
                    contentHeight: res.windowHeight - res.windowWidth / 750 * 68
                });
            }
        });
    },

    bindChange: function (e) {
        var current = e.detail.current;
        this.setData({
            activeIndex: current,
            sliderOffset: this.data.sliderWidth * current
        });
        console.log("bindChange:" + current);
    },

    navTabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
        console.log("navTabClick:" + e.currentTarget.id);
    }
    ///////////////////////////////////BEGIN 已发布


    ///////////////////////////////////END 已发布


    ///////////////////////////////////BEGIN 已参与


    ///////////////////////////////////END 已参与
})