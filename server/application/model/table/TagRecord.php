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

namespace app\model\table;
use think\Model;

class TagRecord extends Model
{
    protected $table = "tag_record";

    public function tagDetail(){
        return $this->hasOne("Tag","id","tag_id")->field("category_id,tag_name");
    }
}