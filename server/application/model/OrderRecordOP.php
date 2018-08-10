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

}