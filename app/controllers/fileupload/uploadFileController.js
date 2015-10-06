var Controller = require(_gb_path_cntlr+'/main/mainController');
var uploadService = require(_gb_path_service+'/upload/fileUpload.js');

var fileUploadController = new Controller();

fileUploadController.mainProfile = function() {
	var _nself=this;
    if (_nself.req.isAuthenticated() && _nself.req.files!=undefined && Object.keys(_nself.req.files).length>0 ){
        var obj={
            file:_nself.req.files.file,
            gbId:_nself.req.user.signUserId
        };
        var service= new uploadService();
        service.on("done", function(status,msg,result,page){
             console.log(result)
            _nself.processJson(status,msg,result,page);
        });
        service.profilePicUploading(obj);
    }else{
         return _nself.res.redirect("/gb/404");
    }
}

fileUploadController.uploadCover=function(){
    var _nself=this;
    if (_nself.req.isAuthenticated() && _nself.req.files!=undefined && Object.keys(_nself.req.files).length>0 ){
        var obj={
            file:_nself.req.files.file,
            gbId:_nself.req.user.signUserId
        };
        var service= new uploadService();
        service.on("done", function(status,msg,result,page){
             console.log(result)
            _nself.processJson(status,msg,result,page);
        });
        service.profilePicUploading(obj);
    }else{
         return _nself.res.redirect("/gb/404");
    }
}

fileUploadController.uploadGallery=function(){

}

module.exports = fileUploadController;