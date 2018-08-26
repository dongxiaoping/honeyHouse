/**
 * Created by dongxiaoping-nb on 2018/8/25.
 */
$(document).on("pagecreate","#page_order_list",function(){
    console.log("订单列表");
    showOrderList();
});


function showOrderList(){
    $.get(httpLocation+"/honeyHouse/server/public/index.php?s=order/get_orders_list_for_deliver",function(res,status){
        var res = JSON.parse(res);
        var list = res.data;
        console.log(list);
        listTransaction(list);
        eventListOrder(list);
    });
}

function listTransaction(list) {
        var len = list.length;
        $("#order_list_id ul").listview({inset: true});  //初始化小部件
        for (var i = 0; i < len; i++) {
            var id = list[i].id;
            var stringSet = '<li><a id="list_order_item_'+i+'" idValue="'+list[i].id+'" href="#">时间 ：'+list[i].id+'<br><br>订单编号：'+list[i].create_time+'</a></li>';
            console.log(stringSet);
            $("#order_list_id ul").append(stringSet);

        }
        $("#order_list_id ul").listview('refresh');   //刷新小部件
}

function eventListOrder(list){
    var len = list.length;
    for (var i = 0; i < len; i++) {
        var item = list[i];
        $("#list_order_item_"+i).on("tap",function(e){
            var deliverOrderId  = $(this).attr("idValue");
            kset("deliverOrderId",deliverOrderId);
            $.mobile.changePage("#page_deliver",
                { transition: "slideup" });
        });
    }

}
