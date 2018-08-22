#######################################
#            MODEL : honey_house      #
#            AUTHOR : karl            #
#######################################
delimiter ;
set names utf8;
###########  创建数据库 ###############
drop database if exists honey_house;
create database honey_house character set utf8;
############### 建表 ##################
use honey_house;

#用户信息表
create table user
(
  id bigint unsigned auto_increment,
  #性别(0-未知 1-女 2-男 )
  sex tinyint not null default 0,
  #昵称
  nick_name varchar(50) not null default "",
  #余额
  amount  decimal(6,2) not null default 0,
  #电话号码
  phone_number nvarchar(20) not null default "",
  #地址
  addr varchar(180) not null default "",
  #微信id
  wechat_id varchar(48) not null default "",
  #微信名称
  wechat_name varchar(50) not null default "",
  #推荐码
  recommend_code bigint unsigned default NULL,
  #推荐人的推荐码
  recommend_user_code  bigint unsigned default NULL ,
  #最后一次登录时间(10位时间戳)
  last_login_time  varchar(30) default null,
  #注册时间
  register_time varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#访问记录表
create table visit_record
(
  id bigint unsigned auto_increment,
  #用户ID
  user_id  bigint unsigned not null,
  #记录时间
  utc  varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#订单记录
create table order_record
(
  id  varchar(32) not null,
  #用户ID
  user_id bigint unsigned,
  #支付方式 1 微信支付 2账户支付 3其它
  pay_type tinyint not null default 0,
  #订单状态
  order_status  tinyint not null default 0,
  #订单创建时间
  create_time  varchar(30) default null,
  #最后一次修改时间
  last_mod  varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;

#订单物品记录
create table order_good_record
(
  id bigint unsigned auto_increment,
  #所属订单ID
  order_id bigint unsigned not null,
  #物品ID
  good_id bigint unsigned not null,
  #物品名称
  name varchar(80) not null default "",
  #单位
  good_unit varchar(30) not null default "",
  #实际购入价格
  price decimal(6,2) not null default 0,
  #单张图片
  img varchar(80) not null default "",
  #数量
  count int  not null default 0,
  #创建时间
  create_time   varchar(30) default null,
  #最后一次修改时间
  last_mod  varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#物品父类表
create table good_category
(
  id bigint unsigned auto_increment,
  #是否上架 0 下架 1 上架
  on_sale tinyint not null default 0,
  #名称
  name varchar(80) not null default "",
  #图片集合 存图片的json数组
  image_list varchar(480) not null default "",
  #描述
  good_mark varchar(680) not null default "",
  #物品详情 存图片的json数组
  good_detail varchar(480) not null default "",
  #物品规格 存图片的json数组
  good_standard varchar(480) not null default "",
  #访问量
  visit_count bigint unsigned not null  default 0,
  #创建时间
  create_time   varchar(30) default null,
  #最后一次修改时间
  last_mod varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;

#物品表
create table good
(
  id bigint unsigned auto_increment,
  #父ID
  category_id  bigint unsigned not null,
  #物品名称
  name varchar(80) not null default "",
  #库存
  stock bigint unsigned not null default 0,
  #是否上架 0 下架 1 上架
  on_sale tinyint not null default 0,
  #销量
  good_sell_count bigint unsigned not null default 0,
  #价格
  good_price decimal(6,2) NOT NULL,
  #折扣之前的价格
  good_orin_price decimal(6,2) NOT NULL,
  #单位
  good_unit varchar(30) not null default "",
  #图片集合
  child_image varchar(480) not null default "",
  #最后一次修改时间
  last_mod varchar(30) default null,
  #创建时间
  create_time varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#推荐赠送金额记录表
create table recommend_record
(
  id bigint unsigned auto_increment,
  #获取赠金的用户
  own_cash_user_id  bigint unsigned not null,
  #被推荐用户ID
  new_user_id bigint unsigned not null,
  #1表示新增用户  2表示推荐用户首次购买
  model tinyint not null default 0,
  #奖励金额
  reward_price decimal(6,2) not null default 0,
  #创建时间
  create_time  varchar(30) default null,
  #最后一次修改时间
  last_mod varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;

#用户地址
create table address
(
  id bigint unsigned auto_increment,
  #用户ID
  user_id  bigint unsigned not null,
  #用户名称
  name varchar(80) not null default "",
  postalCode varchar(80) not null default "",
  nationalCode  varchar(80) not null default "",
  tel varchar(80) not null default "",
  province varchar(48) not null default "",
  city varchar(48) not null default "",
  area varchar(120) not null default "",
  address varchar(480) not null default "",
  #创建时间
  create_time  varchar(30) default null,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;

#文章
create table article
(
  id bigint unsigned auto_increment,
  #内容
  content varchar(1024) not null default "",
  #是否显示 1表示显示 0表示不显示
  online tinyint not null default 1,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;

#微信支付流水
create table wechat_cash_flow
(
    id bigint unsigned auto_increment,
    #订单号
    flow_num varchar(32) not null,
    #金额
    amount decimal(6,2) not null default 0,
    #操作人code
    code varchar(120) not null default "",
    #创建时间
    create_time  varchar(30) default null,
    primary key(id)
)ENGINE=InnoDB default charset=utf8;

#操作人表
create table operater
(
    id bigint unsigned auto_increment,
    #用户名称
    name varchar(80) not null default "",
    #操作人code
    code varchar(120) not null default "",
    #创建时间
    create_time  varchar(30) default null,
    primary key(id)
)ENGINE=InnoDB default charset=utf8;

