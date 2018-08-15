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
use \app\service;

class UserServer{
    public function __construct() {
        $this->UserOP = new model\UserOP();
        $this->RecommendRecordServer = new service\RecommendRecordServer();
        $this->VisitRecordOP = new model\VisitRecordOP();
    }


    public function get_user_info_by_wechat_id($wechat_id){
        $user_info = $this->UserOP->get_user_info_by_wechat_id($wechat_id);
        if($user_info){
            return  getInterFaceArray(1,"right",$user_info);
        }else{
            return getInterFaceArray(0,"not_exist","");
        }
    }

    public function add_user($user_info){
        $user_info["register_time"] = date("Y-m-d H:i:s");
        $user_info["last_login_time"] =$user_info["register_time"];
        $last_recommend_code = $this->UserOP->get_max_recommend_code();
        $user_info["recommend_code"] =$last_recommend_code+1;
        $user = $this->UserOP->get_user_info_by_wechat_id($user_info["wechat_id"]);
        if($user){ //用户已存在，无法创建
            return getInterFaceArray(0,"user_is_exist","");
        }
        $new_user_id =$this->UserOP->insert($user_info);
        if(!$new_user_id){//创建异常失败
            return  getInterFaceArray(0,"fail_unknown","");
        }
        $recommend_user_code = $user_info["recommend_user_code"];
        $own_cash_user_info =  $this->UserOP->get_user_info_by_recommend_code($recommend_user_code);
        if(!$own_cash_user_info){
            return getInterFaceArray(1,"success_not_recommend",$new_user_id);//没有推荐用户
        }
        $own_cash_user_id = $own_cash_user_info["id"];
        $record_info = [
            "own_cash_user_id" => $own_cash_user_id,
            "new_user_id"=>$new_user_id,
            "model"=>REWARD_TYPE["recommend_user"],
            "reward_price"=>RECOMMEND_PRICE["recommend_user"],
            "create_time"=>date("Y-m-d H:i:s"),
            "last_mod"=>date("Y-m-d H:i:s")
        ];
        $this->RecommendRecordServer->insert_record($record_info);
        return getInterFaceArray(1,"success_has_recommend",$new_user_id);//有推荐用户
    }

    public function user_visit($user_id){
        $info = ["user_id"=>$user_id,
            "utc"=>date("Y-m-d H:i:s")
        ];
        $new_id = $this->VisitRecordOP->insert($info);
        if($new_id){
            return  getInterFaceArray(1,"success","");
        }
        return  getInterFaceArray(0,"fail","");
    }

    public function on_login($temp_id){
        $appid = "wx295e9a9b71a0ac11";
        $secret = "854a73a08838e6484adcf774474e151b";
        $http_string = "https://api.weixin.qq.com/sns/jscode2session?appid=".$appid."&secret=".$secret."&js_code=".$temp_id."&grant_type=authorization_code";
        $result = file_get_contents($http_string);
        $result = json_decode($result);
        return  getInterFaceArray(1,"success",$result);
    }
}