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

namespace app\model;
use \app\model\table;
use think\Db;

class OrderRecordOP extends BaseOP{
    public function __construct() {
        $this->order_record = new table\OrderRecord();
        parent::__construct($this->order_record);
    }
    public function get_orders_of_user($user_id,$order_status){
        if($order_status===null||$order_status="null"){
            $list =  Db::query("select *from order_record as t2 where t2.user_id=".$user_id." and order_status!='".ORDER_STATUS["cancel"]."' order by create_time desc");
        }else{
            $list =  Db::query("select *from order_record as t2 where t2.user_id=".$user_id." and order_status=".$order_status." order by create_time desc");
        }
        return $list;
    }

    public function setOrderPayById($id){
        $last_mod =  date("Y-m-d H:i:s");
        $list =  Db::query("update order_record set order_status='".ORDER_STATUS["has_pay"]."',last_mod='".$last_mod."' where id=".$id);
        return $list;
    }

    public function get_orders_count_for_deliver(){
        $info =  Db::query("select count(*) as count from order_record as t2 where t2.order_status=".ORDER_STATUS["has_pay"]);
        return $info[0];
    }

    public function get_orders_list_for_deliver(){
        $info =  Db::query("select *from order_record as t2 where t2.order_status=".ORDER_STATUS["has_pay"]);
        return $info;
    }

    public function change_order_status($order_id,$status){
        $last_mod =  date("Y-m-d H:i:s");
        $list =  Db::query("update order_record set order_status='".$status."',last_mod='".$last_mod."' where id=".$order_id);
        return $list;
    }
}