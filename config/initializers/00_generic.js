module.exports = function() {
  // Any files in this directory will be `require()`'ed when the application
  // starts, and the exported function will be invoked with a `this` context of
  // the application itself.  Initializers are used to connect to databases and
  // message queues, and configure sub-systems such as authentication.

  // Async initializers are declared by exporting `function(done) { /*...*/ }`.
  // `done` is a callback which must be invoked when the initializer is
  // finished.  Initializers are invoked sequentially, ensuring that the
  // previous one has completed before the next one executes.

	global._gb_path_app =  __dirname +"/../../app/" ;
	global._gb_path_util =  __dirname +"/../../app/utils" ;
	global._gb_path_cntlr =  __dirname +"/../../app/controllers" ;
	global._gb_path_service =  __dirname +"/../../app/service" ;
	global._gb_path_model =  __dirname +"/../../app/models" ;
	global._gb_path_template =  __dirname +"/../../app/templates" ;
	global._gb_path_env =  __dirname +"/../environments" ;
	global._gb_path_initializers =  __dirname;
	global._gb_app_context = {};
}
