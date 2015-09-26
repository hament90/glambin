var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GBUserConnectSchema = new mongoose.Schema({
	id:{type:String,default:Schema.ObjectId},
	gbId:{type:String,required:true},//  Id of profile user you are visiting and to whom you want to connect.
	users: [{  // user who visit his page and want to connects with him.
        id:{type:String,default:Schema.ObjectId},
        gbUid: String,
        date:Date,
        isUser:String,
        purpose:String, // connect or else,
        verificationCode:String // if OTP comes up for unauthorised person.
    }]
});

GBUserConnectModel = mongoose.model('GBUserConnect', GBUserConnectSchema,'GBUserConnect');
module.exports = GBUserConnectModel;