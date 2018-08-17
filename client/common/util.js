function test(){
  console.log("dong");
}
function getRandomNum(Min,Max) {
    let Range = Max - Min;
    let Rand = Math.random();
    return(Min + Math.round(Rand * Range));
}

module.exports = {
  test: test,
  getRandomNum:getRandomNum
}