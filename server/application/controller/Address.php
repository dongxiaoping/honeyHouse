<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/16
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\controller;
use \app\service;

class Address{
    public function __construct() {
        $this->AddressServer = new service\AddressServer();
    }

    public function add_address(){
        header('Access-Control-Allow-Origin: *');
        $content = file_get_contents("php://input");
        $content = (string)$content;
        $content = json_decode($content,true);
        if($content["user_id"]){
            $result_array = $this->AddressServer->add_address($content);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"error","");
        }
    }

}