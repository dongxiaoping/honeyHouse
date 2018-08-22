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

namespace app\model;
use \app\model\table;
use think\Db;
class UserOP extends BaseOP{
    public function __construct() {
        $this->user = new table\User();
        parent::__construct($this->user);
    }

    public function get_user_info_by_wechat_id($wechat_id){
        $info =  $this->user->where("wechat_id",$wechat_id)->find();
        return $info;
    }

    public function get_user_info_by_recommend_code($recommend_code){
        $info =  $this->user->where("recommend_code",$recommend_code)->find();
        return $info;
    }

    public function get_max_recommend_code(){
        $info =  $this->user->max("recommend_code");
        return $info;
    }

    public function add_cash_by_user_id($id,$cash){
        $item = $this->get($id);
        if($item){
            $new_cash = $item["amount"]+$cash;
             Db::query("update user set amount=".$new_cash." where id=".$id);
        }
    }

    public function add_cash_by_recommend_code($recommend_code,$cash){
        $item = $this->get_user_info_by_recommend_code($recommend_code);
        if($item){
            $new_cash = $item["amount"]+$cash;
            Db::query("update user set amount=".$new_cash." where recommend_code=".$recommend_code);
        }
    }
}