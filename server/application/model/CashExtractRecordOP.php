<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/29
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;
use think\Db;

class CashExtractRecordOP extends BaseOP{
    public function __construct() {
        $this->cash_extract_record = new table\CashExtractRecord();
        parent::__construct($this->cash_extract_record);
    }


    public function get_cash_extract_wait_deal($user_id){
        $list =  Db::query("select *from cash_extract_record as t2 where t2.user_id=".$user_id." and status=1");
        return $list;
    }

    public function get_cash_extract_wait_deal_by_num($flow_num){
        $list =  Db::query("select *from cash_extract_record as t2 where t2.flow_num='".$flow_num."' and status=1");
        return $list;
    }

    public function deal_by_flow_num($flow_num,$cash,$mod_time){
        $list =  Db::query("update cash_extract_record set status=2,amount=".$cash.",last_mod='".$mod_time."' where flow_num=".$flow_num);
        return $list;
    }

}