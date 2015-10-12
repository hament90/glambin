var express = require('express'),
    poweredBy = require('connect-powered-by'),
    passport=require('passport');
module.exports = function() {
    // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
    // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
    // middleware available as separate modules.
    console.log(this.env);
    if ('development' == this.env) {
        this.use(express.logger());
    }

    this.use(poweredBy('Locomotive'));
    this.use(express.favicon());
    this.use(express.static(__dirname + '/../../public'));
    this.use(express.timeout(8000))
    this.use(express.bodyParser());
    this.use(express.cookieParser());
    this.use(express.methodOverride());
    this.use(express.session({ secret: '123sdnvc%%$$' }));
    this.use(passport.initialize());
    this.use(passport.session());
    this.use(function(req,res,next){
        res.locals.session = req.session;
        res.locals.user = req.user;
        next();
    });

    this.get('*', function(req, res, next){ 
        res.setHeader('Last-Modified', (new Date()).toUTCString());
        next(); 
    });
//   console.log(Object.keys(this),"===============",Object.keys(express));
  //  console.log(this.__router);
    // express.post('/gb/srvc/*', function(req, res, next){ 
    //     console.log(req.files)
    //     next(); 
    // });
    // this.use(function(req, res,next){
    //     console.log("================================")
    //     multer({ dest: './uploads/',
    //         rename: function (fieldname, filename) {
    //             return filename+Date.now();
    //         },
    //         onFileUploadStart: function (file) {
    //             console.log(file.originalname + ' is starting ...')
    //         },
    //         onFileUploadComplete: function (file) {
    //             console.log(file.fieldname + ' uploaded to  ' + file.path)
    //             next();
    //         },
    //         onError:function () {
    //             console.log(file.fieldname + ' failed uploaded to  ' + file.path)
    //             next();
    //         }
    //     });
    // });
  this.use(this.router);
  this.use(express.errorHandler());
}
