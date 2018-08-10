<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/10
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;
use think\Db;

class OrderGoodRecordOP extends BaseOP{
    public function __construct() {
        $this->order_good_record = new table\OrderGoodRecord();
        parent::__construct($this->order_good_record);
    }

    public function get_goods_by_order_id($order_id){
        $good_list =  Db::query("select *from order_good_record as t2 where t2.order_id=".$order_id);
        return $good_list;
    }
}