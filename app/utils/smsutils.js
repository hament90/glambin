var http = require('http');
var properties = require(_gb_path_env+'/properties');

function SMS_UTILS(){

}
SMS_UTILS.prototype.sendSms=function(smsMessage,to){
    console.log("send sms")
    
    var callback = function(response) {
      console.log("callback")
      var str = ''
      response.on('data', function (chunk) {
       console.log("chunk",chunk)
       str += chunk;
      });

       response.on('end', function () {
         console.log("end",str);
       });
   
    };
   

    var message ="username=" + properties.gb_sms_username
            + "&password=" + properties.gb_sms_password + "&to="+to
            + "&text="+encodeURIComponent(smsMessage)
            + "&from=" + properties.gb_sms_senderId +"&dlr-mask=19&udh=";
    var options = {
      host: properties.gb_sms_host,
      path: properties.gb_sms_path+message,
      method:properties.gb_sms_req_type,
      port:properties.gb_sms_port
    };

    try{
      console.log("try block",options)
     // console.log(properties.gb_sms_host+properties.gb_sms_path+message)
      var req = http.request(options, callback).on('error',function(e){
        console.log("Error: "+ "\n" + e.message); 
        console.log( e.stack );
      });

 /*var req = http.get(properties.gb_sms_host+properties.gb_sms_path+message, callback).on('error',function(e){
        console.log("Error: "+ "\n" + e.message);
        console.log( e.stack );
      });*/
     
      //This is the data we are posting, it needs to be a string or a buffer
   //  req.write(message);
      req.end();
      }catch (e){
        console.log("catch block",to,encodeURIComponent(smsMessage),e)
       // console.log(e)
      }
}
module.exports =  SMS_UTILS ;

