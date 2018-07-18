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

    public function test()
    {
        echo "dd2d";
    }

    //http://39.108.181.67:8083/happyFriendRe/happy_friend_server/public/index.php/user/test
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
            "wechat_id"=>"wuhan",
            "lng"=>12.43,
            "lat"=>34.55,
            "last_visit"=>time()
        ];
        if($this->UserServer->get_user_info_by_wechat_id($user_info["wechat_id"])){
            echo getJsonStringByParam(0,"is_exist","");
        }else{
            if($this->UserServer->insert_user($user_info)){
                echo getJsonStringByParam(1,"success","");
            }else{
                echo getJsonStringByParam(0,"fail","");
            }
        }
/*        if(isset($_POST["sex"])&&isset($_POST["wechat_id"])){

        }else{
            echo getJsonStringByParam(0,"param_error","");
        }*/
    }
}