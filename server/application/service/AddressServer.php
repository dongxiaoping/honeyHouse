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

namespace app\service;
use \app\model;
use \app\service;

class AddressServer{
    public function __construct() {
        $this->AddressOP = new model\AddressOP();
    }

    public function add_address($info){
        $user_id = $info["user_id"];
        $info["create_time"] = date("Y-m-d H:i:s");
        $list = $this->AddressOP->get_addr_by_user_id($user_id);
        if(count($list)<=0){
            $return_info = $this->AddressOP->insert($info);
            if($return_info){
                return  getInterFaceArray(1,"success",$return_info);
            }
            return  getInterFaceArray(0,"faill","");
        }
        $this->AddressOP->update_addr_by_user_id($info);
        return  getInterFaceArray(1,"success","");
    }
}