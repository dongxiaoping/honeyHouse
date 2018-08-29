<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/29
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\controller;
use \app\service;

class Cashextract
{
    public function __construct() {
        $this->CashExtractRecordServer = new service\CashExtractRecordServer();
    }

    public function cash_extract_req(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["user_id"])){
            $user_id = $_GET["user_id"];
            $result_array = $this->CashExtractRecordServer->cash_extract_req($user_id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    //获取当前用户未处理的提取请求
    public function get_cash_extract_wait_deal(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["user_id"])){
            $user_id = $_GET["user_id"];
            $result_array = $this->CashExtractRecordServer->get_cash_extract_wait_deal($user_id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }
}