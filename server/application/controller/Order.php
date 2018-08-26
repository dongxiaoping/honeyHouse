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
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["order_id"])&&isset($_GET["status"])){
            $order_id = $_GET["order_id"];
            $status = $_GET["status"];
            $result_array = $this->OrderServer->change_order_status($order_id,$status);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function get_orders_of_user(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["user_id"])&&isset($_GET["order_status"])){
            $user_id = $_GET["user_id"];
            $order_status = $_GET["order_status"];
            $result_array = $this->OrderServer->get_orders_of_user($user_id,$order_status);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function get_orders_count_for_deliver(){
        header("Access-Control-Allow-Origin: *");
        $result_array = $this->OrderServer->get_orders_count_for_deliver();
        echo arrayToJson($result_array);
    }

    public function get_orders_list_for_deliver(){
        header("Access-Control-Allow-Origin: *");
        $result_array = $this->OrderServer->get_orders_list_for_deliver();
        echo arrayToJson($result_array);
    }
}