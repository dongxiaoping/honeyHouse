<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

define("APP_PATH",__DIR__);
// 应用公共文件
function cc(){
    echo 3;
}

function getJsonStringByParam($status,$message,$data){
    $value = array("status"=>0,"message"=>"not init","data"=>null);
    $value["status"] = $status;
    $value["message"] = $message;
    $value["data"] = $data;
    return json_encode($value,JSON_UNESCAPED_UNICODE);
}