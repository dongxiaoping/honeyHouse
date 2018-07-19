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
  nick_name varchar(128) not null default "",
  #余额
  amount  decimal(6,2) NOT NULL,
  #电话号码
  phone_number varchar(10) not null default "",
  #地址
  addr varchar(480) not null default "",
  #微信id
  wechat_id varchar(30) not null default "",
  #微信名称
  wechat_name varchar(20) not null default "",
  #最后一次登录时间(10位时间戳)
  last_visit_time bigint unsigned,
  #推荐码
  recommend_code varchar(48) not null default "",
  #推荐人
  reommend_user_id  bigint unsigned default null,
  #注册时间
  registration_time bigint unsigned,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#访问记录表
create table visit_record
(
  id bigint unsigned auto_increment,
  #用户ID
  user_id  bigint unsigned not null,
  #记录时间
  utc bigint unsigned,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#订单记录
create table order_record
(
  id bigint unsigned auto_increment,
  #用户ID
  user_id bigint unsigned,
  #订单状态
  order_status  tinyint not null default 0,
  #订单创建时间
  create_time  bigint unsigned,
  #最后一次修改时间
  last_mod bigint unsigned,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;

#订单物品记录
create table order_good_record
(
  id bigint unsigned auto_increment,
  #所属订单ID
  order_id bigint unsigned,
  #物品ID
  good_id bigint unsigned,
  #数量
  count tinyint not null default 0,
  #创建时间
  create_time  bigint unsigned,
  #最后一次修改时间
  last_mod bigint unsigned,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#物品父类表
create table good_parent
(
  id bigint unsigned auto_increment,
  #名称
  name varchar(80) not null default "",
  #图片集合
  images varchar(680) not null default "",
  #描述
  desc varchar(480) not null default "",
  #访问量
  visit_count bigint unsigned not null  default 0,
  #最后一次修改时间
  last_mod bigint unsigned,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;

#物品表
create table good
(
  id bigint unsigned auto_increment,
  #父ID
  parent_id  bigint unsigned not null,
  #规格名称
  name varchar(80) not null default "",
  #库存
  stock bigint unsigned not null default 0,
  #是否上架 0 下架 1 上架
  is_shelf tinyint not null default 0,
  #描述
  desc varchar(480) not null default "",
  #销量
  sale_count bigint unsigned not null default 0,
  #折扣
  discount decimal(3,2) NOT NULL default 1,
  #价格
  price decimal(6,2) NOT NULL,
  #单位
  unit varchar(30) not null default "",
  #图片集合
  images varchar(680) not null default "",
  #最后一次修改时间
  last_mod bigint unsigned,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;


#推荐赠送金额记录表
create table recommend_recharge_record
(
  id bigint unsigned auto_increment,
  user_id  bigint unsigned not null,
  #推荐用户ID
  recommend_user_id bigint unsigned not null,
  # 1表示新增用户  2表示推荐用户首次购买
  type not null default 0,
  #创建时间
  create_time  bigint unsigned,
  #最后一次修改时间
  last_mod bigint unsigned,
  primary key(id)
)ENGINE=InnoDB default charset=utf8;
