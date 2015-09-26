var mainService = require(_gb_path_service+"/base/MainService.js");
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var STATUS = _gb_constant._gb_status;
var mongoErr = require(_gb_path_util+'/mongo-error');
var mongoose = require('mongoose');
var GBUserInfoModel = require(_gb_path_model+"/GBUserInfo.js");
var GBUserConnectModel = require(_gb_path_model+"/GBUserConnect.js");
var GBUserSettingModel = require(_gb_path_model+"/GBUserSetting.js");
var VERIFICATION_STATUS=_gb_constant.VERIFICATION_STATUS;


function ProfileServiceController(){    
	mainService.call(this);
}
ProfileServiceController.prototype.__proto__=mainService.prototype ;

ProfileServiceController.prototype.getCompleteProfile=function(userId){
	var _ownObj=this;
	console.log(userId)	
	GBUserInfoModel.findOne({ "handle": userId.id }, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user!=null){
				console.log(user)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,user,null);
			}else{
				_ownObj.emit("done",STATUS.USER_ERROR.stats,STATUS.USER_ERROR.msg,user,null);
			}
		}
	});
}

ProfileServiceController.prototype.getShortProfileInfo=function(userId){
	var _ownObj=this;
	console.log(userId)	
	GBUserInfoModel.findOne({ "handle": userId.id }, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user!=null){
				console.log(user)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,user,null);
			}else{
				_ownObj.emit("done",STATUS.USER_ERROR.stats,STATUS.USER_ERROR.msg,user,null);
			}
		}
	});
}

ProfileServiceController.prototype.verifyConnectification = function(dataModel) {
	// body...
	var _ownObj=this;
	GBUserConnectModel.findOneAndUpdate({"gbId":dataModel.connectId,"users.gbUid":dataModel.gbId,"users.$.verificationCode":dataModel.code},{$unset:{"users.$.verificationCode":null},$set:{"users.$.isUser":VERIFICATION_STATUS.ACTIVE}},function(err,fuser){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			GBUserInfoModel.update({"gbId":dataModel.connectId},{$addToSet:{"connectedBy":dataModel.gbId}},function (err,updateCount) {
				if (err) {
					_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
				} else{
					_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
				}
			});
		}
	});	
	
	// GBUserInfoModel.update({"gbId":dataModel.connectId},{$addToSet:{"connectedBy":dataModel.gbId}},function (err,updateCount) {
	// 	if (err) {
	// 		_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
	// 	} else{
	// 		GBUserInfoModel.update({"gbId":dataModel.gbId},{$addToSet:{"connectedTo": dataModel.connectId}},function (err,updateCount) {
	// 			if (err) {
	// 				_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
	// 			} else{
	// 				if(updateCount>0){
	// 					result.measure="portal user";
	// 				}else{
	// 					result.measure="unauthorised user";
	// 				}
	// 				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,result,null);
	// 			}
	// 		});
	// 	}
	// });


};

ProfileServiceController.prototype.connectify = function(dataModel) {
	// body...
	var _ownObj=this;
	var pushObj={
		gbUid: dataModel.gbId,
        date:_ownObj.getToday(),
        isUser:dataModel.isUser,
        purpose:"connect" // connect or else
	};
	if(dataModel.isUser==VERIFICATION_STATUS.CONNECT){
		GBUserInfoModel.findOne({"signUserId":dataModel.gbId},{"gbId":1,'name':1,"signUserId":1},function (err,result) {
			if (err) {
				_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
			} else{
				if(result!=null){
					pushObj.gbUid=result.gbId;
					dataModel.isUser=VERIFICATION_STATUS.ACTIVE;
				}else{
					pushObj.verificationCode = _ownObj.getSixDigitCode();
					console.log(pushObj.verificationCode, "GB Connect ======  Apply By ======", dataModel.gbId,' For =======',dataModel.connectId);
				}
			}
		});
	}

	// check Whether the loggedin or unauthoriesed user already connected to that profile user or not
	GBUserConnectModel.findOne({"gbId":dataModel.connectId,"users.gbUid":dataModel.gbId},{"gbId":1},function(err,fuser){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var result={};
			if(fuser==null){
				result.check="new";
				result.type=(isNaN(dataModel.gbId)?_gb_constant.VERIFICATION_USER_REGISTER.WEB:_gb_constant.VERIFICATION_USER_REGISTER.MOBILE);
				//	User does not exist in his system so make an entry GBUSERCONNECT Model for profile User served by loggedin or unauthoriesed user 
				GBUserConnectModel.findOneAndUpdate({"gbId":dataModel.connectId},{$push:{"users":pushObj}},{upsert:true},function(err,user){
					if (err) {
						_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
					} else{
						if(pushObj.verificationCode!=undefined){
							result.condition="otp";
							result.connectId=dataModel.gbId;
							if(result.type==_gb_constant.VERIFICATION_USER_REGISTER.MOBILE){
								_ownObj.sendRealTimeOTP("Please enter this code "+pushObj.verificationCode+" in order to verify your identity", dataModel.gbId);	
							}
						}else{
							result.condition="maintained";
							GBUserInfoModel.update({"gbId":dataModel.connectId},{$addToSet:{"connectedBy":dataModel.gbId}},function (err,updateCount) {
								if (err) {
									_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
								} else{
									GBUserInfoModel.update({"gbId":dataModel.gbId},{$addToSet:{"connectedTo": dataModel.connectId}},function (err,updateCount) {
										if (err) {
											_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
										} else{
											_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,result,null);
										}
									});
								}
							});
						}
						_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,result,null);
						
					}	
				});
			}else{
				result.check="existing";
				_ownObj.emit("done",STATUS.ALREADY_EXIST.stats,STATUS.ALREADY_EXIST.msg,result,null);
			}	
		}
	});	

};

