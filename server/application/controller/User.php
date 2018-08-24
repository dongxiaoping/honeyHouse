<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/6/26
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------
namespace app\controller;
use \app\service;

class User
{
    public function __construct() {
        $this->UserServer = new service\UserServer();
    }

    //http://localhost/honeyHouse/server/public/index.php?s=user/test
    public function test(){
        $ddnumber=substr(date("ymdHis"),2,8).mt_rand(100000,999999);
        echo $ddnumber;
        //echo getJsonStringByParam(0,"param_error",RECOMMEND_PRICE);
    }

    //通过临时微信ID获取用户唯一ID
    public function on_login(){
        header("Access-Control-Allow-Origin: *"); //支持跨域
        if(isset($_GET["id"])){
            $temp_id = $_GET["id"];
            $result_array = $this->UserServer->on_login($temp_id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    /*获取用户基本信息*/
    public function get_user_info_by_wechat_id(){
        header("Access-Control-Allow-Origin: *"); //支持跨域
        if(isset($_GET["id"])){
            $wechat_id = $_GET["id"];
            $result_array = $this->UserServer->get_user_info_by_wechat_id($wechat_id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    /*新增用户*/
    public function add_user(){
        header('Access-Control-Allow-Origin: *');
        $content = file_get_contents("php://input");
        $content = (string)$content;
        $contents = json_decode($content,true);
        if(!isset($contents["wechat_id"])){
              echo getJsonStringByParam(0,"param_error","");
        }
        $result_array = $this->UserServer->add_user($contents);
        echo arrayToJson($result_array);
    }

    /*用户访问记录*/
    public function user_visit(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["id"])){
            $user_id = $_GET["id"];
            $result_array = $this->UserServer->user_visit($user_id);
            echo arrayToJson($result_array);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }
    //http://localhost/honeyHouse/server/public/index.php?s=user/log_report
    public function log_report(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["info"])){
            $info = $_GET["info"];
            $info = (string)$info;
            lssLog("error",$info);
            echo getJsonStringByParam(1,"success","");
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

}