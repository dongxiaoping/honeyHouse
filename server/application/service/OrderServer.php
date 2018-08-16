<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/8/9
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\service;
use \app\model;
use \app\common;
class OrderServer{
    public function __construct() {
        $this->appid = "wx295e9a9b71a0ac11";
        $this->mch_id = "1511988301";
        $this->key = "854a73af8838e6b84adcf77y474e1i1b";
        $this->notify_url = "https://dongxiaoping.cn/happyFriendRe/happy_friend_server/public/index.php/user/test";
        $this->OrderRecordOP = new model\OrderRecordOP();
        $this->OrderGoodRecordOP = new model\OrderGoodRecordOP();
        $this->wechatAppPay = new common\WechatAppPay($this->appid, $this->mch_id, $this->notify_url, $this->key);
    }

    public function submit_order($info){
        $user_id = $info["user_id"];
        $good_list = $info["goods"];
        $set_time = date("Y-m-d H:i:s");
        $order_id=substr(date("ymdHis"),2,8).mt_rand(100000,999999);
        $order = array(
            "id"=>$order_id,
            "user_id"=>$user_id,
            "pay_type"=>PAY_TYPE["other"],
            "order_status"=>ORDER_STATUS["wait_pay"],
            "create_time"=> $set_time,
            "last_mod"=>$set_time
        );
        $new_id = $this->OrderRecordOP->insert($order);
        if($new_id){
            for ($i= 0;$i< count($good_list); $i++){
                $good_list[$i]["order_id"] = $new_id;
                $good_list[$i]["create_time"] = $set_time;
                $good_list[$i]["last_mod"] = $set_time;
            }
            $this->OrderGoodRecordOP->insertAll($good_list);

            $body = '好蜂味蜂产销售部-蜂蜜';
            $out_trade_no = $order_id;
            $total_fee =10; //$this->get_order_price($good_list);//订单金额 分
            $spbill_create_ip =  $_SERVER["REMOTE_ADDR"];//用户ip
            $trade_type = 'JSAPI';
            $openid = $info["wechat_id"];
            $result = $this->payOrderReqToWechat($body,$out_trade_no,$total_fee,$spbill_create_ip,$trade_type,$openid);
            if($result){
                return getInterFaceArray(1,"success",$result);
            }
            return getInterFaceArray(0,"fail","");
        }
    }

    public function get_order_price($order_good_list){
        $price = 0;
        foreach( $order_good_list as $key => $value ){
            $price = $price+$value["price"]*$value["count"];
        }
        return 100*$price;
    }

    public function get_order_info($id){
        $info = $this->OrderRecordOP->get($id);
        if($info){
            $order_id = $info["id"];
            $list = $this->OrderGoodRecordOP->get_goods_by_order_id($order_id);
            $info["goods"] = $list;
            return  getInterFaceArray(1,"success",$info);
        }
        return getInterFaceArray(0,"fail","");
    }

    public function get_pay_sign($list){
        $result = $this->wechatAppPay->MakeSign($list);
        return  getInterFaceArray(1,"success",$result);
    }


    public function change_order_status($info){
        $order_id = $info["order_id"];
    }

    /* 微信的统一支付下单
     * $body 商品描述
     * $out_trade_no //订单号
     * $total_fee //订单金额 只能为整数 单位分
     * $spbill_create_ip //客户端用户IP
     * $trade_type //交易类型 JSAPI | NATIVE | APP | WAP
     * $openid //用户在商户appid下的唯一标识
     * */
    public function payOrderReqToWechat($body,$out_trade_no,$total_fee,$spbill_create_ip,$trade_type,$openid){
        $params['body'] = $body;
        $params['out_trade_no'] = $out_trade_no;
        $params['total_fee'] = $total_fee; //订单金额 只能为整数 单位为分
        $params['spbill_create_ip'] = $spbill_create_ip; //客户端用户IP
        $params['trade_type'] = $trade_type; //交易类型 JSAPI | NATIVE | APP | WAP
        $params['openid'] = $openid; //用户在商户appid下的唯一标识
        $result = $this->wechatAppPay->unifiedOrder( $params );
        if(!$result){
            return false;
        }
        $data = @$this->wechatAppPay->getAppPayParams( $result['prepay_id'] );
        return $data;
    }
}