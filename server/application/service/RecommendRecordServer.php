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
}