var locomotive = require('locomotive')
var gb_Constants = require(_gb_path_util+'/GBENUM');  
var STATUS = gb_Constants._gb_status;

function MainController(autoHandleValidation){
    locomotive.Controller.call(this);
    var _autoHandleValidation = autoHandleValidation||false;
    this.herrors = null;
    this.before('*', function(next) {
      var methodName = "validate_"+this.__action;
      if(this[methodName]){
        if(!this[methodName]()){
            if(this._autoHandleValidation){

              this.handleValidationErr();
              return ;
            }
        }
      }
      next();
   });
};

MainController.baseRealPath = "../../";
MainController.prototype.__proto__=  locomotive.Controller.prototype;
MainController.prototype.constructor = MainController;

MainController.prototype.addHError = function(key,msg){
    if(this.herrors==null){
        this.herrors =new Array();
    }
    this.herrors.push({field:key,msg:msg});
}

MainController.prototype.handleValidationErr = function(isUi){ 
    if(this.herrors==null)
        return false;
    if(!isUi)
      this.processJson(STATUS.USER_ERROR.stats,STATUS.USER_ERROR.msg,this.herrors,null);
    else{
       this.render("pages/error");   
    }
    return true;
};

MainController.prototype.processJson=function(status,msg,result,page){
    this.res.json({"status":status,"message":msg,"result":result,"page":page});   
};
MainController.prototype.processTableJson=function(status,msg,result,total){
    this.res.json({"status":status,"message":msg,"records":result,"total":total});   
};
// MainController.prototype.getCurrentUser=function(_nself){
//   var irxId = "";
//   if(_nself.req.session['X-CS-Auth']){
//     if(_nself.req.session['X-CS-Auth'].user){
//       irxId =_nself.req.session['X-CS-Auth'].user.irxId;
//     }
//   }
//   return irxId;
// };
// MainController.prototype.getCurrentUserInfo=function(_nself){
//   var user = "";
//   if(_nself.req.session['X-CS-Auth']){
//     if(_nself.req.session['X-CS-Auth'].user){
//       user =_nself.req.session['X-CS-Auth'].user;
//     }
//   }
//   return user;
// };
module.exports = MainController;