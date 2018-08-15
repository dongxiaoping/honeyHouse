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

namespace app\controller;
use \app\service;
use \app\common;
class Pay{
    public function __construct() {

    }

    /* appid    wx295e9a9b71a0ac11  //小程序ID
     * mch_id   1511988301      //商户号
     * device_info WEB         //设备号
     * nonce_str      getRandCode     //随机字符串
     * sign ???                //签名
     * sign_type  MD5         //签名类型
     * body   好蜂味蜂产销售部-蜂蜜                //商品描述
     * out_trade_no           //商户订单号
     * total_fee          //标价金额
     * spbill_create_ip  //终端IP 用户ip
     * notify_url        //通知地址
     * trade_type   JSAPI  //交易类型
     * */
    public function test(){
        $appid = "wx295e9a9b71a0ac11";
        $mch_id = "1511988301";
        $notify_url = "https://dongxiaoping.cn/happyFriendRe/happy_friend_server/public/index.php/user/test";
        $key = "854a73af8838e6b84adcf77y474e1i1b";
        $wechatAppPay = new common\WechatAppPay($appid, $mch_id, $notify_url, $key);
        $params['body'] = '好蜂味蜂产销售部-蜂蜜'; //商品描述
        $params['out_trade_no'] = "O20160617021323-001";//自定义的订单号
        $params['total_fee'] = '100'; //订单金额 只能为整数 单位为分
        $params['trade_type'] = 'JSAPI'; //交易类型 JSAPI | NATIVE | APP | WAP
        $params['openid'] = 'okaH949YZhPCpEOXuH9bfX3wyy10'; //用户在商户appid下的唯一标识
        $result = $wechatAppPay->unifiedOrder( $params );
        echo getJsonStringByParam(0,"param_error",$result);
    }
}