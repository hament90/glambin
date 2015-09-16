var mainService = require(_gb_path_service+"/base/MainService.js");
var _gb_constant = require(_gb_path_util+'/GBENUM.js');
var STATUS = _gb_constant._gb_status;
var mongoErr = require(_gb_path_util+'/mongo-error');
var mongoose = require('mongoose');
var GBUserInfoModel = require(_gb_path_model+"/GBUserInfo.js");

function UserRegisterService(){    
	mainService.call(this);
}
UserRegisterService.prototype.__proto__=mainService.prototype ;

UserRegisterService.prototype.fetchGeneralFrom=function  (username) {
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"phone":1,"primaryId":1,"birth":1,"gender":1,"location":1,"shortDesc":1,"description":1,"handle":1,"username":1,"emailId":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user.birth!=null)
				user.birth=_ownObj.getRealTimeForUI(user.birth);
			console.log(user)
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,user,null);
		}
	});
};

UserRegisterService.prototype.fetchConnectionFrom=function(username){
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"connections":1,"username":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var connections={
				connectionInfo:user.connections,
				gbId:user.gbId
			};
			console.log(connections)
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,connections,null);
		}
	});	
}

UserRegisterService.prototype.fetchMediaForm=function(username){
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"media":1,"username":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var media={
				entertain:user.media,
				gbId:user.gbId
			};
			console.log(media)
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,media,null);
		}
	});		
}

UserRegisterService.prototype.fetchLifeJourney=function(username){
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"explore":1,"username":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var explore={
				blog:user.explore,
				gbId:user.gbId
			};
			console.log(explore)
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,explore,null);
		}
	});
}

UserRegisterService.prototype.fetchAchivements=function(username){
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"achivements":1,"username":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var achivements={
				achieve:user.achivements,
				gbId:user.gbId
			};
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,achivements,null);
		}
	});
}

UserRegisterService.prototype.fetchExperience=function(username){
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"experience":1,"username":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var experience={
				profession:user.experience,
				gbId:user.gbId
			};
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,experience,null);
		}
	});	
}

UserRegisterService.prototype.fetchEducation=function(username){
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"education":1,"username":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var experience={
				education:user.education,
				gbId:user.gbId
			};
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,experience,null);
		}
	});	
}

UserRegisterService.prototype.fetchCategory = function(username) {
	var _ownObj = this;
	GBUserInfoModel.findOne({ "gbId": username },
		{"gbId":1,"category":1,"username":1}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			var experience={
				category:user.category,
				gbId:user.gbId
			};
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,experience,null);
		}
	});		
};

UserRegisterService.prototype.saveGeneralFrom=function(dataModel){
	var _ownObj = this;
	var locality={
        addr:dataModel.street,
		area:dataModel.area,
        city:dataModel.city,
        state:dataModel.state,
        country:dataModel.country,
        postal:dataModel.postal
	}
	var update={
		username: dataModel.userName,
		birth:dataModel.birth,
		gender:dataModel.gender,
		shortDesc:dataModel.shortDesc,
		description:dataModel.description,
		location:locality
	};
	if(dataModel.primaryId=='string'){
		update.phone=dataModel.phone;
	}else if(dataModel.primaryId=='numeric'){
		update.emailId=dataModel.emailId;
	}else{
		_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
	}
	GBUserInfoModel.findOneAndUpdate({ "gbId": dataModel.id }, { $set: update}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			
		}
	});	
};

UserRegisterService.prototype.saveHandleData=function(dataModel){
	var _ownObj = this;
	GBUserInfoModel.update({ "gbId": dataModel.id }, { $set: {"handle":dataModel.handle}}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
			
		}
	});
};

UserRegisterService.prototype.saveProfilePicture=function(dataModel){
	var _ownObj = this;
	_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
};

UserRegisterService.prototype.saveHeaderPicture=function(dataModel){
	var _ownObj = this;
	_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
};

UserRegisterService.prototype.saveGalleryPictures=function(dataModel){
	var _ownObj = this;
	_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
};



UserRegisterService.prototype.saveUrlConnections=function(dataModel){
	var _ownObj = this;
	var urls={
		google:dataModel.google,
        yahoo:dataModel.yahoo,
        rediff:dataModel.rediff,
        fb:dataModel.fb, 
        linkedin:dataModel.linkedin,
        twitter:dataModel.twitter,
        tumblr:dataModel.tumblr,
        hotmail:dataModel.hotmail,
        skype:dataModel.skype,
        instagram:dataModel.instagram
	};
	console.log(dataModel)
	GBUserInfoModel.update({ "gbId": dataModel.id }, { $set: {"connections":urls}}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
			
		}
	});
}

UserRegisterService.prototype.saveEntertainmentUrls = function(dataModel) {
	var _ownObj = this;
	console.log(dataModel);
	var data={
		video:dataModel.video,
		audio:dataModel.audio
	};
	GBUserInfoModel.update({ "gbId": dataModel.id }, { $set: {"media":data}}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
		}
	});	
	// _ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,dataModel,null);
};

UserRegisterService.prototype.saveLifeJourney=function(dataModel){
	var _ownObj = this;
	var explore=[];
	//if(dataModel.heading.length==dataModel.description.length){
		for (var i = 0; i < dataModel.heading.length; i++) {
			var obj={
				heading:dataModel.heading[i],
				description:dataModel.description[i],
			};
			explore.push(obj);
		};
	//}
	GBUserInfoModel.update({ "gbId": dataModel.id }, { $set: {"explore":explore}}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			console.log(user)
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
		}
	});
}
UserRegisterService.prototype.saveGlory=function (dataModel) {
	var _ownObj = this;
	console.log(dataModel)
	var achivements={
		date:_ownObj.getRealTimeForUI(dataModel.value.date),	
		title:dataModel.value.title,
		description:dataModel.value.description
	};
	// if(dataModel.value.title!=undefined && dataModel.value.title!=null){
	// 	//for (var i = 0; i < dataModel.value.title.length; i++) {
	// 		var achObj={
	// 			date:_ownObj.getRealTimeForUI(dataModel.value.date[i]),	
	// 			title:dataModel.value.title[i],
	// 			description:dataModel.value.description[i]
	// 		};
	// 		//achivements.push(achObj);
	// 	//}//;
	// }

	GBUserInfoModel.update({ "gbId": dataModel.value.id }, { $push: {"achivements":achivements}}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			console.log(user)
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
		}
	});
}

