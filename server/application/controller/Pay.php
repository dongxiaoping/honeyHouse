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

    public function test(){//      lssLog("debug",$content);
        $content="<xml><appid><![CDATA[wx295e9a9b71a0ac11]]></appid>
<bank_type><![CDATA[CFT]]></bank_type>
<cash_fee><![CDATA[20]]></cash_fee>
<fee_type><![CDATA[CNY]]></fee_type>
<is_subscribe><![CDATA[N]]></is_subscribe>
<mch_id><![CDATA[1511988301]]></mch_id>
<nonce_str><![CDATA[HweCeORoXmCf1hVYEpugYQPgjJB0fyuZ]]></nonce_str>
<openid><![CDATA[okaH949YZhPCpEOXuH9bfX3wyy10]]></openid>
<out_trade_no><![CDATA[08221508770309]]></out_trade_no>
<result_code><![CDATA[SUCCESS]]></result_code>
<return_code><![CDATA[SUCCESS]]></return_code>
<sign><![CDATA[50FFDE851E9CBCECA861A6FEABC6A9B8]]></sign>
<time_end><![CDATA[20180822150901]]></time_end>
<total_fee>20</total_fee>
<trade_type><![CDATA[JSAPI]]></trade_type>
<transaction_id><![CDATA[4200000165201808221995374552]]></transaction_id>
</xml>";
    }
//http://localhost/honeyHouse/server/public/index.php
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