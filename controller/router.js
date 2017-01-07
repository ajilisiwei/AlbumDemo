/**
 * Created by WEI on 2017/1/5.
 */
let file=require('../models/file');
let formidable = require('formidable');
let http = require('http'),
    util = require('util'),
    path=require('path'),
    fs=require('fs');
//获取所有相册
exports.showIndex=function(req,res,next){
    file.getAllDir(function (err,allAlbum) {
        if (err){
            next();
            return;
        }
        res.render('index',{
            album:allAlbum
        });
    })
};

//获取相册内的图片
exports.showAlbum=function(req,res,next){
    file.getAllImgs(req.params.albumname,function (err,allImages) {
        if (err){
            next();
            return;
        }
        res.render('album',{
            "albumname":req.params.albumname,
            "Images":allImages
        });
    });
};

//显示'上传'页面
exports.showUpPage=function (req,res,next) {
    file.getAllDir(function (err,allAlbum) {
        if (err){
            next();
            return;
        }
        res.render('up',{
            albums:allAlbum
        });
    });
};

//上传图片
exports.upLoadImg=function (req,res,next) {
    if (req.url == '/up' && req.method.toLowerCase() == 'post') {
        try {
            let form = new formidable.IncomingForm();
            form.uploadDir = path.normalize(__dirname + "/../tempup/");
            form.parse(req, function(err, fields, files) {
                if (err){
                    res.send(err.toString());
                    return;
                }
                file.upLoadImg(err, fields, files,function (err) {
                    if (err){
                        res.send(err);
                    }
                    else {
                        res.send('图片上传成功');
                    }
                });
            });
        } catch (err) {
            console.log(err.toString());
            res.send(err.toString());
        }
    }
    else {
        next();
    }
};