UserRegisterService.prototype.saveProfessionalism=function(dataModel){
	var _ownObj = this;
	console.log(dataModel)
	var totalTime={
    	year:dataModel.start,
    	month:dataModel.end
    };
	var experience={
		_id:_ownObj.getCustomMongoId(),
        company:dataModel.company,
        designation:dataModel.designation,
        jobType:dataModel.jobType,
        jobDesc:dataModel.jobDesc,
        location:dataModel.location,
        period:totalTime
	};
    // projects:[{
    //     name:String,
    //     duration:{
    //         start:{ type: Date},
    //         end:{ type: Date}
    //     },
    //     url:String,
    //     code:String
    // }]
	if(dataModel.isPresent=="on"){
        experience.isPresent=true;
	}else if(dataModel.isPresent=="off"){
		experience.isPresent=false;
	} else{
		_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
	}

	if(dataModel.pid!=null && dataModel.pid!=undefined && (dataModel.pid.trim()!='')){
		var findObj={ "gbId": dataModel.id.trim(),"experience._id":dataModel.pid };
		var updateObj={
			"experience.$.company":dataModel.company,
			"experience.$.jobDesc":dataModel.jobDesc,
			"experience.$.jobType":dataModel.jobType,
			"experience.$.designation":dataModel.designation,
			"experience.$.isPresent":dataModel.isPresent,
			"experience.$.location":dataModel.location,
			"experience.$.period":totalTime,
		};
		console.log("#@$%^#@$%^#@$%^#@$%^#@$%^#@$%^#@$%^#@$%^#@$%^#@$%^",findObj,updateObj);
		GBUserInfoModel.update(findObj, { $set: updateObj}, function(err, user){
			if (err) {
				_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
			} else{
				console.log(user)
				if(user>0)
					_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
				else
					_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
			}
		});
	}else{
		GBUserInfoModel.update({ "gbId": dataModel.id.trim() }, { $push: {"experience":experience}}, function(err, user){
			if (err) {
				_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
			} else{
				console.log(user)
				if(user>0)
					_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,experience._id,null);
				else
					_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
			}
		});
		
	}
}

UserRegisterService.prototype.saveEducation=function(dataModel){
	var _ownObj = this;
	console.log(dataModel)
	var totalTime={
    	startYear:dataModel.startYear,
    	startMonth:dataModel.startMonth,
    	endYear:dataModel.endYear,
    	endMonth:dataModel.endMonth
    };
	var education={
		_id:_ownObj.getCustomMongoId(),
        institute:dataModel.institute,
        period:totalTime,
        course:dataModel.course,
        isPresent:dataModel.isPresent,
        description:dataModel.description
	};
 
	GBUserInfoModel.update({ "gbId": dataModel.id }, { $push: {"education":education}}, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			console.log(user)
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,education._id,null);	
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
		}
	});
}

UserRegisterService.prototype.saveCategory = function(dataModel) {
	var _ownObj = this;

	GBUserInfoModel.findOne({ "gbId": dataModel.id.trim(),"category":dataModel.cid }, {"category":1,"username":1,"gbId":1 }, function(err, user){
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			if(user!=null && user.category!=null && user.category.length>0){
				GBUserInfoModel.update({ "gbId": dataModel.id.trim() }, {$pull:{"category":dataModel.cid} }, function(err, updtUser){
					if (err) {
						_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
					} else{
						if(updtUser>0)
							_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,"removed",null);	
						else
							_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
					}
				});			
			}else{
				GBUserInfoModel.update({ "gbId": dataModel.id.trim() }, {$addToSet:{"category":dataModel.cid} }, function(err, updtUser){
					if (err) {
						_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
					} else{
						if(updtUser>0)
							_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,"added",null);	
						else
							_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
					}
				});			
			}
		}
	});
};

UserRegisterService.prototype.removeCompany = function(dataModel) {
	var _ownObj = this;
	GBUserInfoModel.update({ "gbId": dataModel.id},{$pull:{"experience":{"_id":dataModel.pid}}},function(err,user) {
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			console.log(user)
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
		}
	});
};

UserRegisterService.prototype.removeEducationPool = function(dataModel) {
	var _ownObj = this;
	GBUserInfoModel.update({ "gbId": dataModel.id},{$pull:{"education":{"_id":dataModel.eid}}},function(err,user) {
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			console.log(user)
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
		}
	});
};

UserRegisterService.prototype.removeAchievements = function(dataModel) {
	var _ownObj = this;
	GBUserInfoModel.update({ "gbId": dataModel.id},{$pull:{"achivements":{"_id":dataModel.aid}}},function(err,user) {
		if (err) {
			_ownObj.emit("done",mongoErr.identifyError(err.code).stats,err,null,null);
		} else{
			console.log(user)
			if(user>0)
				_ownObj.emit("done",STATUS.SUCCESS.stats,STATUS.SUCCESS.msg,null,null);
			else
				_ownObj.emit("done",STATUS.DATA_ERROR.stats,STATUS.DATA_ERROR.msg,null,null);
		}
	});
};


module.exports = UserRegisterService;