var mainService = require(_gb_path_service+"/base/MainService.js");
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var mongoErr = require(_gb_path_util+'/mongo-error');
var MAIL_TYPE = _gb_constant.MAIL_TYPE;
var VERIFICATION_TYPE = _gb_constant.VERIFICATION_TYPE;
var STATUS = _gb_constant._gb_status;
var defPage = _gb_constant.def_page;
var GBUserInfoModel = require(_gb_path_model+"/GBUserInfo.js");
var mongoose = require('mongoose');

function searchService(){    
	mainService.call(this);
	this.miliSec= new Date();
}
searchService.prototype.__proto__=mainService.prototype ;

searchService.prototype.searchPeople=function(data){
	var _ownObj = this;

	GBUserInfoModel.find({"isPublished": true,"isSearchable":true,"username":{"$text":{"$search":data.name}}},function(err,user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		}else{
			if(user!=null && user.length>0){
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,user,defPage);
			}else{
				_ownObj.emit("done",STATUS.ALREADY_EXIST.stats,STATUS.ALREADY_EXIST.msg,null,null);
			}
		}
	});
}

module.exports=searchService;