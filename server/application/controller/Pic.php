<?php
// +----------------------------------------------------------------------
// | Copyright (php), BestTV.
// +----------------------------------------------------------------------
// | Author: karl.dong
// +----------------------------------------------------------------------
// | Date：2018/7/30
// +----------------------------------------------------------------------
// | Description: 
// +----------------------------------------------------------------------

namespace app\controller;
use \app\service;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\LabelAlignment;
use Endroid\QrCode\QrCode;
class Pic{
    //localhost/honeyHouse/server/public/index.php?s=pic/getRecommendHoneyLocationQRcode
    public function getRecommendHoneyLocationQRcode(){
        $qrCode = new QrCode('调试中');
        $qrCode->setSize(300);
        $qrCode
            ->setWriterByName('png')
            ->setMargin(10)
            ->setEncoding('UTF-8')
            ->setErrorCorrectionLevel(ErrorCorrectionLevel::HIGH)
            ->setForegroundColor(['r' => 0, 'g' => 0, 'b' => 0])
            ->setBackgroundColor(['r' => 255, 'g' => 255, 'b' => 255])
            ->setLabel('小程序蜂蜜佬', 16,null, LabelAlignment::CENTER)
            ->setLogoPath(APP_PATH.'/image/honey.jpg')
            ->setLogoWidth(60)
            ->setValidateResult(false)
        ;
        header('Content-Type: '.$qrCode->getContentType());
        echo $qrCode->writeString();
    }
}