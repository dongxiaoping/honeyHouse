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
namespace app\service;
use \app\model;

class TagServer
{

    public function __construct() {
        $this->TagCategoryOP = new model\TagCategoryOP();
        $this->TagOP = new model\TagOP();
    }

    public function insert_category($info){
        return $this->TagCategoryOP->insert($info);
    }

    public function get_category_by_id($id){
        return $this->TagCategoryOP->get($id);
    }

    public function del_category_by_id($id){
        return $this->TagCategoryOP->del($id);
    }

    public function mod_category_by_id($id,$name){
       $this->TagCategoryOP->mod($id,$name);
    }

    public function get_category_list(){
        return $this->TagCategoryOP->getAll();
    }

    public function get_tags_by_category_id($id){
        return $this->TagOP->getListByCategoryId($id);
    }

    public function get_all_tags_group_by_category(){
        return $this->TagCategoryOP->get_all_tags_group_by_category();
    }
}