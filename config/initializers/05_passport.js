/***********************************************************************
*
* DESCRIPTION :
*      Passport related configurations . It will be used for authorization and authentication
*  
**/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var GBUserVerification = require(_gb_path_model+'/GBUserVerification.js');
var GBUserInfo = require(_gb_path_model+'/GBUserInfo.js');
var STATUS=_gb_constant._gb_status;
// Use the LocalStrategy within Passport.
var hashAlgo = require("sha256");
passport.use(new LocalStrategy({
   usernameField: 'signUserId',
    passwordField: 'password'
},
  function(username, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure.  Otherwise, return the authenticated `user`.
    var collection = mongoose.getCollection('GBUserVerification');
    var hashPassword = hashAlgo.x2(password);
    console.log("LocalStrategy",password)
    collection.findOne({ "signUserId": username },{"signUserId":1,"gbId":1,"name":1,"securitySalt":1}, function(err, user) {
      if (err) { return done(err); }
        console.log(user,"login Call",hashPassword)
      if (!user) {
        return done(null, false,{"message":"Failure"});
      }
      var userObj={
        user:user.name,
        userName:user.signUserId
      };
      console.log(userObj,(user.securitySalt==hashPassword))
      if(user.securitySalt==hashPassword){
        userObj.msg="You have successfully verified";
        userObj.code=STATUS.SUCCESS.stats;
      }else{
        userObj.msg=STATUS.PASSWORD_ERROR.msg;
        userObj.code=STATUS.PASSWORD_ERROR.stats;
        return done(null, false,{"message":"Failure"});
      }
      console.log(userObj,"status Call")
      return done(null,user);  
    });
  }
));

// Passport session setup.

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log("login",id)
  GBUserVerification.findById(id, function (err, user) {
    if(user!=null){
      GBUserInfo.findOne({"gbId":user.gbId},{"handle":1,"gbId":1,"username":1,"shortDesc":1,"location":1,"profilePic":1,"profileCoverPic":1,"phone":1,"emailId":1,"signUserId":1},function(err,newUser){
        console.log(newUser)
        done(err, newUser);  
      });
    }else{
      done(err, user);
    }
  });
});