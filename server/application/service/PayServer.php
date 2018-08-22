<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/15
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\service;
use \app\common;
use \app\model;

class PayServer{
    public function __construct() {
        $this->appid = WECHAT["appid"];
        $this->mch_id = WECHAT["mch_id"];
        $this->key = WECHAT["key"];
        $this->notify_url = WECHAT["notify_url"];
        $this->wechatAppPay = new common\WechatAppPay($this->appid, $this->mch_id, $this->notify_url, $this->key);

        $this->WechatCashFlowOP = new model\WechatCashFlowOP();
        $this->OrderRecordOP = new model\OrderRecordOP();
        $this->UserOP = new model\UserOP();
    }

    public function notice_pay_success($out_trade_no,$cash_fee){
        $result = $this->WechatCashFlowOP->get_by_out_trade_no($out_trade_no);
        if($result){
            return getInterFaceArray(0,"fail","repeat");
        }
        $info = array();
        $info["flow_num"] = $out_trade_no;
        $info["amount"] = $cash_fee;
        $info["code"] = "wechat";
        $info["create_time"] = date("Y-m-d H:i:s");
        lssLog("debug",$out_trade_no."：插入流水记录");
        $result = $this->WechatCashFlowOP->insert($info);
        if($result){
            $this->dealNewWechatCashFlow($out_trade_no);
            return getInterFaceArray(1,"success","");
        }else{
            return getInterFaceArray(0,"fail","");
        }
    }

    public function dealNewWechatCashFlow($out_trade_no){
       lssLog("debug",$out_trade_no."：支付流水记录完毕");
       $this->OrderRecordOP->setOrderPayById($out_trade_no);
        $order_record_item = $this->OrderRecordOP->get($out_trade_no);
       if($order_record_item){
           $user_id = $order_record_item["user_id"];
           lssLog("debug","订单所属用户：".$user_id);
           $user_info = $this->UserOP->get($user_id);
           if($user_info){
               $recommend_user_code = $user_info["recommend_user_code"];
               if($recommend_user_code!=0){
                   lssLog("debug",$recommend_user_code.":给该推荐码的用户发奖金");
                   $this->UserOP->add_cash_by_recommend_code($recommend_user_code,RECOMMEND_PRICE["recommend_user_buy"]);
               }
           }else{
               lssLog("debug",$user_id.":该用户无用户推荐");
           }
       }
    }

    public function get_pay_sign($list){
        $result = $this->wechatAppPay->MakeSign($list);
        return  getInterFaceArray(1,"success",$result);
    }

    /* 微信的统一支付下单
     * $out_trade_no //订单号
     * $total_fee //订单金额 只能为整数 单位分
     * $openid //用户在商户appid下的唯一标识
     * */
    public function payOrderReqToWechat($out_trade_no,$total_fee,$openid){
        $params['body'] = '好蜂味蜂产销售部-蜂蜜';
        $params['out_trade_no'] = $out_trade_no;
        $params['total_fee'] = $total_fee; //订单金额 只能为整数 单位为分
        $params['spbill_create_ip'] = $_SERVER["REMOTE_ADDR"];//客户端用户IP
        $params['trade_type'] = 'JSAPI';; //交易类型 JSAPI | NATIVE | APP | WAP
        $params['openid'] = $openid; //用户在商户appid下的唯一标识
        $result = $this->wechatAppPay->unifiedOrder( $params );
        if(!$result){
            return false;
        }
        $data = @$this->wechatAppPay->getAppPayParams( $result['prepay_id'] );
        return $data;
    }
}