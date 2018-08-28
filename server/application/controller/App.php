<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/28
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\controller;
use \app\service;

class App{
    public function __construct() {
        $this->AppServer = new service\AppServer();
    }

    public function get_app_config_info(){
        header("Access-Control-Allow-Origin: *");
        $result_array = $this->AppServer->get_app_config_info();
        echo arrayToJson($result_array);
    }
}