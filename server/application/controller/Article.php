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

namespace app\controller;
use \app\service;

class Article{
    public function __construct() {
        $this->ArticleServer = new service\ArticleServer();
    }

    //http://localhost/honeyHouse/server/public/index.php?s=article/get_online_articles
    public function get_online_articles(){
        header("Access-Control-Allow-Origin: *");
        $result_array = $this->ArticleServer->get_online_articles();
        echo arrayToJson($result_array);
    }
}