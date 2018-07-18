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

class TagCategory extends Model
{
    protected $table = "tag_category";

    public function tags(){
        return $this->hasMany("Tag","category_id");
    }
}