var Controller = require(_gb_path_cntlr+'/main/mainController');
var path = require('path'),
    fs = require('fs');

var fileUploadController = new Controller();

fileUploadController.main = function(req,res) {
	if (this.req.isAuthenticated()){
        var fileName=this.req.files.file.originalFilename;
        var fileTargetPostion='/uploades/'this.req.body.id+"/profile/"+newfilename;
        var __self=this;
        var randomnum=Math.floor((Math.random() * 100) + 1);
        var newfilename=randomnum+fileName;
        var tempPath = this.req.files.file.path,
            targetPath = path.resolve('./public'+fileTargetPostion);
        if (path.extname(fileName).toLowerCase() === '.png' ||path.extname(fileName).toLowerCase() === '.jpg' ||path.extname(fileName).toLowerCase() === '.gif') {
            fs.rename(tempPath, targetPath, function(err) {
                if (err) throw err;
                var rs=JSON.stringify({
                  status:"success",
                  fileName:newfilename,
                  filepath:'/uploades/'+newfilename
                });
                __self.res.writeHead(200, { 'Content-Type': 'application/json'});
                __self.res.write(rs);
                __self.res.end();
            });
        } else {
            fs.unlink(tempPath, function (err) {
                if (err) throw err;
                console.error("Only .png files are allowed!");
                __self.res.writeHead(200, { 'Content-Type': 'application/json'});
                 var rs=JSON.stringify({
                  'status':'error',
                  'message':'file format is not supported only .png and .jpg files are acceptable'
                 });
                __self.res.write(rs);
                __self.res.end();
                
            });
        }
    }else{

    }
}

module.exports = fileUploadController;