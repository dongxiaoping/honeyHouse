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
}