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

    public function test(){//      lssLog("note",$content);
    }

    public function notice(){
        header('Access-Control-Allow-Origin: *');
        $content = file_get_contents("php://input");
        $content = (string)$content;
        $contentArray = xmlToArray($content);
        $result_code = $contentArray["result_code"];
        if($result_code==="SUCCESS"){
            $out_trade_no = $contentArray["out_trade_no"]; //编号
            $cash_fee= $contentArray["cash_fee"];//金额
            $result_array = $this->PayServer->notice_pay_success($out_trade_no,$cash_fee);
            echo arrayToJson($result_array);
        }

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