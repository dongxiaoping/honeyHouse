<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/6/28
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;
use think\Db;

class TagRecordOP extends BaseOP{
    public function __construct() {
        $table = new table\TagRecord();
        parent::__construct($table);
    }

    public function get_tags_by_user_id($user_id){
       $list= Db::query("select tag_record.id as id,tag_record.tag_id as tag_id,tag.tag_name as tag_name,tag.category_id as category_id from tag_record JOIN tag on(tag_record.tag_id = tag.id) where tag_record.user_id=3");
        return $list;
    }
}