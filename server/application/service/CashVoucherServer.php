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

namespace app\service;
use \app\model;
use \app\service;

class CashVoucherServer
{
    public function __construct() {
        $this->UserOP = new model\UserOP();
        $this->CashVoucherOP = new model\CashVoucherOP();
    }

    public function cash_voucher_to_user($user_id,$code){
        $voucher_info_list = $this->CashVoucherOP->get_by_code($code);
        if(count($voucher_info_list)>0){
            $id = $voucher_info_list[0]["id"];
            $cash = $voucher_info_list[0]["amount"];
            $status = $voucher_info_list[0]["status"];
            if($status!==CASH_VOUCHER_STATUS["un_use"]){
                return  getInterFaceArray(0,"代金券不能使用","");
            }
            $user_info = $this->UserOP->get($user_id);
            if($user_info){
                $this->CashVoucherOP->charge_status($id,$user_id,CASH_VOUCHER_STATUS["has_use"]);
                $this->UserOP->add_cash_by_user_id($user_id,$cash);
                return  getInterFaceArray(1,"","");
            }
            return  getInterFaceArray(0,"用户不存在","");
        }
        return  getInterFaceArray(0,"代金券不存在","");
    }

    public function create_cash_voucher($password,$num,$cash){
        if($password!=="243589"){
            return  getInterFaceArray(0,"error","");
        }
        $numArray = [];
        $list = [];
        for($i=0;$i<$num;$i++){
            $flow_num = generate_password();
            $item = [
                "user_id" => 0,
                "flow_num"=>$flow_num,
                "amount"=>$cash,
                "status"=>CASH_VOUCHER_STATUS["un_use"],
                "last_mod"=>date("Y-m-d H:i:s"),
                "create_time"=>date("Y-m-d H:i:s")
            ];
            $numArray[] = $flow_num;
            $list[] = $item;
        }
        $this->CashVoucherOP->insertAll($list);
        return  getInterFaceArray(1,"",$numArray);
    }
}