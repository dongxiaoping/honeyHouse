<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/6/28
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\service;
use \app\model;

class UserServer{
    public function __construct() {
        $this->UserOP = new model\UserOP();
    }

    public function get_user_info_by_wechat_id($wechat_id){
        return $this->UserOP->get_user_info_by_wechat_id($wechat_id);
    }

    public function insert_user($info){
        return $this->UserOP->insert($info);
    }

    public function get_max_recommend_code(){
        return $this->UserOP->get_max_recommend_code();

    }

}