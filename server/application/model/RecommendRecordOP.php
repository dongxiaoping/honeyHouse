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

class RecommendRecordOP extends BaseOP{
    public function __construct() {
        $this->recommend_record = new table\RecommendRecord();
        parent::__construct($this->recommend_record);
    }
}