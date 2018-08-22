<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/15
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\controller;
use \app\service;
class Pay{
    public function __construct() {
        $this->PayServer = new service\PayServer();
    }

    public function test(){

    }

    public function notice(){
        echo "notice";
    }

    public function get_pay_sign(){
        header('Access-Control-Allow-Origin: *');
        $content = file_get_contents("php://input");
        $content = (string)$content;
        $content = json_decode($content,true);
        if($content["nonceStr"]){
            $result_array = $this->PayServer->get_pay_sign($content);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"error","");
        }
    }
}