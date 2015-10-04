var mainService = require(_gb_path_service+"/base/MainService.js");
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var mongoErr = require(_gb_path_util+'/mongo-error');
var MAIL_TYPE = _gb_constant.MAIL_TYPE;
var STATUS = _gb_constant._gb_status;
var GBUserInfoModel = require(_gb_path_model+"/GBUserInfo.js");
var mongoose = require('mongoose');
var path = require('path'),fs = require('fs');

function fileUpload(){    
	mainService.call(this);
	this.miliSec= new Date();
	this.pathFolder= "/uploades/"
	this.pathFolderProfile= "/profile/"
}

fileUpload.prototype.__proto__= mainService.prototype ;

fileUpload.prototype.checkUploadFileType = function(file) {
	
};
fileUpload.prototype.uploads = function(dataModel) {
	var _classInstance=this;
	if(dataModel.file!=undefined){

		var fileName = dataModel.file.originalFilename;

	    var randomnum = Math.floor((Math.random() * 100) + 1);
	    var newfilename = randomnum+fileName;
	    
	    var fileTargetPostion = _classInstance.pathFolder+dataModel.id+_classInstance.pathFolderProfile+newfilename;
	    
	    var tempPath = dataModel.file.path;
	    var targetPath = path.resolve(_gb_path_public+fileTargetPostion);
	    console.log("file Uploading=========================================================",targetPath, tempPath, dataModel.file,fileTargetPostion);
	    var res= null;
	    if (path.extname(fileName).toLowerCase() === '.png' ||path.extname(fileName).toLowerCase() === '.jpg' ||path.extname(fileName).toLowerCase() === '.gif') {
	        fs.rename(tempPath, targetPath, function(err) {
	            if (err){
	            	return res={
	            		status:STATUS.FILE_UPLOAD_FAILED.stats,
						error:err,
						errorWhere:"uploading"
	            	};
	            }else{
		            res= {
						status:STATUS.SUCCESS.stats,
						fileName: newfilename,
						filepath:fileTargetPostion
		            };
		            _classInstance.unlinkProfilePic(tempPath);
		            
	            } 
	        });
	    } 
	}
    console.log(res);
    return res;
};

fileUpload.prototype.unlinkProfilePic=function(url){
	var res={"success":false};
    if(url!=undefined && url!='') {
        fs.unlink(url, function (err) {
            if (err){
    	 		res.success=false;
				res.error=err;
				res.errorWhere="unlink";
            }else{
				res.success=true;
            }
			return res;
        });
    }else{ 
    	return res;
    }
}

fileUpload.prototype.profilePicUploading = function(dataModel) {
	var _ownObj=this;
	console.log(dataModel)
	var uploadResult=_ownObj.uploads(dataModel);
	if(uploadResult==null || uploadResult.status== undefined || uploadResult.status != STATUS.SUCCESS.stats ){
		_ownObj.emit("done",STATUS.FILE_UPLOAD_FAILED.stats,STATUS.FILE_UPLOAD_FAILED.msg,uploadResult.error,null);
		return false;
	}

	var fileObj={};
	if(uploadResult.filepath!=undefined &&uploadResult.filepath!=null ){
		fileObj.profilePic={
			url:uploadResult.filepath,
	        name:uploadResult.fileName,
	        cameFrom:_gb_constant.VERIFICATION_USER_REGISTER.WEB
		}
		GBUserInfoModel.findAndModify({"signUserId":dataModel.gbId},{},fileObj,{},function (err,user) {
			if(err){
				_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
			}else{
				if(user!=null){
					if(user.profilePic!=undefined && user.profilePic!=null && user.profilePic.url!=undefined){
						dataModel.unlink=user.profilePic.url;
					}
					_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
				}else{
					_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
				}
			}
		});
	}else{
		_ownObj.emit("done",STATUS.FILE_UPLOAD_FAILED.stats,STATUS.FILE_UPLOAD_FAILED.msg,null,null);
	}
};

module.exports=fileUpload;