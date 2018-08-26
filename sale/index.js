//var httpLocation = "https://dongxiaoping.cn";
$(document).on("pagecreate","#page_index",function(){
    console.log("首页");

    $("#order_box_id").on("tap",function(){
        $.mobile.changePage("#page_order_list",
            { transition: "slideup" });
    });

    setOrderDeliverCount();
    setInterval(setOrderDeliverCount,1000*60);
});

function setOrderDeliverCount(){
    $.get(httpLocation+"/honeyHouse/server/public/index.php?s=order/get_orders_count_for_deliver",function(res,status){
        var res = JSON.parse(res);
        var count = res.data.count;
        console.log(count);
        document.getElementById("order_box_id").innerHTML =  "订单("+count+")";
    });
}
