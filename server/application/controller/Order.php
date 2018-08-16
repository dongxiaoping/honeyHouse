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

namespace app\controller;
use \app\service;

class Order{
    public function __construct() {
        $this->OrderServer = new service\OrderServer();
    }

    //http://localhost/honeyHouse/server/public/index.php?s=order/submit_order
    public function submit_order(){
        header('Access-Control-Allow-Origin: *');
        $content = file_get_contents("php://input");
        $content = (string)$content;
        $content = json_decode($content,true);
        $result_array =  $this->OrderServer->submit_order($content);
        echo arrayToJson($result_array);
    }

    public function get_order_info(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["id"])){
            $id = $_GET["id"];
            $result_array = $this->OrderServer->get_order_info($id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function change_order_status(){
        header('Access-Control-Allow-Origin: *');
        $content = file_get_contents("php://input");
        $content = (string)$content;
        $content = json_decode($content,true);
        if($content["order_id"]&&$content["user_id"]&&$content["status"]){
            $result_array = $this->OrderServer->change_order_status($content);
        }else{
            echo getJsonStringByParam(0,"error","");
        }
    }

}