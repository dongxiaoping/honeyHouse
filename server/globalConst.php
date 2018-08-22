<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/7/19
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------
/*
*
THINK_PATH 框架系统目录
APP_PATH 应用目录（默认为入口文件所在目录）
LIB_PATH 系统类库目录（默认为 THINK_PATH.'Library/'）
CORE_PATH 系统核心类库目录 （默认为 LIB_PATH.'Think/'）
MODE_PATH 系统应用模式目录 （默认为 THINK_PATH.'Mode/'）
BEHAVIOR_PATH 行为目录 （默认为 LIB_PATH.'Behavior/'）
COMMON_PATH 公共模块目录 （默认为 APP_PATH.'Common/'）
VENDOR_PATH 第三方类库目录（默认为 LIB_PATH.'Vendor/'）
RUNTIME_PATH 应用运行时目录（默认为 APP_PATH.'Runtime/'）
HTML_PATH 应用静态缓存目录（默认为 APP_PATH.'Html/'）
CONF_PATH 应用公共配置目录（默认为 COMMON_PATH.'Conf/'）
LANG_PATH 公共语言包目录 （默认为 COMMON_PATH.'Lang/'）
LOG_PATH 应用日志目录 （默认为 RUNTIME_PATH.'Logs/'）
CACHE_PATH 项目模板缓存目录（默认为 RUNTIME_PATH.'Cache/'）
TEMP_PATH 应用缓存目录（默认为 RUNTIME_PATH.'Temp/'）
DATA_PATH 应用数据目录 （默认为 RUNTIME_PATH.'Data/'）
 * */
define("APP_PATH",__DIR__.'/application/');

/*推荐价格定义
 *recommend_user ：推荐一个用户的获取收益值
 * recommend_user_buy：推荐用户购买一次的获取收益值
 * */
define('RECOMMEND_PRICE',array('recommend_user'=>1,'recommend_user_buy'=>5));

/*获取收益的方式定义
 *recommend_user ：推荐用户
 * recommend_user_buy：推荐用户购买
 * */
define('REWARD_TYPE',array('recommend_user'=>1,'recommend_user_buy'=>2));

define('ORDER_STATUS',array(
'wait_pay'=>1,//等待买家付款
'has_pay'=>2, //买家已付款
'good_delivered'=>3,//卖家已发货
'success'=>4,//交易成功
'cancel'=>5 //已取消：订单成功提交但7天内未付款的订单状态
));

define('PAY_TYPE',array(
    'wechat'=>1,//微信
    'account'=>2,//账户
    'mix'=>3,//混合支付
    'other'=>4
));

define('WECHAT',array(
    'appid'=>"wx295e9a9b71a0ac11",
    'mch_id'=>"1511988301",
    'key'=>"",
    'notify_url'=>"https://dongxiaoping.cn/honeyHouse/server/public/index.php"
));