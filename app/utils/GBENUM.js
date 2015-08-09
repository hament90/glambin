var EventEmitter = require('events').EventEmitter;
function GBN_ENUM(){    
  // this.HIM_STORE="123";
}

var USER_STATUS={
    VERIFIED:"verified",
    PENDING_VERFICATION:"pending-verification",
    SUSPENDED:"suspended"
};
var VERIFICATION_STATUS={
    ACTIVE:"confirmed-user",
    PENDING:"pending-verification-user",
    CONNECT:"connect-user",
    SUSPENDED:"suspended"
};

var VERIFICATION_USER_REGISTER={
    MOBILE:"mobile",
    WEB:"web",
    SOCIAL:"social"
};
var VERIFICATION_TYPE={
    ACCOUNT:"account-register",
    PHONE:"phone-no" ,
    PASSWORD:"password"
};

var STATUS={
    USER_ERROR:{stats:400,msg:"Client Error"} ,
    BACKEND_ERROR:{stats:500,msg:"Server Error"} ,
    SUCCESS:{stats:0,msg:"Ok"} ,
    CONFLICT:{stats:1,msg:"Error"} ,
    NOTUPDATED:{stats:22,msg:"Not Updated"},
    RESTRICTED : {stats:403,msg:"Not Allowed"},
    UNAUTHORISE : {stats:401,msg:"Not Authenticated"},
    MAIL_SUCCESS :{stats:0,msg:"A mail has been sent to your account.Please check your mails"},
    DATA_ERROR :{stats:115,msg:"Your request can not be handled due to processing of invalid request"},
    PASSWORD_ERROR :{stats:125,msg:"Please check your password"},
    ALREADY_EXIST :{stats:130,msg:"Already in use"},
};
var MAIL_TYPE={
    INVITATION:"invitation",
    REGISTER:"register" ,
    LEAD:"lead",
    VERIFICATION:"verification",
    PROJECT_DETAILS:"project-details",
    USER_DETAILS:"user-details",
    CLAIM_PROFILE:"claim-profile",
    FORGET_PASSWORD :"forget-password"
};
var MONGO_STATUS={
    USER_ERROR:{stats:400,msg:"Client Error"} ,
    BACKEND_ERROR:{stats:500,msg:"Server Error"} ,
    SUCCESS:{stats:0,msg:"Ok"} ,
    NOTUPDATED:{stats:22,msg:"Not Updated"} 
    
};
var PAGE = {
  start:0,
  pageLimit:20
}

GBN_ENUM.prototype.callPage = function (start,pageLimit){
	var indxPage=0;
	var maxPageLimit = 10;
	if(start != null && typeof(start) !="undefined"){
		indxPage = Number(start);
	}
	if(pageLimit != null && typeof(pageLimit) !="undefined"){
		maxPageLimit = Number(pageLimit);
	}
    var page ={start:indxPage,pageLimit:maxPageLimit,hasMore:false};
    return page;
}
GBN_ENUM.prototype.applyPagination=function(q,page){
    if(page==null || typeof(page) == "undefined"){
       page = this.defaultPage();
    } else if(page.start==null || typeof(page.start) == "undefined" || page.pageLimit==null || typeof(page.pageLimit) == "undefined"){
       page = this.defaultPage();
    }
    q.skip(page.start).limit(page.pageLimit+1);
    return page;
}

GBN_ENUM.prototype.processResult=function(result,page){
  console.log(page);
    var hasMore = false;
    if(result.length>page.pageLimit){
      hasMore=true;
      page.hasMore = true;
      result.splice(result.length-2,1);
    }
    return hasMore;
};

GBN_ENUM.prototype.processPageResultJson=function(result,page){
  console.log("processPageResultJson",result,result.length,page);
    page.hasMore = false;
    if(result.length>page.pageLimit){
      page.hasMore = true;
      result.splice(result.length-2,1);
    }
    return page;
};
GBN_ENUM.prototype.executor=function(obj,func){
    return new GBEmitEvent(obj,func);
}
function GBEmitEvent(obj,func){
   EventEmitter.call(this);
   this.refObj = obj[func];
}
GBEmitEvent.prototype.__proto__ = EventEmitter.prototype;
GBEmitEvent.prototype.constructor = GBEmitEvent;
GBEmitEvent.prototype.exec=function(){
   var args=[];
   for(var i=0;i<arguments.length;i++){
      args[i] = arguments[i];
   }
   args[arguments.length]=this;
   this.refObj.apply(null,args);
}
exports.GBN_ENUM = new GBN_ENUM();
exports.VERIFICATION_STATUS=VERIFICATION_STATUS;
exports.VERIFICATION_USER_REGISTER=VERIFICATION_USER_REGISTER;
exports._gb_status = STATUS;
exports.MAIL_TYPE = MAIL_TYPE;
exports.VERIFICATION_TYPE = VERIFICATION_TYPE;
exports.USER_STATUS =USER_STATUS;

exports.def_page = PAGE;