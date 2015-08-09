var Controller = require(_gb_path_cntlr+'/main/mainController');
var commonValidator = require(_gb_path_util+"/commonValidator");
var registrationService= require(_gb_path_service+"/RegisterService.js");

var userRegistrationController = new Controller();
userRegistrationController.signUp = function() {
    var _nself = this;
    var value=_nself.req.body;
    var myvalidator = new commonValidator(_nself.req);
    if(isNaN(value.emailId)){
        var validateEmail = ["required","isEmail"];
        myvalidator.validate("id",validateEmail,value.emailId);    
        
    }
    var registerSvc = new registrationService();
    registerSvc.on("done", function(status,msg,result,page){
        _nself.processJson(status,msg,result,page);
    });

    if(myvalidator.getErrors().length==0){
        
        registerSvc.registerUser(value);
    }else{

    }
};

userRegistrationController.verification=function(){
    var _nself = this;
    var registerSvc = new registrationService();
    registerSvc.on("done", function(status,msg,result,page){
        _nself.processJson(status,msg,result,page);
    });
    registerSvc.verifyUser(_nself.req.params);
}

module.exports=userRegistrationController;