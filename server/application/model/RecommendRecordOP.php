<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/7/25
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;
use think\Db;

class RecommendRecordOP extends BaseOP{
    public function __construct() {
        $this->recommend_record = new table\RecommendRecord();
        parent::__construct($this->recommend_record);
    }

    public function get_recommend_records_by_user_id($id){
        $list =  Db::query("select *from recommend_record as t where t.own_cash_user_id=".$id);
        return $list;
    }

}