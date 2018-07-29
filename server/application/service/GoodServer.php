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

namespace app\service;
use \app\model;
use \app\service;

class GoodServer
{
    public function __construct() {
        $this->GoodCategoryOP = new model\GoodCategoryOP();
        $this->GoodOP = new model\GoodOP();
    }

    public function add_good_category($info){
        $info["create_time"] = date("Y-m-d H:i:s");
        $info["last_mod"] = $info["create_time"];
        $return_info = $this->GoodCategoryOP->insert($info);
        if($return_info){
            return  getInterFaceArray(1,"success",$return_info);
        }
        return  getInterFaceArray(0,"faill","");
    }

    public function add_good($info){
        $category_id = $info["category_id"];
        $category_info = $this->GoodCategoryOP->get($category_id);
        if(!$category_info){
            return  getInterFaceArray(0,"category_not_exist","");
        }
        $info["create_time"] = date("Y-m-d H:i:s");
        $info["last_mod"] = $info["create_time"];
        $return_info = $this->GoodOP->insert($info);
        if($return_info){
            return  getInterFaceArray(1,"success",$return_info);
        }
        return  getInterFaceArray(0,"faill","");
    }

    public function get_goods_by_category($category_id){
        $list = $this->GoodOP->get_goods_by_category($category_id);
        if($list===null){
            return getInterFaceArray(0,"category_not_exist","");
        }
        return  getInterFaceArray(1,"success",$list);
    }


}