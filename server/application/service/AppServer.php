<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/28
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\service;
use \app\model;
use \app\service;

class AppServer{
    public function __construct() {
        $this->AddressOP = new model\AddressOP();
    }

    public function get_app_config_info(){
        var_dump( APP_PATH."Config.php");
        $list = array("customer_service_phone"=>"13396080754","cooper_group_code_img"=>"");
        return  getInterFaceArray(1,"success",$list);
    }
}