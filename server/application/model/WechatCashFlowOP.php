<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/22
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\model;
use \app\model\table;

class WechatCashFlowOP extends BaseOP{

    public function __construct() {
        $this->wechat_cash_flow = new table\WechatCashFlow();
        parent::__construct($this->wechat_cash_flow);
    }
}