<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/7/25
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\service;
use \app\model;

class RecommendRecordServer
{
    public function __construct() {
        $this->RecommendRecordOP = new model\RecommendRecordOP();
    }

    public function insert_record($info){
        return $this->RecommendRecordOP->insert($info);
    }

    public function get_recommend_records_by_user_id($id){
        $return_info = $this->RecommendRecordOP->get_recommend_records_by_user_id($id);
        return  getInterFaceArray(1,"success",$return_info);
    }

    public function get_recommend_config(){
        $info = array("recommend_user"=>RECOMMEND_PRICE["recommend_user"],"recommend_user_buy"=>RECOMMEND_PRICE["recommend_user_buy"]);
        return  getInterFaceArray(1,"success",$info);
    }
}