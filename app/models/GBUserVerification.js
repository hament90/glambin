var mongoose = require('mongoose');
var hashAlgo = require('sha256');
var Schema = mongoose.Schema;
var GBUserVerificationSchema =new mongoose.Schema({
	_id:{type:String,required:true,unique:true,sparse:true,index:true},
	verificationType: {type: String},
	verificationCode: {type: String},
    signUserId:{type: String,unique:true,index:true},
    securitySalt:{type: String},
    createdOn: { type: Date, required: true,default:Date.now },
    expiresOn: { type:  Date , required: true,default:Date.now },
    type:{type:String},// social,web,mobile,
    gbId:{type:String,unique:true,sparse:true,index:true},
    KeyProcess:{type:String},//this will tell the user how the verification code has to be enter while verification
    name:{type:String},
    isUser:{type:String},// for connect purpose, isActiveUser,Pending Verification
    triedBefore:{type:Number,default:3}
});
GBUserVerificationSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

GBUserVerificationModel = mongoose.model('GBUserVerification', GBUserVerificationSchema,'GBUserVerification');
module.exports = GBUserVerificationModel;