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

namespace app\model;
use \app\model\table;
use think\Db;

class ArticleOP extends BaseOP{
    public function __construct() {
        $this->article = new table\Article();
        parent::__construct($this->article);
    }

    public function get_online_articles(){
        $list =  Db::query("select *from article as t2 where t2.online=1");
        return $list;
    }

    public function update_content($id,$content){
        $list =  Db::query("update article set content='".$content."' where id=".$id);
        return $list;
    }
}