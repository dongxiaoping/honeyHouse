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

namespace app\service;
use \app\model;
use \app\service;

class CashExtractRecordServer
{
    public function __construct() {
        $this->CashExtractRecordOP = new model\CashExtractRecordOP();
        $this->UserOP = new model\UserOP();
    }

    public function get_cash_extract_wait_deal($user_id){
        $return_info = $this->CashExtractRecordOP->get_cash_extract_wait_deal($user_id);
        if($return_info){
            return  getInterFaceArray(1,"",$return_info[0]);
        }else{
            return  getInterFaceArray(0,"","");
        }
    }

    public function cash_extract_req($user_id){
        $info = $this->UserOP->get($user_id);
        if(!$info){
            return  getInterFaceArray(0,"use-not-exist","");
        }
        $cash = $info["amount"];
        if($cash<60){
            return  getInterFaceArray(0,"cash-not-enough",60);
        }
        $items= $this->CashExtractRecordOP->get_cash_extract_wait_deal($user_id);
        if($items){
            return  getInterFaceArray(1,"",$items[0]["flow_num"]);
        }
        $flow_num = substr(date("ymdHis"),2,8).mt_rand(100000,999999);
        $setInfo = [
            "user_id"=>$user_id,
            "flow_num" =>$flow_num,
            "amount"=>0,
            "status"=>1,
            "create_time"=>date("Y-m-d H:i:s"),
            "last_mod"=>date("Y-m-d H:i:s")
        ];
        $return_info = $this->CashExtractRecordOP->insert($setInfo);
        if(!$return_info){
            return  getInterFaceArray(0,"","");
        }
        return getInterFaceArray(1,"",$flow_num);
    }

    public function get_cash_by_flow_num_with_extract($flow_num){
        $return_info = $this->CashExtractRecordOP->get_cash_extract_wait_deal_by_num($flow_num);
        if($return_info){
            $info = $return_info[0];
            $user_id = $info["user_id"];
            $user_info = $this->UserOP->get($user_id);
            if($user_info){
                $cash = $user_info["amount"];
                return  getInterFaceArray(1,"",$cash);
            }else{
                return  getInterFaceArray(0,"user_not_exist","");
            }
        }else{
            return  getInterFaceArray(0,"flow_wait_deal_not_exist","");
        }
    }

    public function deal_by_flow_num($flow_num){
        $return_info = $this->CashExtractRecordOP->get_cash_extract_wait_deal_by_num($flow_num);
        if($return_info){
            $info = $return_info[0];
            $user_id = $info["user_id"];
            $user_info = $this->UserOP->get($user_id);
            if($user_info){
                $cash = $user_info["amount"];
                $this->UserOP->change_cash_by_user_id($user_id,0);
                $mod_time = date("Y-m-d H:i:s");
                $this->CashExtractRecordOP->deal_by_flow_num($flow_num,$cash,$mod_time);
                return  getInterFaceArray(1,"success","");
            }else{
                return  getInterFaceArray(0,"user_not_exist","");
            }
        }else{
            return  getInterFaceArray(0,"flow_wait_deal_not_exist","");
        }
    }

}