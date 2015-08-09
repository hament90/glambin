var Controller = require(_gb_path_cntlr+'/main/mainController');
var rootService= require(_gb_path_service+"/root/RootService.js");
// var passport= require("passport");
var homeSrvcController = new Controller();


// homeSrvcController.successlogin =function() {
//     var _nself = this;
//     var value=_nself.req;
    
//     var rootSvc = new rootService();
//     rootSvc.on("done", function(status,msg,result,page){
//         _nself.processJson(status,msg,result,page);
//     });
//     rootSvc.AuthenticationMechanism(value);
// }

homeSrvcController.resetPassword=function(){
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/gb/404");

    var value=_nself.req.body;
    var settingSvc = new rootService();
    settingSvc.on("done", function(status,msg,result,page){
        _nself.processJson(status,msg,result,page);
    });
    settingSvc.setNewPassword(value);
}

homeSrvcController.logout=function(){
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/");

	_nself.req.logout();
	_nself.res.redirect('/');
}

module.exports = homeSrvcController;