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
            $list[$i]["content"] = $array;
        }
       return  getInterFaceArray(1,"success",$list);
    }

    public function add_article_visit($id){
        $item= $this->ArticleOP->get($id);
        $content = $item["content"];
        $content = json_decode($content,true);
        $content["visit_count"]++;
        $content = json_encode($content);
        $content=$this->decodeUnicode($content);
        $list= $this->ArticleOP->update_content($id,$content);
        return  getInterFaceArray(1,"success","");
    }

    function decodeUnicode($str) {
        return preg_replace_callback('/\\\\u([0-9a-f]{4})/i', create_function( '$matches', 'return mb_convert_encoding(pack("H*", $matches[1]), "UTF-8", "UCS-2BE");' ), $str);
    }
}