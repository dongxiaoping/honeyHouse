<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/7/27
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;

class VisitRecordOP extends BaseOP{
    public function __construct() {
        $this->visit_record = new table\VisitRecord();
        parent::__construct($this->visit_record);
    }
}