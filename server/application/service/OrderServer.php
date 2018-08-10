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

class OrderServer{
    public function __construct() {
        $this->OrderRecordOP = new model\OrderRecordOP();
        $this->OrderGoodRecordOP = new model\OrderGoodRecordOP();
    }

    public function submit_order($info){
        $user_id = $info["user_id"];
        $good_list = $info["goods"];
        $set_time = date("Y-m-d H:i:s");
        $order = array(
            "user_id"=>$user_id,
            "pay_type"=>PAY_TYPE["other"],
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
            return  getInterFaceArray(1,"success",$new_id);
        }
        return  getInterFaceArray(0,"fail","");
    }
}