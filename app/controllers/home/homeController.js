var Controller = require(_gb_path_cntlr+'/main/mainController');
// var profileLanding = require(_gb_path_service+'/profile/profileLanding.js');
var homeController = new Controller();

homeController.main = function() {
	if (this.req.isAuthenticated()){
		console.log(this.req)
  		this.render("home/homelanding");
		
	}else{
  		this.render("main");
	}
}

homeController.error = function() {
	this.render("home/error/page_error");
}

homeController.settings=function(){
	if (this.req.isAuthenticated()){
		this.render("pages/settings");	
	}else{
		this.render("home/error/page_error");
	}	
}
homeController.forgotPassword=function () {
	this.render("home/forgot_Password");
}
module.exports = homeController;
