var Controller = require(_gb_path_cntlr+'/main/mainController');
var searchService= require(_gb_path_service+"/search/searchService.js");
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var STATUS = _gb_constant._gb_status;

var searchController = new Controller();
searchController.searchUsers = function() {
    var _nself = this;
    if (!_nself.req.isAuthenticated())
        return _nself.res.redirect("/gb/404");

    var searchSvc = new searchService();
    searchSvc.on("done", function(status,msg,result,page){
        console.log(result)
        _nself.processJson(status,msg,result,page);
    });
    searchSvc.searchPeople(_nself.req.query);   
};

module.exports=searchController;