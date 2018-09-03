<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/9/3
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\controller;
use \app\service;

class Cashvoucher
{
    public function __construct() {
        $this->CashVoucherServer = new service\CashVoucherServer();
    }

    //http://localhost/honeyHouse/server/public/index.php?s=cashvoucher/cash_voucher_to_user
    public function cash_voucher_to_user(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["user_id"])&&isset($_GET["code"])){
            $user_id = $_GET["user_id"];
            $code =  $_GET["code"];
            $result_array = $this->CashVoucherServer->cash_voucher_to_user($user_id,$code);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }
}