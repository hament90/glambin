var GBCONSTANT = require(_gb_path_util+'/GBENUM');
var GBEventEmitter = require('events').EventEmitter;
var mongodb = require('mongodb');
var sms = require(_gb_path_util+'/smsutils');

MainService.prototype.__proto__= GBEventEmitter.prototype ;
function MainService(){
   this.specialUrlChar='@_@_@_@';
}
MainService.prototype.processPagenation=function(result,page){
	if(result != null && result.length > page.pageSize){
		page.hasMore=true;
		result.pop();
	}else{
		page.hasMore=false;
	}
}
MainService.prototype.getCustomMongoId = function(prefix) {
	var ObjectId = mongodb.ObjectID;
	if(prefix!=undefined && prefix!='')
		return prefix+new ObjectId();
	else
		return new ObjectId();
};
MainService.prototype.getSixDigitCode=function(){
	return Math.floor(Math.random() * (Math.floor(Math.random() * 700000) + 100000)) + 100000;
}
MainService.prototype.getToday=function(){
		return new Date().toISOString();
}
MainService.prototype.getNextDate=function(date){
	if(date!=undefined)
		return new Date(new Date().setDate(date.getDate()+1)).toISOString();
	else
		return new Date(new Date().setDate(new Date().getDate()+1)).toISOString();
}
MainService.prototype.getTodayAfterMinutes=function(min){
	return new Date(new Date().setTime(new Date().getTime()+min*60000)).toISOString();
}
MainService.prototype.getRealTimeForUI=function(date){
	var dt= new Date(date);
	return dt.getDate()+"/"+(dt.getMonth()+1)+"/"+dt.getFullYear();
}

MainService.prototype.sendRealTimeOTP=function(message,destination){
	var sendOTP= new sms();
	return sendOTP.sendSms(message,destination);
}
MainService.prototype.getVerificationCode=function(code){

	if(code !=undefined){
		if(code.indexOf(this.specialUrlChar)>-1){
			var split= code.split(this.specialUrlChar);
			return split[1];	
		}
	}else{
		return null;
	}
}
MainService.prototype.getVerificationUserIdCode=function(code){

	if(code !=undefined){
		if(code.indexOf(this.specialUrlChar)>-1){
			var split= code.split(this.specialUrlChar);
			return split[0];	
		}
	}else{
		return null;
	}
}
MainService.prototype.saveForNotification = function(first_argument) {
	// body...
};

module.exports = MainService;