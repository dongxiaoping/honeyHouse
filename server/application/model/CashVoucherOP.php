<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/9/3
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;
use think\Db;

class CashVoucherOP extends BaseOP{
    public function __construct() {
        $this->cash_voucher = new table\CashVoucher();
        parent::__construct($this->cash_voucher);
    }

    public function get_by_code($code){
        $list =  Db::query("select *from cash_voucher as t2 where t2.flow_num=".$code);
        return $list;
    }

    public function charge_status($id,$user_id,$status){
        $last_mod =  date("Y-m-d H:i:s");
        $list =  Db::query("update cash_voucher set status='".$status."',last_mod='".$last_mod."',user_id='".$user_id."' where id=".$id);
        return $list;
    }
}