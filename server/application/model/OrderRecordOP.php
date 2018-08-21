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
            $list =  Db::query("select *from order_record as t2 where t2.user_id=".$user_id);
        }else{
            $list =  Db::query("select *from order_record as t2 where t2.user_id=".$user_id." and order_status=".$order_status);
        }
        return $list;
    }
}