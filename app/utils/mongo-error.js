/***********************************************************************
*
* DESCRIPTION :
*      Property file for constant data
*  
* Copyright :
*		Aranoah Technologies Pvt Ltd 2014.  All rights reserved.
* 
* AUTHOR :    
*		Puneet (puneet@aranoah.com)      
*
* START DATE :    
*		11 Nov 2014
*
* CHANGES :
*
**/
var mongoErr = {
	"11000":{stats:400,msg:"Not able to insert duplicate values to the database"} ,
 	"12515":{stats:400,msg:"Not able to remove or update"} ,
 	"13074":{stats:400,msg:"Database name can not be empty"} ,
 	"17399":{stats:400,msg:"Collection already exists"} ,
 	"10011":{stats:400,msg:"No collection name found"} ,
 	"13328":{stats:500,msg:"Connection falied"} ,
 	"13071":{stats:400,msg:"Invalid hostname"} ,
 	"10333":{stats:400,msg:"Invalid field name"},
 	identifyError : function(errstats){
 		if(this[errstats]){
 			return this[errstats]
 		} else {
 			return {stats:400,msg:"Mongo Error"};
 		}
 	}
}

module.exports=mongoErr;