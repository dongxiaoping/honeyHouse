let list=[
];
for(let i=1;i<=18;i++){
  let item = {
    id: "123",//用户id
    nickname: "飞",//昵称
    note: "飞向远方",//留言
    defaultImag: "../../images/test/gril_" + (i % 6) +".png",//默认图 ../../images/test/gril_"+(i%2)+".png
    likeNum: i,//点赞量
    callStatus: 0,//可约状态
    location: { latitude: 1, dimension: 2 }, //位置信息
    sex: 1 //性别
  };
  list.push(item);
}

let collectList = [];
for (let i = 1; i <= 2; i++) {
  let item = {
    id: "123",//用户id
    nickname: "飞",//昵称
    note: "飞向远方",//留言
    defaultImag: "../../images/test/gril_" + (i % 2) + ".png",//默认图 ../../images/test/gril_"+(i%2)+".png
    likeNum: i,//点赞量
    callStatus: 0,//可约状态
    location: { latitude: 1, dimension: 2 }, //位置信息
    sex: 1 //性别
  };
  collectList.push(item);
}

module.exports = {
  list:list,
  collectList: collectList
}