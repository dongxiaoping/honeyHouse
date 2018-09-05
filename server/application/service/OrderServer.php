<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/9
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\service;
use \app\model;
use \app\service;
class OrderServer{
    public function __construct() {
        $this->PayServer = new service\PayServer();
        $this->OrderRecordOP = new model\OrderRecordOP();
        $this->OrderGoodRecordOP = new model\OrderGoodRecordOP();
        $this->AddressOP = new model\AddressOP();
        $this->UserOP = new model\UserOP();
        $this->GoodServer = new service\GoodServer();
    }

    public function submit_order($info){
        $user_id = $info["user_id"];
        $good_list = $info["goods"];
        $set_time = date("Y-m-d H:i:s");
        $order_id=substr(date("ymdHis"),2,8).mt_rand(100000,999999);
        $pay_type = PAY_TYPE["wechat"];
        $total_fee = $this->get_order_price($good_list);//订单金额 分


        $user_info = $this->UserOP->get($user_id);
        if(!$user_info){
            return getInterFaceArray(0,"user_not_exist","");
        }
        $amount = $user_info["amount"];
        if($amount*100>$total_fee){
            $pay_type = PAY_TYPE["account"];
        }
        $order = array(
            "id"=>$order_id,
            "user_id"=>$user_id,
            "pay_type"=>$pay_type,
            "order_status"=>ORDER_STATUS["wait_pay"],
            "create_time"=> $set_time,
            "last_mod"=>$set_time
        );
        $new_id = $this->OrderRecordOP->insert($order);
        if($new_id){
            for ($i= 0;$i< count($good_list); $i++){
                $good_list[$i]["order_id"] = $new_id;
                $good_list[$i]["create_time"] = $set_time;
                $good_list[$i]["last_mod"] = $set_time;
            }
            $this->OrderGoodRecordOP->insertAll($good_list);
            $out_trade_no = $order_id;
            $openid = $info["wechat_id"];
            $this->update_sell_count($good_list);
            if($pay_type===PAY_TYPE["wechat"]){
                $result =$this->PayServer->payOrderReqToWechat($out_trade_no,$total_fee,$openid);
                if($result){
                    return getInterFaceArray(1,PAY_TYPE["wechat"],$result);
                }
            }else{
                $new_amount = $amount - $total_fee/100;
                $this->UserOP->change_cash_by_user_id($user_id,$new_amount);
                $this->change_order_status($order_id,ORDER_STATUS["has_pay"]);
                return getInterFaceArray(1,PAY_TYPE["account"],"");
            }
            return getInterFaceArray(0,"fail","");
        }
    }

    public function get_order_price($order_good_list){
        $price = 0;
        foreach( $order_good_list as $key => $value ){
            $price = $price+$value["price"]*$value["count"];
        }
        return 100*$price;
    }

    public function update_sell_count($order_good_list){
        foreach( $order_good_list as $key => $value ){
            $add_count = $value["count"];
            $good_id = $value["id"];
            $this->GoodServer->add_sell_count($good_id,$add_count);
        }
    }


    public function get_order_info($id){
        $info = $this->OrderRecordOP->get($id);
        if($info){
            $order_id = $info["id"];
            $list = $this->OrderGoodRecordOP->get_goods_by_order_id($order_id);
            $info["goods"] = $list;
            $user_id = $info["user_id"];
            $addrList = $this->AddressOP->get_addr_by_user_id($user_id);
            $info["addr"] = $addrList[0];
            return  getInterFaceArray(1,"success",$info);
        }
        return getInterFaceArray(0,"fail","");
    }

    public function get_orders_of_user($user_id,$order_status){
        $list = $this->OrderRecordOP->get_orders_of_user($user_id,$order_status);
        for ($i= 0;$i< count($list); $i++){
            $order_id = $list[$i]["id"];
            $goodList = $this->OrderGoodRecordOP->get_goods_by_order_id($order_id);
            $list[$i]["goods"] = $goodList;
        }
       return  getInterFaceArray(1,"success",$list);
    }

    public function change_order_status($order_id,$status){
        $this->OrderRecordOP->change_order_status($order_id,$status);
        return getInterFaceArray(1,"success","");
    }

    public function get_orders_count_for_deliver(){
        $count = $this->OrderRecordOP->get_orders_count_for_deliver();
        return  getInterFaceArray(1,"success",$count);
    }

    public function get_orders_list_for_deliver(){
        $list = $this->OrderRecordOP->get_orders_list_for_deliver();
        return  getInterFaceArray(1,"success",$list);
    }
}