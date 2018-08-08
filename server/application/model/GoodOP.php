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
use think\Db;

class GoodOP extends BaseOP{
    public function __construct() {
        $this->good = new table\Good();
        parent::__construct($this->good);
    }

    public function get_goods_by_category($category_id){
        $category_info= Db::query("select *from good_category as t1 where t1.id=".$category_id);
        if(!$category_info){
            return null;
        }
        $good_list =  Db::query("select *from good as t2 where t2.category_id=".$category_id);
        $category_info["child_list"] = $good_list;
        return $category_info;
    }

}