var Controller = require(_gb_path_cntlr+'/main/mainController');
var rootService= require(_gb_path_service+"/root/RootService.js");
var homeSrvcController = new Controller();


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

homeSrvcController.forgotPassword=function(){
    var _nself = this;
    if (!_nself.req.isAuthenticated()){
        var value=_nself.req.body;
        var settingSvc = new rootService();
        settingSvc.on("done", function(status,msg,result,page){
        	
            _nself.processJson(status,msg,result,page);
        });
        settingSvc.sendNewVerificationCode(value);

    }else{
        return _nself.res.redirect("/gb/404");
    }
}

homeSrvcController.logout=function(){
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/");

	_nself.req.logout();
	_nself.res.redirect('/');
}

homeSrvcController.setNewForgotPassword=function(){
    var _nself = this;
    if (!_nself.req.isAuthenticated()){
        var value=_nself.req.body;
        var settingSvc = new rootService();
        settingSvc.on("done", function(status,msg,result,page){
            _nself.processJson(status,msg,result,page);
        });
        settingSvc.resetForgotPassword(value);

    }else{
        return _nself.res.redirect("/gb/404");
    } 
}

module.exports = homeSrvcController;