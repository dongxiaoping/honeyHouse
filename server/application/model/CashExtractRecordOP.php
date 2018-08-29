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
}