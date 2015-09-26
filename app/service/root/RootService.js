var mainService = require(_gb_path_service+"/base/MainService.js");
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var mongoErr = require(_gb_path_util+'/mongo-error');
var VERIFICATION_TYPE = _gb_constant.VERIFICATION_TYPE;
var VERIFICATION_STATUS = _gb_constant.VERIFICATION_STATUS;
var STATUS = _gb_constant._gb_status;
var GBUserVerificationModel = require(_gb_path_model+"/GBUserVerification.js");
var mongoose = require('mongoose');
var hashAlgo = require("sha256");


function RootService(){    
	mainService.call(this);
}
RootService.prototype.__proto__=mainService.prototype ;

RootService.prototype.sendNewVerificationCode=function(credentials){
	var _ownObj = this;
	console.log(credentials);
	GBUserVerificationModel.findOne({"signUserId":credentials.signIn},{"name":1,"type":1,"_id":1},function(err,user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			if(user!=null){
				
				var newCode = _ownObj.getSixDigitCode();
				
				GBUserVerificationModel.update({"signUserId":credentials.signIn ,"isUser":VERIFICATION_STATUS.ACTIVE},{$set:{"verificationType":VERIFICATION_STATUS.FORGET_PASSWORD,"verificationCode":user._id+_ownObj.specialUrlChar+newCode},$unset:{"securitySalt":null}},function(err,isUpdate){
					if (err) {
						_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
					}else{
						if(isUpdate>0){
							if(!isNaN(credentials.signIn)){
								_ownObj.sendRealTimeOTP("Your new password is "+newCode+". Please login with this password and reset your new password from settings",credentials.signIn);
							}
							var obj={
								type:user.type,
								signIn:credentials.signIn							
							}
							_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,obj,null);
						}else{
							_ownObj.emit("done",STATUS.ALREADY_EXIST.stats,STATUS.ALREADY_EXIST.msg,null,null);		
						}
					}	
				});
			}else{
				_ownObj.emit("done",STATUS.ALREADY_EXIST.stats,STATUS.ALREADY_EXIST.msg,null,null);
			}
		}
	});
}

RootService.prototype.setNewPassword = function(credentials) {
	var _ownObj = this;
	console.log(credentials);
	GBUserVerificationModel.findOne({"signUserId":credentials.userId ,"securitySalt":hashAlgo.x2(credentials.oldPass),"isUser":VERIFICATION_STATUS.ACTIVE},{"name":1},function(err,user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log(user)
			if(user!=null){
				GBUserVerificationModel.update({"signUserId":credentials.userId ,"isUser":VERIFICATION_STATUS.ACTIVE},{$set:{"securitySalt":hashAlgo.x2(credentials.newPass)}},function(err,isUpdate){
					if (err) {
						_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
					}else{
						if(isUpdate>0){
							_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
							
						}else{
							_ownObj.emit("done",STATUS.ALREADY_EXIST.stats,STATUS.ALREADY_EXIST.msg,null,null);		
						}
					}	
				});
			}else{
				_ownObj.emit("done",STATUS.ALREADY_EXIST.stats,STATUS.ALREADY_EXIST.msg,null,null);
			}
		}
	});
};

RootService.prototype.resetForgotPassword = function(credentials) {
	var _ownObj = this;
	GBUserVerificationModel.update({"signUserId":credentials.signIn ,"verificationType":VERIFICATION_STATUS.FORGET_PASSWORD , "verificationCode":credentials.otpVal},{$set:{"securitySalt":hashAlgo.x2(credentials.password),"verificationType":VERIFICATION_STATUS.ACTIVE},function(err,isUpdate){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			if(isUpdate>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);		
			}
		}	
	});
};
module.exports= RootService;