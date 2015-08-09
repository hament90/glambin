var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GBUserConnectSchema = new mongoose.Schema({
	id:{type:String,default:Schema.ObjectId},
	gbId:{type:String,required:true},
	users: [{  
        id:{type:String,default:Schema.ObjectId},
        gbUid: String,
        date:Date,
        isUser:String,
        purpose:String // connect or else
    }]
});

GBUserConnectModel = mongoose.model('GBUserConnect', GBUserConnectSchema,'GBUserConnect');
module.exports = GBUserConnectModel;