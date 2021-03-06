var Controller = require(_gb_path_cntlr+'/main/mainController');
var profileService = require(_gb_path_service+'/RegisterService.js');
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var STATUS = _gb_constant._gb_status;
var homeController = new Controller();

homeController.main = function() {
	if (this.req.isAuthenticated()){
  		this.render("home/homelanding");
	}else{
  		this.render("main");
	}
}

homeController.error = function() {
	this.render("home/error/page_error");
}

homeController.contactUs = function() {
	this.render("home/contactus");
}

homeController.settings=function(){
	if (this.req.isAuthenticated()){
		this.render("pages/settings");	
	}else{
		this.render("home/error/page_error");
	}	
}
homeController.forgotPassword=function () {
	var _nself=this;
	var results={id:null};
	if(_nself.req.query!=undefined && _nself.req.query.signIn!=undefined && _nself.req.query.signIn!=''){
		var service= new profileService();
		service.on("done", function(status,msg,result,page){
			results=result;
			if(status==STATUS.SUCCESS.stats){
				_nself.render("home/forgot_password",results);
			}else{
				_nself.render("home/error/page_error");
			}
	    });
	    service.fetchShortBio(_nself.req.query.signIn);

	}else{
		_nself.render("home/forgot_password",results);
	}
}


module.exports = homeController;
