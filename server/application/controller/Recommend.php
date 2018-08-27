<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/10
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\controller;
use \app\service;

class Recommend{
    public function __construct() {
        $this->RecommendRecordServer = new service\RecommendRecordServer();
    }

    public function get_recommend_records_by_user_id(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["id"])){
            $id = $_GET["id"];
            $result_array = $this->RecommendRecordServer->get_recommend_records_by_user_id($id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function get_recommend_config(){
        header("Access-Control-Allow-Origin: *");
        $result_array = $this->RecommendRecordServer->get_recommend_config();
        echo arrayToJson($result_array);
    }

}