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

/*require_once APP_PATH .'common.php';*/

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
        echo 1;
    }

    public function get_user_info(){
        header("Access-Control-Allow-Origin: *"); //支持跨域
        if(isset($_GET["id"])){
            $wechat_id = $_GET["id"];
            $user_info = $this->UserServer->get_user_info_by_wechat_id($wechat_id);
            if($user_info){
                echo getJsonStringByParam(1,"right",$user_info);
            }else{
                echo getJsonStringByParam(0,"not_exist","");
            }
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function add_user(){
        $user_info = [
            "sex" => 1,
            "nick_name"=>"dxp",
            "phone_number"=>"13396080754",
            "wechat_id"=>"wuhane3",
            "wechat_name"=>"",
            "addr"=>"",
            "recommend_code"=>12,
            "last_login_time"=>"",
            "register_time"=>""
        ];
        $user_info["register_time"] = date("Y-m-d H:i:s");
        $user_info["last_login_time"] =$user_info["register_time"];
        $last_recommend_code = $this->UserServer->get_max_recommend_code();
        $user_info["recommend_code"] =$last_recommend_code+1;
       if($this->UserServer->get_user_info_by_wechat_id($user_info["wechat_id"])){
            echo getJsonStringByParam(0,"is_exist","");
        }else{
            if($this->UserServer->insert_user($user_info)){
                echo getJsonStringByParam(1,"success","");
            }else{
                echo getJsonStringByParam(0,"fail","");
            }
        }
    }
}