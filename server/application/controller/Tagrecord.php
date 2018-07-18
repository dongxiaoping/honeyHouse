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

namespace app\controller;
use \app\service;

class Tagrecord{
    public function __construct() {
        $this->TagRecordServer = new service\TagRecordServer();
    }

    //http://localhost/happy_friend_server/public/index.php/tagrecord/get_tags_by_user_id?id=3
    public function test(){
        echo "right";
    }

    public function get_tags_by_user_id(){
        if(isset($_GET["id"])) {
            $id = $_GET["id"];
            $list = $this->TagRecordServer->get_tags_by_user_id($id);
            echo getJsonStringByParam(1,"success",$list);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }
}