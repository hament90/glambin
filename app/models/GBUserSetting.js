var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GBUserSettingSchema =new mongoose.Schema({
	id:{type:String,default:Schema.ObjectId},
	gbId:{type:String},
	connectMessage:{type:String},
	completeProfileView:{type:Boolean},
	shareContact:{type:Boolean},
	messageLimit:{type:Number},
	skipRegistration:{type:Boolean},
	notification:{type:Boolean}
});
GBUserSettingModel = mongoose.model('GBUserSetting', GBUserSettingSchema,'GBUserSetting');
module.exports = GBUserSettingModel;