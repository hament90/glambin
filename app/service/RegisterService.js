var mainService = require(_gb_path_service+"/base/MainService.js");
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var mongoErr = require(_gb_path_util+'/mongo-error');
var MAIL_TYPE = _gb_constant.MAIL_TYPE;
var VERIFICATION_TYPE = _gb_constant.VERIFICATION_TYPE;
var STATUS = _gb_constant._gb_status;
var defPage = _gb_constant.def_page;
var GBUserVerificationModel = require(_gb_path_model+"/GBUserVerification.js");
var GBUserInfoModel = require(_gb_path_model+"/GBUserInfo.js");
var mongoose = require('mongoose');
var hashAlgo = require("sha256");
// var emailTemplates = require('email-templates');
//future purpose
//var properties = require(_gb_path_env+"/properties.js");

function RegisterService(){    
	mainService.call(this);
	this.miliSec= new Date();
}
RegisterService.prototype.__proto__=mainService.prototype ;

RegisterService.prototype.getSixDigitCode=function(num){
	var code= Math.floor(Math.random() * num) + 987456321;
	return (code+"").substring(2,8);
};
RegisterService.prototype.registerUser = function(dataModel) {
	var _ownObj = this;
	console.log("In verification First Step",dataModel);

	var id = _ownObj.getCustomMongoId("gbverfication-");
	var sec=_ownObj.miliSec.getTime();
	
	GBUserVerificationModel.findOne({"signUserId":dataModel.emailId},{"name":1},function(err,user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user==null){
				var verificationData = new GBUserVerificationModel({
					"_id":id,
					"gbId":"gb-"+dataModel.emailId,
					"name":dataModel.name,
					"signUserId":dataModel.emailId,
					"securitySalt":hashAlgo.x2(dataModel.password),
					"type":(isNaN(dataModel.emailId)?_gb_constant.VERIFICATION_USER_REGISTER.WEB:_gb_constant.VERIFICATION_USER_REGISTER.MOBILE),
					"verificationType":_gb_constant.USER_STATUS.PENDING_VERFICATION ,
					"verificationCode":id+_ownObj.specialUrlChar+(isNaN(dataModel.emailId)?(sec):_ownObj.getSixDigitCode(dataModel.emailId)) ,
					"isUser":_gb_constant.VERIFICATION_STATUS.PENDING,
					"expiresOn":(isNaN(dataModel.emailId)?_ownObj.getNextDate():_ownObj.getTodayAfterMinutes(15)),
					"triedBefore":(isNaN(dataModel.emailId)?1:3)
				});
				verificationData.save(function(err, verificationData) {
					if (err) {
						_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
					} else{
						console.log("====================================================================================","http://localhost:3000/gb/user-verify/"+verificationData.verificationType+"/"+verificationData.verificationCode,"====================================================================================")
						if(!isNaN(dataModel.emailId)){
							_ownObj.sendRealTimeOTP("Your Registration Code is "+ _ownObj.getVerificationCode(verificationData.verificationCode),dataModel.emailId);
						}
						var responseObj=null;
						if(verificationData.type==_gb_constant.VERIFICATION_USER_REGISTER.MOBILE){
							responseObj={
								type:verificationData.type,
								userCode:_ownObj.getVerificationUserIdCode(verificationData.verificationCode)+_ownObj.specialUrlChar,
								emailId:dataModel.emailId
							}
						}
						_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,responseObj,null);
					}
				});			
			}else{
				_ownObj.emit("done",STATUS.ALREADY_EXIST.stats,STATUS.ALREADY_EXIST.msg,null,null);
			}
		}
	});
	
};

RegisterService.prototype.verifyUser=function (verifyObj) {
	var _ownObj = this;
	var cd_crrctn= verifyObj.id.split(_ownObj.specialUrlChar);
	if(cd_crrctn.length>0 ){
		console.log("check-object-verification",verifyObj,{
				_id:cd_crrctn[0],
				verificationCode:verifyObj.id,
				verificationType:_gb_constant.USER_STATUS.PENDING_VERFICATION ,
				triedBefore:{$gt:0},
				expiresOn:{$gt:_ownObj.getToday()},
				createdOn:{$lt:_ownObj.getToday()}
			});
		
		GBUserVerificationModel.findOneAndUpdate(
			{
				_id:cd_crrctn[0],
				verificationCode:verifyObj.id,
				verificationType:_gb_constant.USER_STATUS.PENDING_VERFICATION ,
				triedBefore:{$gt:0},
				expiresOn:{$gt:_ownObj.getToday()},
				createdOn:{$lt:_ownObj.getToday()}
			},
			{	
				$set:{	
					verificationType:_gb_constant.USER_STATUS.VERIFIED,
					isUser:_gb_constant.VERIFICATION_STATUS.ACTIVE
				},
				$unset:{
					verificationCode:null,
					expiresOn:null,
				},
				$inc:{
					triedBefore:-1
				}
			},
			function(err,data){
				if( err){
					console.error("Error while verifiying data from server. Error :- ",err!=null?(mongoErr.resolveError(err.code).code):err +","+(err!=null?(mongoErr.resolveError(err.code).msg):err))
				} else {
					console.log("verify-user",data)
					if(data!=null){
						var infoData = new GBUserInfoModel({
							"gbId":data.gbId,
							"username":data.name,
							"auth.emailId":data.signUserId,
							"auth.password":	{
								"key":data.securitySalt,
								"algo":"SHA-256"
							},
							"primaryId":(isNaN(data.signUserId)?"string":"numeric"),
							"phone":(isNaN(data.signUserId)?0:parseInt(data.signUserId,10)),
							"emailId":(isNaN(data.signUserId)?data.signUserId:null),
							"handle":data.gbId
						});
						infoData.save(function(err, userInfo) {
							if (err) {
								_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
							} else{
								console.log(userInfo)
								_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
							}
						});
					}else{
						console.error(verifyObj.id+"is not found in database or someone try to test or hack the system. ");
						_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
					}
				}
		});
	}else{	
		_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
	}
}


module.exports=RegisterService;