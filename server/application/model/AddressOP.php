<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/16
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;
use think\Db;

class AddressOP extends BaseOP{
    public function __construct() {
        $this->address = new table\Address();
        parent::__construct($this->address);
    }

    public function get_addr_by_user_id($user_id){
        $list =  Db::query("select *from address as t2 where t2.user_id=".$user_id);
        return $list;
    }

    public function update_addr_by_user_id($info){
       $result = $this->address->save([
            'name' => $info['name'],
            'postalCode' => $info['postalCode'],
            'nationalCode' => $info['nationalCode'],
            'tel' => $info['tel'],
            'province' => $info['province'],
            'city' => $info['city'],
            'area' => $info['area'],
            'address' => $info['address'],
            'create_time' => $info["create_time"]
        ],['user_id' => $info["user_id"]]);
       return $result;
    }
}