var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GBUserInfoSchema =new mongoose.Schema({
	id:{type:String,default:Schema.ObjectId},
	handle:{type: String,default:Schema.ObjectId},
    gbId:{type:String,required:true},
    emailId:{type:String},
    phone:{type:Number},
    signUserId:{type: String,unique:true,index:true},
    primaryId: { type: String },
    username: {type: String,required: true },
    birth: { type: Date },
    gender: { type: String },
    description: { type: String },
    shortDesc: {type: String },
    category:[{
        type:String       
    }],
    connectedBy:[{type: String}],
    connectedTo:[{type: String}],
    isPublished:{type: Boolean ,default:false},
    isSearchable:{type: Boolean ,default:false},
    connections:{
        google:String,
        yahoo:String,
        rediff:String,
        fb:String, 
        linkedin:String,
        twitter:String,
        tumblr:String,
        hotmail:String,
        skype:String,
        instagram:String,
        other:[{
            key:String,
            value:String
        }]
    },
    location: { 
        id:String, 
        area:String,
        addr:String,
        city:String,
        state:String,
        country:String,
        postal:String
    },
    explore: [{  
        heading: String,
        description:String   
    }],
    profilePic:{
        id: Schema.ObjectId,
        url:String,
        name:String,
        created:{ type: Date },
        cameFrom:String//Either gallery or direct upload
    },
    profileCoverPic:{
        id: Schema.ObjectId,
        url:String,
        name:String,
        created:{ type: Date },
        cameFrom:String//Either gallery or direct upload
    },
    achivements:[{
        title:String,
        description:String,
        date:{ type: Date },
        img:{
            url:String,
            name:String,
            date:String,
            extra:Schema.Types.Mixed
       },
       inspiredBy:[{
            id:String,
            emailId:String
       }]     
    }],
    education: [{
        _id:{type:String,default:Schema.ObjectId},
        code:String,
        institute:String,
        period:{
            startYear:Number,
            startMonth:Number,
            endYear:Number,
            endMonth:Number
        },
        course:String,
        level:Number,
        isPresent:Boolean,
        description:String
    }],
    experience: [{
        _id:{type:String,default:Schema.ObjectId},
        code:String,
        company:String,
        designation:String,
        jobType:String,
        jobDesc:String,
        isPresent:Boolean,
        location:String,
        start:{ type: Date, } ,
        end:{ type: Date},
        period:{
            year:Number,
            month:Number
        },
        projects:[{
            name:String,
            duration:{
                start:{ type: Date},
                end:{ type: Date}
            },
            url:String,
            code:String
        }]
    }],
    skills: [{
        name:String,
        tag:String
    }],
    media:{
        audio:[{ type: String }],
        video:[{ type: String }],
    },
    normalized: [{ type: String }],
    security: {   
        sharePic:{ type: Boolean,default:true},
        shareCoverPic:{ type: Boolean,default:true},
        shareGallery:{ type: Boolean,default:true},
        limitGallery:{ type: Number,default:5},
        shareMusic:{ type: Boolean,default:true},
        limitMusic:{ type: Number,default:5},
        shareVideo:{ type: Boolean,default:true},
        limitVideo:{ type: Number,default:5},
        shareContact:{ type: Boolean,default:true},
        shareEducation:{ type: Boolean,default:true},
        limitEducationLevel:{ type: Number,default:5},
        shareProfession:{ type: Boolean,default:true},
        limitProfession:{ type: Number,default:5},
        shareSkill:{ type: Boolean,default:true},
        shareMedia:{ type: Boolean,default:true},
        shareExplore:{ type: Boolean,default:true},
        limitExplore:{ type: Number,default:5},
        shareAchivements:{ type: Boolean,default:true},
        limitAchivement:{ type: Boolean,default:true},
        shareRecommendation:{ type: Boolean,default:true},
        isRecommendation:{ type: Boolean,default:true},
        isMessage:{ type: Boolean,default:true},
        limitMessageUser:{ type: Number,default:5}
    },
    createdOn: { type: Date, required: true,default:Date.now },
    modified: { type:  Date , required: true,default:Date.now },
});

// GBUserInfoSchema.virtual('birth').get(function () {
//     return this.birth.getDate() + '/' +(this.birth.getMonth() +1)+"/"+this.birth.getFullYear();
// });
GBUserInfoModel = mongoose.model('GBUserInfo', GBUserInfoSchema,'GBUserInfo');
module.exports = GBUserInfoModel;