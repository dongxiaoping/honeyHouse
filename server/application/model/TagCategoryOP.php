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

class TagCategoryOP extends BaseOP
{
    public function __construct() {
        $table = new table\TagCategory();
        parent::__construct($table);
    }

    public function get_all_tags_group_by_category(){
        $list = $this->table->select();
        $category_list = array();
        foreach ($list as $item){
            dump($item->tags);
            array_push($category_list,$item);
        }
        return $category_list;
    }
}