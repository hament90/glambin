var Controller = require(_gb_path_cntlr+'/main/mainController');
var profileService = require(_gb_path_service+'/profile/profileLanding.js');
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var STATUS = _gb_constant._gb_status;
var VERIFICATION_STATUS=_gb_constant.VERIFICATION_STATUS;

var profileController = new Controller();

profileController.connect = function() {
	var _nself=this;
	var obj={
		connectId:_nself.req.params.id,
		gbId:_nself.req.body.xUser
	};
	if (!_nself.req.isAuthenticated()){
  		 obj.isUser=VERIFICATION_STATUS.CONNECT;
	}else if(_nself.req.isAuthenticated()){
		obj.isUser=VERIFICATION_STATUS.ACTIVE;
	}

	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.connectify(obj);
}

profileController.publishUser=function() {
	var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

  	var obj={
		gbId:_nself.req.user.gbId,
		bool:  _nself.req.body.isActive
  	};
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });

    service.publishUserAccount(obj);
}

profileController.searchable=function() {
	var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

  	var obj={
		gbId:_nself.req.user.gbId,
		bool:_nself.req.body.isSearchable
  	};	
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.makeProfileSearchable(obj);
}

profileController.userConnectNotification=function() {
		var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");
  	
  	var obj={
		gbId:_nself.req.user.gbId,
		time:_nself.req.body.time
  	};	
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.connectNotification(obj);
};

profileController.showFullViewProfile=function() {
		var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");
	
	var obj={
		gbId:_nself.req.user.gbId,
		bool:_nself.req.body.isView
  	};	
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.profilePreviewLimit(obj);
}


profileController.shareContacts=function() {
		var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

  	var obj={
		gbId:_nself.req.user.gbId,
		bool:_nself.req.body.isShare
  	};	
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.shareContacts(obj);
}

profileController.recieveShareContactsInformation=function() {
		var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

  	var obj={
		gbId:_nself.req.user.gbId,
		bool:_nself.req.body.notification
  	};	
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.ShareContactsInformation(obj);
}

profileController.messageLimit=function() {
	var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

  	var obj={
		gbId:_nself.req.user.gbId,
		bool:_nself.req.body.limit
  	};
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.messageLimit(obj);
}

profileController.skipRegistration=function () {
	var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

  	var obj={
		gbId:_nself.req.user.gbId,
		bool:_nself.req.body.doSkip
  	};
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.skipRegistrationOnlogin(obj);	
}

profileController.loadUserSettings=function () {
	var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.fetchUserSettings(_nself.req.user.gbId);
}

profileController.loadProfilesForListing=function () {
	var _nself=this;
	if (!_nself.req.isAuthenticated())
  		 return _nself.res.redirect("/gb/404");

	var obj={
		param:_nself.req.params,
		gbId:_nself.req.user.gbId	
	};
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		 console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    service.searchProfile(obj);
}

module.exports = profileController;