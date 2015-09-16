var Controller = require(_gb_path_cntlr+'/main/mainController');
var UserRegisterSvc = require(_gb_path_service+'/userRegistration/UserRegisterService.js');
var registrationSrvcController = new Controller();

registrationSrvcController.saveGeneralForm=function () {
	var _nself = this;
  	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/gb/404");

    var value=_nself.req.body;
    console.log(value)
    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveGeneralFrom(value);
}

registrationSrvcController.saveHandle=function () {
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/gb/404");

    var value=_nself.req.body;
    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveHandleData(value);
}

registrationSrvcController.saveProfilePic=function(){
    var _nself = this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveProfilePicture(_nself.req.params);      
}

registrationSrvcController.saveHeaderPic=function(){
    var _nself = this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveHeaderPicture(_nself.req.params);      
}

registrationSrvcController.saveGallery=function(){
    var _nself = this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveGalleryPictures(_nself.req.params);      
}

registrationSrvcController.saveConnectionUrls=function () {
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/gb/404");

    var value=_nself.req.body;
    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
    	console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveUrlConnections(value);
}

registrationSrvcController.saveEntertainment=function () {
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/gb/404");

    var value=_nself.req.body;
    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
    	console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveEntertainmentUrls(value);
}

registrationSrvcController.saveJourney=function () {
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/gb/404");

    var value=_nself.req.body;
    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
    	console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveLifeJourney(value);
}

registrationSrvcController.saveAchivements=function(){
	var _nself = this;
	if (!_nself.req.isAuthenticated())
  		return _nself.res.redirect("/gb/404");

    var dataModel={
    	value:_nself.req.body,
    	file:_nself.req.files
    }
     var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
    	console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveGlory(dataModel);
}

registrationSrvcController.saveWorkLoad=function(){
	var _nself = this;
	// if (!_nself.req.isAuthenticated())
 //  		return _nself.res.redirect("/gb/404");
    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
    	console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveProfessionalism(_nself.req.body);	
    
}

registrationSrvcController.saveEducation=function(){
    var _nself = this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveEducation(_nself.req.body);   
}

registrationSrvcController.saveInterest=function(){
    var _nself = this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.saveCategory(_nself.req.params);      
}

registrationSrvcController.removeWorkLoad=function(){
    var _nself = this;
    console.log(_nself.req.params)
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.removeCompany(_nself.req.params);      
}

registrationSrvcController.removeEducation=function(){
    var _nself = this;
    console.log(_nself.req.params)
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.removeEducationPool(_nself.req.params);      
}
registrationSrvcController.removeGlory=function(){
    var _nself = this;
    console.log(_nself.req.params)
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var registerSvc = new UserRegisterSvc();
    registerSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.removeAchievements(_nself.req.params);      
}


module.exports=registrationSrvcController;