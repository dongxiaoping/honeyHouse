<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/7/28
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;

class GoodCategoryOP extends BaseOP{
    public function __construct() {
        $this->good_category = new table\GoodCategory();
        parent::__construct($this->good_category);
    }
}