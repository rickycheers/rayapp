
(function(){

	// this sets the background color of the master UIView (when there are no windows/tab groups on it)
	Titanium.UI.setBackgroundColor('#fff');

	//var globals = require('globals');

	var ApplicationWindow = require('ui/ApplicationWindow');

	var applicationWindow = new ApplicationWindow();

	applicationWindow.open();

})();

/*
(function() {
	var globals = require('globals');
	Ti.API.info('Rayapp for ' + globals.osname);
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	new ApplicationTabGroup().open();

})();
*/