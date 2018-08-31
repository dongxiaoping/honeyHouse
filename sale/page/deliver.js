/**
 * Created by dongxiaoping-nb on 2018/8/24.
 */
$(document).on("pagecreate","#page_deliver",function(e, data){
    var orderInfo;
    console.log("发货页");
    var deliverOrderId =  kget("deliverOrderId");
    console.log(deliverOrderId);
    initShow();

    $("#page_deliver_fh_id").on("tap",function(){
        UpdateStatus("fh");
    });

    $("#page_deliver_refresh_id").on("tap",function(){
        initShow();
    });

    $("#page_deliver_cancel_id").on("tap",function(){
        UpdateStatus("cancel_order");
    });

    function UpdateStatus(flag) {
        var popupDialogId = 'popupDialog';
        $('<div data-role="popup" id="' + popupDialogId + '" data-confirmed="no" data-transition="pop" data-overlay-theme="b" data-theme="b" data-dismissible="false" style="min-width:216px;max-width:500px;"> \
          \
          <div role="main" class="ui-content">\
            <h3 class="ui-title" style="color:#fff; text-align:center;margin-bottom:15px">确认执行吗？</h3>\
            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionConfirm" data-rel="back" style="background: #1784fd;width: 33%;border-radius: 5px;height: 30px;line-height: 30px;padding: 0;font-size: .9em;margin: 0 0 0 12%;font-weight: 100;">确定</a>\
            <a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b optionCancel" data-rel="back" data-transition="flow" style="background: #DBDBDB;width: 33%;border-radius: 5px;height: 30px;line-height: 30px;padding: 0;font-size: .9em;margin: 0 0 0 5%;font-weight: 100;color: #333;text-shadow: none;">取消</a>\
          </div>\
        </div>')
            .appendTo($.mobile.pageContainer);
        var popupDialogObj = $('#' + popupDialogId);
        popupDialogObj.trigger('create');
        popupDialogObj.popup({
            afterclose: function (event, ui) {
                popupDialogObj.find(".optionConfirm").first().off('click');
                var isConfirmed = popupDialogObj.attr('data-confirmed') === 'yes' ? true : false;
                $(event.target).remove();
                if (isConfirmed) {
                    //这里执行确认需要执行的代码
                    $.mobile.loading('show', {
                        text: '执行中...', //加载器中显示的文字
                        textVisible: true, //是否显示文字
                        theme: 'a',        //加载器主题样式a-e
                        textonly: true,   //是否只显示文字

                    });
                    if("cancel_order"==flag){
                        $.get(httpLocation+"/honeyHouse/server/public/index.php?s=order/change_order_status&order_id="+deliverOrderId+"&status=5",function(res,status){
                            $.mobile.loading('hide');
                        });
                    }else{
                        var orderId = orderInfo.id;
                        $.get(httpLocation+"/honeyHouse/server/public/index.php?s=order/change_order_status&order_id="+deliverOrderId+"&status=3",function(res,status){
                            $.mobile.loading('hide');
                        });
                    }
                }
            }
        });
        popupDialogObj.popup('open');
        popupDialogObj.find(".optionConfirm").first().on('click', function () {
            popupDialogObj.attr('data-confirmed', 'yes');
        });
    }

    function initShow(){
        $.mobile.loading('show', {
            text: '刷新中...', //加载器中显示的文字
            textVisible: true, //是否显示文字
            theme: 'a',        //加载器主题样式a-e
            textonly: true,   //是否只显示文字

        });
        $.get(httpLocation+"/honeyHouse/server/public/index.php?s=order/get_order_info&id="+deliverOrderId,function(res,status){
            var res = JSON.parse(res);
            orderInfo = res.data;
            console.log(orderInfo);
            setOrderInfo(orderInfo);
            $.mobile.loading('hide');
        });
    }

    function setOrderInfo(info){
        var goodItem = info.goods[0];
        var address = info.addr;
        var order_status = info.order_status;
        if(order_status===2){
            document.getElementById("page_deliver_order_status_id").innerText="订单状态：待发货";
        }else if(order_status===3){
            document.getElementById("page_deliver_order_status_id").innerText="订单状态：已发货";
        }else if(order_status===5){
            document.getElementById("page_deliver_order_status_id").innerText="订单状态：订单已取消";
        }else{
            document.getElementById("page_deliver_order_status_id").innerText="订单状态："+order_status;
        }
        console.log(address);
        document.getElementById("page_deliver_bh_id").innerText="订单编号："+info.id;
        document.getElementById("page_deliver_time_id").innerText="下单时间："+info.create_time;

        document.getElementById("page_deliver_good_name_id").innerText="商品名称："+goodItem.name;
        document.getElementById("page_deliver_good_count_id").innerText="数量："+goodItem.count;
        document.getElementById("page_deliver_count_id").innerText="商品数量："+goodItem.count;
        document.getElementById("page_deliver_count_id").innerText="留言："+"暂无留言";

        document.getElementById("page_deliver_name_id").innerText="收货人名称："+address.name;
        document.getElementById("page_deliver_phone_id").innerText="收货人电话："+address.tel;
        var detail_addr = address.province+address.city+address.area+address.address;
        document.getElementById("page_deliver_address_id").innerText="收货人地址："+detail_addr;
        console.log($("#page_deliver_time_id"));
    }
});
