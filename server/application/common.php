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
// 应用公共文件
function test(){
    echo "common test";
}


function getJsonStringByParam($status,$message,$data){
    $return_array = getInterFaceArray($status,$message,$data);
    return arrayToJson($return_array);
}

function getInterFaceArray($status,$message,$data){
    $value = array("status"=>0,"message"=>"not init","data"=>null);
    $value["status"] = $status;
    $value["message"] = $message;
    $value["data"] = $data;
    return $value;
}

function arrayToJson($info){
    return json_encode($info,JSON_UNESCAPED_UNICODE);
}