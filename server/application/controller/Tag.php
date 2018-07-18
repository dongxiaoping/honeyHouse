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

class Tag
{
    public function __construct() {
        $this->TagServer = new service\TagServer();
    }

    //http://localhost/HappyFriend/happy_friend_server/public/index.php/tag/test
    public function test(){
        echo "right";
    }

    public function add_category(){
        header("Access-Control-Allow-Origin: *");
        if(isset($_GET["name"])){
            $name = $_GET["name"];
            $info = [
                "category_name"=>$name
            ];
            if( $this->TagServer->insert_category($info)){
                echo getJsonStringByParam(1,"success","");
            }else{
                echo getJsonStringByParam(0,"fail","");
            }
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function del_category(){
        if(isset($_GET["id"])) {
            $id = $_GET["id"];
            if($this->TagServer->get_category_by_id($id)){
                if($this->TagServer->del_category_by_id($id)){
                    echo getJsonStringByParam(1,"success","");
                }else{
                    echo getJsonStringByParam(0,"fail","");
                }
            }else{
                echo getJsonStringByParam(0,"not_exist","");
            }
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function mod_category(){
        if(isset($_GET["id"])&&isset($_GET["name"])) {
            $id = $_GET["id"];
            $name = $_GET["name"];
            if($this->TagServer->get_category_by_id($id)){
                $this->TagServer->mod_category_by_id($id,$name);
                echo getJsonStringByParam(1,"success","");
            }else{
                echo getJsonStringByParam(0,"not_exist","");
            }
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }

    public function get_category_list(){
        $list = $this->TagServer->get_category_list();
        echo getJsonStringByParam(1,"success",$list);
    }

    public function add_tag(){

    }

    public function del_tag(){

    }

    public function mod_tag(){

    }

    public function get_all_tags_group_by_category(){
        $list = $this->TagServer->get_all_tags_group_by_category();
        echo getJsonStringByParam(1,"success",$list);
    }

    public function get_tags_by_category_id(){
        if(isset($_GET["id"])) {
            $id = $_GET["id"];
            $list = $this->TagServer->get_tags_by_category_id($id);
            echo getJsonStringByParam(1,"success",$list);
        }else{
            echo getJsonStringByParam(0,"param_error","");
        }
    }
}