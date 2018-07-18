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

class TagRecordServer{
    public function __construct() {
        $this->TagRecordOP = new model\TagRecordOP();
    }

    public function get_tags_by_user_id($id){
        return $this->TagRecordOP->get_tags_by_user_id($id);
    }
}