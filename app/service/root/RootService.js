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
// RootService.prototype.AuthenticationMechanism = function(credentials) {
// 	var _ownObj = this;
// 	console.log(credentials);
// 	_ownObj.emit("done",null,null,null,null);
// };

RootService.prototype.sendNewVerificationCode=function(credentials){
	
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
module.exports= RootService;