var Controller = require(_gb_path_cntlr+'/main/mainController');
var profileService = require(_gb_path_service+'/profile/profileLanding.js');
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var STATUS = _gb_constant._gb_status;

var profileController = new Controller();

profileController.main = function() {
	var _nself=this;
	var service= new profileService();
	service.on("done", function(status,msg,result,page){
		if(status==STATUS.SUCCESS.stats){
			_nself.render("gbprofile/profile_landing",result);
		}else{
			_nself.render("home/error/page_error");
		}
    });
    service.getCompleteProfile(_nself.req.params);
}

module.exports = profileController;