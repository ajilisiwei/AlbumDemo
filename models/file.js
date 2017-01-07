/**
 * Created by WEI on 2017/1/6.
 */
let fs=require('fs');
let dateformat=require('silly-datetime');
let path=require('path');

exports.getAllDir=function(callback){
    let path='./upload/';
    getFilesOrDirs(path,false,callback);
};

exports.getAllImgs=function(albumname,callback){
    let path='./upload/'+albumname+'/';
    getFilesOrDirs(path,true,callback);
};

exports.upLoadImg=function(err, fields, files,callback){
    let oldpath=files.tupian.path;
    let filename=dateformat.format(new Date(), 'YYYYMMDDHHmmss')+'_'+files.tupian.name;
    let albumname=fields.albumname;
    let newpath=path.normalize(__dirname + "/../upload/")+albumname+'/'+filename;
    fs.rename(oldpath,newpath,function (err) {
        if (err){
            callback('上传图片出错!');
        }
        callback(null);
        // fs.unlink(oldpath,function (er) {
        //     console.log(er);
        //     if (er){
        //         callback('上传图片出错!');
        //         return;
        //     }
        //     callback(null);
        // });
    })
};

//获取所有的文件夹或者文件
function getFilesOrDirs(path,isFile,callback) {
    fs.readdir(path,function (err,files) {
        if (err){
            callback("没有找到文件夹："+path,files);
            return;
        }
        let resultArray=[];
        (function iterator(i) {
            if (i==files.length){
                callback(null,resultArray);
                return;
            }
            fs.stat(path+files[i],function (err,stats) {
                if (err){
                    callback('没有找到文件：'+files[i],null);
                    return;
                }
                if (isFile){
                    if (stats.isFile()){
                        resultArray.push(files[i]);
                    }
                }else {
                    if (stats.isDirectory()){
                        resultArray.push(files[i]);
                    }
                }
                iterator(i+1);
            });
        })(0);
    });
}

