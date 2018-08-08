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

namespace app\controller;
use \app\service;

class Good{
    public function __construct() {
        $this->GoodServer = new service\GoodServer();
    }

//http://localhost/honeyHouse/server/public/index.php?s=good/add_good
    public function add_good(){
        $info = [
            "category_id" => "1",
            "name"=>"2L装",
            "stock"=>39,
            "on_sale"=>1,
            "good_desc"=>"好物品",
            "sale_count"=>0,
            "discount"=>1,
            "price"=>20,
            "unit"=>"瓶",
            "images"=>"",
            "create_time"=>"",
            "last_mod"=>""
        ];
        $result_array = $this->GoodServer->add_good($info);
        echo arrayToJson($result_array);
    }

    public function add_good_category(){
        $info = [
            "name" => "蜂蜜",
            "images"=>"",
            "good_desc"=>"好蜂蜜",
            "visit_count"=>0,
            "create_time"=>"",
            "last_mod"=>""
        ];
        $result_array = $this->GoodServer->add_good_category($info);
        echo arrayToJson($result_array);
    }

    //http://localhost/honeyHouse/server/public/index.php?s=good/get_goods_by_category&id=1
    public function get_goods_by_category(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["id"])){
            $id = $_GET["id"];
            $result_array = $this->GoodServer->get_goods_by_category($id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }
}