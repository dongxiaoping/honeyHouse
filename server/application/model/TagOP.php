<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/6/28
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;

class TagOP extends BaseOP
{
    public function __construct() {
        $table = new table\Tag();
        parent::__construct($table);
    }

    public function getListByCategoryId($category_id){
        $list = $this->table->where("category_id",$category_id)->select();
        return $list;
    }
}