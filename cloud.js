/*
 this commonJS module expose a wrapper for calling ACS functions and have a 
 centralized control over the process.
 
 the cloudify function show a popup with an activity indicator and a lable,
 query the web service and manage the result
 
 a call look like this snippet
 
 var Cloud = require("lib/cloud");
 Cloud.cloudify(userCreate); 
 
 where cloudify is the module main function and userCreate the business logic function
 
  	function userCreate( callback) {
		var Cloud = require('ti.cloud');
		Cloud.Users.create({
			email : <fill with your form value>,
			first_name : <fill with your form value>,
			last_name : <fill with your form value>,
			password : <fill with your form value>,
			password_confirmation : <fill with your form value>
		}, function(e) {

			callback();

			if (e.success) {

				// do something


			} else {
				alert('Error:\n' + ((e.error && e.message) ));

			}

		});
	}

 the result is to reduce the amount of code and debugging time and you could concentrate
 just on the app business logic
 
 * */

exports.cloudify = function(f) {
	
	Ti.API.info("cloudify");
	
	if (!Titanium.Network.online) {
		alert(L("noconnectionapp"));
		return;
	}	
	
	// this is trivial but is for testing
	var windowEnabled = true;

	var global = require("lib/environment");

	var popup = Titanium.UI.createWindow({
		height : "100%",
		width : "100%",
		backgroundColor : "black",
		opacity : 0.8
	});
	popup.zIndex = 50;

	if (global.ANDROID) {
		popup.modal = true;
		popup.fullscreen = true;
	}

	var activityIndicator = Ti.UI.createActivityIndicator({
		color : 'white',
		font : {
			fontFamily : 'Helvetica Neue',
			fontSize : 26,
			fontWeight : 'bold'
		},
		message : L("loading"),
		style : Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
		height : 'auto',
		width : 'auto'
	});

	// this is trivial, but is for testing
	var condition = true || (global.IOS);

	if (windowEnabled) {
		if (condition)
			popup.add(activityIndicator);
		activityIndicator.show();
		if (condition)
			popup.open();
	}

	f(popup, activityIndicator, function() {
		if (condition) {
			activityIndicator.hide();
			popup.close();
			popup = null;
		}
	});
}

/*
 example of ACS Function call
 
 	function userCreate(callback) {
		var Cloud = require('ti.cloud');
		Cloud.Users.create({
			email : <fill with your form value>,
			first_name : <fill with your form value>,
			last_name : <fill with your form value>,
			password : <fill with your form value>,
			password_confirmation : <fill with your form value>
		}, function(e) {

			callback();

			if (e.success) {

				// do something


			} else {
				alert('Error:\n' + ((e.error && e.message) ));

			}

		});
	}

 
 	example of function calling
 
		var Cloud = require("lib/cloud");
		Cloud.cloudify(userCreate); 
 
 * */

