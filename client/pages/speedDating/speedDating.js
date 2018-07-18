
const week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
const price = ["100", "150", "200", "250", "300", "350", "400"]
const scene = ["聊天逛街", "吃饭看电影", "唱歌跳舞"]


Page({
  data: {
    week: week,
    price:price,
    scene: scene,
  },
  bindChange: function (e) {
    console.log(e);
  },
  tapRelease:function(){
    console.log("确认发布");
  }
})