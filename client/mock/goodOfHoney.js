let goodOfHoney={
    name:"土蜂蜜",
    images:["a.png","b.png"],
    good_desc:"描述",
    visit_count: 100,
    child:[
        {name:"1L",desc:"小瓶装",price:30,sale_count:20,stock:100,discount:0.7,unit:"瓶",images:["c.png","d.png"]},
        {name:"3L",desc:"大瓶装",price:50,sale_count:30,stock:120,discount:0.6,unit:"瓶",images:["m.png","e.png"]}
    ]
};

module.exports = {
    goodOfHoney:goodOfHoney
};