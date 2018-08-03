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

    //http://39.108.181.67:8080/honeyHouse/server/public/index.php?s=user/test
    public function test()
    {
        /*        if(isset($_POST["sex"])&&isset($_POST["wechat_id"])){

        }else{
            echo getJsonStringByParam(0,"param_error","");
        }*/
        // echo "user test";
        // echo APP_PATH;
        // echo getJsonStringByParam(0,"param_error","");
        echo getJsonStringByParam(0,"param_error",RECOMMEND_PRICE);
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
    /*    $user_info = [
            "sex" => 1,
            "nick_name"=>"dxp",
            "phone_number"=>"13396080754",
            "wechat_id"=>"wuhane3eMdc",
            "wechat_name"=>"",
            "addr"=>"",
            "recommend_code"=>"",
            "recommend_user_code"=>1,
            "last_login_time"=>"",
            "register_time"=>""
        ];*/
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
}