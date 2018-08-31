/**
 * Created by dongxiaoping-nb on 2018/8/25.
 */
$(document).on("pagecreate","#page_account_cash",function(){
    $("#button_get_cash_id").on("tap",function(){
        var flow_num =  $("#flow_num_id").val();
        if(flow_num!==""){
            $.get(httpLocation+"/honeyHouse/server/public/index.php?s=cashextract/get_cash_by_flow_num_with_extract&flow_num="+flow_num,function(res,status){
                var res = JSON.parse(res);
                console.log(res);
                if(res.status===1){
                    var valueSet = res.data;
                    $("#cash_value_id").val(valueSet);
                }else{
                    alert("不存在需要处理的订单");
                }
            });
        }else{
            alert("流水账号不能为空");
        }
    });


    $("#button_sure_cash_id").on("tap",function(){
        var cash_value =  $("#cash_value_id").val();
        if(cash_value!==""){
            var flow_num =  $("#flow_num_id").val();
            $.get(httpLocation+"/honeyHouse/server/public/index.php?s=cashextract/deal_by_flow_num&flow_num="+flow_num,function(res,status){
                var res = JSON.parse(res);
                console.log(res);
                if(res.status===1){
                    alert("处理成功");
                }else{
                    alert("不存在需要处理的订单");
                }
            });
        }else{
            alert("无金额");
        }
    });
});