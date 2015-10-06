var Controller = require(_gb_path_cntlr+'/main/mainController');
var RegisterSvc = require(_gb_path_service+'/userRegistration/UserRegisterService.js');
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var STATUS = _gb_constant._gb_status;

var RegViewController = new Controller();

RegViewController.generalForm = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");
    
    _nself.render("registration/basic_info"); 
}

RegViewController.shortGeneralForm = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");

    var userRegisterSvc = new RegisterSvc();
    
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            _nself.render("partials/registration/basic_reg",result); 
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchGeneralFrom(_nself.req.user.gbId)    
}

RegViewController.connection = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");

    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            _nself.render("partials/registration/connection",result); 
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchConnectionFrom(_nself.req.user.gbId)
}
RegViewController.media = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");

    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            _nself.render("partials/registration/media",result); 
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchMediaForm(_nself.req.user.gbId)
}

RegViewController.explore = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");

    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            // console.log(result)
            _nself.render("partials/registration/explore",result); 
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchLifeJourney(_nself.req.user.gbId)
}

RegViewController.achivements = function() {
  var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");

    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            // console.log(result)
            _nself.render("partials/registration/achivements",result); 
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchAchivements(_nself.req.user.gbId)
}

RegViewController.professional = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");
    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            _nself.render("partials/registration/professional",result); 
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchExperience(_nself.req.user.gbId);
}

RegViewController.education = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");
    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            // console.log(result)
            _nself.render("partials/registration/education",result); 
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchEducation(_nself.req.user.gbId);
}
// RegViewController.configuration = function() {
//     var _nself=this;
//     if (!_nself.req.isAuthenticated())
//         return _nself.res.redirect("/");
//   this.render("partials/registration/configuration");
// }


RegViewController.interests = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");
    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            // console.log(result)
            _nself.render("partials/registration/interests",result);
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchCategory(_nself.req.user.gbId);
}


RegViewController.uploadImg = function() {
    var _nself=this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/");
    var userRegisterSvc = new RegisterSvc();
    userRegisterSvc.on("done", function(code,msg,result,errValue){
        if(code==STATUS.SUCCESS.stats){
            _nself.title = "General Registration Form";
            // console.log(result)
            _nself.render("partials/registration/upload_img",result);
        }else{
            _nself.res.redirect("/gb/404"); 
        }
    });
    userRegisterSvc.fetchImages(_nself.req.user.gbId);
}

module.exports = RegViewController;
