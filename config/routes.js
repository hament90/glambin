// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var passport = require('passport');

module.exports = function routes() {

  	this.match("/gb/404",{controller:'home/home', action:'error', via:'GET'})
  // this.root('pages#main');

//Register New User Url 
  	this.match("/gb/register-user",{controller:"registration/registration",action:"signUp",via:"POST"})
/**
	Login Call starts 
**/
	this.match('/gb/login',
		passport.authenticate('local', { successRedirect: '/gb/register-general-form',
	                                   failureRedirect: '/'}), { via: 'post' }
	);

	this.match("/gb/logout",{controller:"home/srvc/homeService",action:"logout",via:"GET"})
/**
	Login Call ends
**/
 
 //Register New User Verification Url 
  this.match("/gb/user-verify/"+_gb_constant.USER_STATUS.PENDING_VERFICATION+"/:id",{controller:"registration/registration",action:"verification",via:"GET"})
  
// setting pages url
  this.match("/gb/settings",{controller:"home/home",action:"settings",via:"GET"})
  this.match("/gb/forgot-password",{controller:"home/home",action:"forgotPassword",via:"GET"})

  this.match("/gb/reset-password",{controller:"home/srvc/homeService",action:"resetPassword",via:"post"})


//search call
  this.match("/gb/search/search-user",{controller:"search/search",action:"searchUsers",via:"post"})


// Registeration form Url for user UI pages
	this.match('/gb/register-general-form', 'registration/www/registerationView#generalForm', { via: 'get' });

	this.match("/gb/register-basicinfo-form",{controller:"registration/www/registerationView",action:"shortGeneralForm",via:"GET"})
	this.match("/gb/register-achivements-form",{controller:"registration/www/registerationView",action:"achivements",via:"GET"})
	// this.match("/gb/register-configuration-form",{controller:"registration/www/registerationView",action:"configuration",via:"GET"})
	this.match("/gb/register-connection-form",{controller:"registration/www/registerationView",action:"connection",via:"GET"})
	this.match("/gb/register-explore-form",{controller:"registration/www/registerationView",action:"explore",via:"GET"})
	this.match("/gb/register-interests-form",{controller:"registration/www/registerationView",action:"interests",via:"GET"})
	this.match("/gb/register-media-form",{controller:"registration/www/registerationView",action:"media",via:"GET"})
	this.match("/gb/register-professional-form",{controller:"registration/www/registerationView",action:"professional",via:"GET"})
	this.match("/gb/register-education-form",{controller:"registration/www/registerationView",action:"education",via:"GET"})
	this.match("/gb/register-uploadpic-form",{controller:"registration/www/registerationView",action:"uploadImg",via:"GET"})
 
// Registeration form Url for user CRUD operations
	this.match("/gb/srvc/save-general-register",{controller:"registration/srvc/registrationService",action:"saveGeneralForm",via:"POST"});
	this.match("/gb/srvc/save-handle",{controller:"registration/srvc/registrationService",action:"saveHandle",via:"POST"});
	this.match("/gb/srvc/upload-profile-pic",{controller:"registration/srvc/registrationService",action:"saveProfilePic",via:"POST"});
	this.match("/gb/srvc/upload-header-pic",{controller:"registration/srvc/registrationService",action:"saveHeaderPic",via:"POST"});
	this.match("/gb/srvc/upload-gallery",{controller:"registration/srvc/registrationService",action:"saveGallery",via:"POST"});
	this.match("/gb/srvc/save-urls",{controller:"registration/srvc/registrationService",action:"saveConnectionUrls",via:"POST"});
	this.match("/gb/srvc/save-media",{controller:"registration/srvc/registrationService",action:"saveEntertainment",via:"POST"});
	this.match("/gb/srvc/save-journey",{controller:"registration/srvc/registrationService",action:"saveJourney",via:"POST"});
	this.match("/gb/srvc/save-upload-achivements",{controller:"registration/srvc/registrationService",action:"saveAchivements",via:"POST"});
	this.match("/gb/srvc/save-work",{controller:"registration/srvc/registrationService",action:"saveWorkLoad",via:"POST"});
	this.match("/gb/srvc/save-educate",{controller:"registration/srvc/registrationService",action:"saveEducation",via:"POST"});
	this.match("/gb/srvc/save-category/:id/:cid",{controller:"registration/srvc/registrationService",action:"saveInterest",via:"POST"});
	
	this.match("/gb/srvc/remove-work/:id/:pid",{controller:"registration/srvc/registrationService",action:"removeWorkLoad",via:"POST"});
	this.match("/gb/srvc/remove-education/:id/:eid",{controller:"registration/srvc/registrationService",action:"removeEducation",via:"POST"});


// Profile Landing page 
	this.match("/profile/:id",{controller: 'gbprofile/profile', action:'main', via:'GET'});

// Profile Landing Services calls 
	this.match("/profile-connect/:id",{controller: 'gbprofile/srvc/profileSrvc', action:'connect', via:'post'});
	this.match("/user-srvc/list-users",{controller: 'gbprofile/srvc/profileSrvc', action:'loadProfilesForListing', via:'post'});

//profile Settings service Calls
	this.match("/user-srvc/profile-publish",{controller: 'gbprofile/srvc/profileSrvc', action:'publishUser', via:'post'});
	this.match("/user-srvc/make-searchable",{controller: 'gbprofile/srvc/profileSrvc', action:'searchable', via:'post'});
	this.match("/user-srvc/connect-notification",{controller: 'gbprofile/srvc/profileSrvc', action:'userConnectNotification', via:'post'});
	this.match("/user-srvc/view-complete",{controller: 'gbprofile/srvc/profileSrvc', action:'showFullViewProfile', via:'post'});
	this.match("/user-srvc/share-contacts",{controller: 'gbprofile/srvc/profileSrvc', action:'shareContacts', via:'post'});
	this.match("/user-srvc/recieve-contacts-info",{controller: 'gbprofile/srvc/profileSrvc', action:'recieveShareContactsInformation', via:'post'});
	this.match("/user-srvc/message-limit",{controller: 'gbprofile/srvc/profileSrvc', action:'messageLimit', via:'post'});
	this.match("/user-srvc/skip-registration",{controller: 'gbprofile/srvc/profileSrvc', action:'skipRegistration', via:'post'});
	this.match("/user-srvc/load-settings",{controller: 'gbprofile/srvc/profileSrvc', action:'loadUserSettings', via:'post'});
	

//Home page controller
	this.match("/", "home/home#main",{via:"get"});
 	this.root({controller: 'home/home', action:'main', via:'GET'});
}