ProfileServiceController.prototype.publishUserAccount = function(dataModel) {
	var _ownObj=this;
	GBUserInfoModel.update({"gbId":dataModel.gbId},{$set:{"isPublished":dataModel.bool}},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user);
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}

		}
	});
};

ProfileServiceController.prototype.makeProfileSearchable = function(dataModel) {
	var _ownObj=this;
	GBUserInfoModel.update({"gbId":dataModel.gbId},{$set:{"isSearchable":dataModel.bool}},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user)
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}
		}
	});
};

ProfileServiceController.prototype.connectNotification = function(dataModel) {
	var _ownObj=this;
	GBUserSettingModel.update({"gbId":dataModel.gbId},{$set:{"connectMessage":dataModel.time}},{upsert:true},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user)
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}
		}
	});
};


ProfileServiceController.prototype.profilePreviewLimit = function(dataModel) {
	var _ownObj=this;
	GBUserSettingModel.update({"gbId":dataModel.gbId},{$set:{"completeProfileView":dataModel.bool}},{upsert:true},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user)
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}
		}
	});
};

ProfileServiceController.prototype.ShareContactsInformation = function(dataModel) {
	var _ownObj=this;
	GBUserSettingModel.update({"gbId":dataModel.gbId},{$set:{"notification":dataModel.bool}},{upsert:true},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user)
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}
		}
	});
};

ProfileServiceController.prototype.shareContacts = function(dataModel) {
	var _ownObj=this;
	GBUserSettingModel.update({"gbId":dataModel.gbId},{$set:{"shareContact":dataModel.bool}},{upsert:true},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user)
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}
		}
	});
};

ProfileServiceController.prototype.messageLimit = function(dataModel) {
	var _ownObj=this;
	GBUserSettingModel.update({"gbId":dataModel.gbId},{$set:{"messageLimit":dataModel.bool}},{upsert:true},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user)
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}
		}
	});
};

ProfileServiceController.prototype.skipRegistrationOnlogin = function(dataModel) {
	var _ownObj=this;
	GBUserSettingModel.update({"gbId":dataModel.gbId},{$set:{"skipRegistration":dataModel.bool}},{upsert:true},function(err,user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			console.log("============================",user)
			if(user>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			}
		}
	});	
};
ProfileServiceController.prototype.searchProfile = function(dataModel) {
	var _ownObj=this;
	var query={ "isPublished": true,"isSearchable":true };
	
	if(dataModel.param.name!=null || dataModel.param.name!=undefined)
		query.username={$text:{$search:dataModel.param.name}};
	
	// if(dataModel.param.page!=null ||dataModel.param.page!=undefined)
	// 	query.
	
	var model=GBUserInfoModel.find(query);
	model.select("handle gbId username shortDesc location profilePic profileCoverPic phone emailId experience category");
	model.exec(function(err, user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,user,null);
		}
	});
	
	//model.limit("")
	//GBUserInfoModel.find(query,{"handle":1,"gbId":1,"username":1,"shortDesc":1,"location":1,"profilePic":1,"profileCoverPic":1,"phone":1,"emailId":1}, function(err, user){});	
};
ProfileServiceController.prototype.fetchUserSettings = function(userId) {
	var _ownObj=this;
	GBUserInfoModel.findOne({ "gbId": userId },{"isPublished":1,"isSearchable":1,"gbId":1}, function(err, user){
		if(err){
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			if(user!=null){
				GBUserSettingModel.findOne({ "gbId": userId }, function(err, userSetting){
					if(err){
						_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
					}else{
						var settingResult={
							setting:userSetting,
						};
						settingResult.isPublished=user.isPublished;
						settingResult.isSearchable=user.isSearchable;
						if(userSetting==null){
							settingResult.gbId=user.gbId;
						}
						_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,settingResult,null);
					}
				});	
			}else{
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);	
			}

		}
	});
};

module.exports=ProfileServiceController;