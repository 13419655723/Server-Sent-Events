/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2019-04-15 11:10:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `contact`
-- ----------------------------
DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `user_id` varchar(60) COLLATE utf8_bin NOT NULL,
  `name` varchar(60) COLLATE utf8_bin NOT NULL,
  `QQ` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `TEL` varchar(40) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of contact
-- ----------------------------
INSERT INTO `contact` VALUES ('445fbgbgb564545', '阿彪', '6666666666', '666666666666');
INSERT INTO `contact` VALUES ('4545rfgfg56gg', '许国庆', '345345', '3333333333');
INSERT INTO `contact` VALUES ('454fgfggf56564', '王菲', '5555555', '5678678');
INSERT INTO `contact` VALUES ('dfdf3445fgfg45', '肖飞', '456667777', '35656564564');
INSERT INTO `contact` VALUES ('sfdf458458sdfdf', '杨森', '456456', '666666666');
