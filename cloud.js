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
 
 	function userCreate(popup, activity, callback) {
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

