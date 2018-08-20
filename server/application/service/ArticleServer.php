<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/20
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\service;
use \app\model;
use \app\service;

class ArticleServer{
    public function __construct() {
        $this->ArticleOP = new model\ArticleOP();
    }

    public function get_online_articles(){
        $list= $this->ArticleOP->get_online_articles();
        $items = array();
        for ($i= 0;$i< count($list); $i++){
            $jsonString = $list[$i]["content"];
            $jsonString = str_replace(" ","",$jsonString);
            $array = json_decode($jsonString,true);
            $items[] = $array;
        }
       return  getInterFaceArray(1,"success",$items);
    }

}