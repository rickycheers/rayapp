var globals = require('globals');

function ApplicationWindow(/*String*/ type){

	var color, text;

	switch( type ){
		case 'partido':
			color = 'blue';
			title  = 'El Partido';
			break;

		case 'dato':
			color = 'orange';
			title  = 'El Dato';
			break;

		case 'trivia':
			color = 'yellow';
			title  = 'La Trivia';
			break;
	}

	var title = Ti.UI.createLabel({
		text: title,
		width: '100%',
		backgroundColor: '#eaeaea',
		top: 20,
		textAlign: 'center'
	});

	var banner = Ti.UI.createView({
		backgroundColor: '#fff',
		width: 310,
		height: 200,
		top: 10,
	});

	var date = Ti.UI.createLabel({
		text: '1 Agosto 2012',
		top: 10,
		left: '10%'
	});

	var content = Ti.UI.createLabel({
		width: '90%',
		top: 10,
		text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	});

	var self = Ti.UI.createWindow({
		backgroundColor: color,
		layout: 'vertical'
	});

	self.add(title);
	self.add(banner);
	self.add(date);
	self.add(content);

	title.left = hCenter( this.width );

	return self;
}

function hCenter( element_width ){
	return ( Ti.Platform.displayCaps.platformWidth - element_width ) / 2;
}

function width( margin ){
	margin = margin || 0;
	return Ti.Platform.displayCaps.platformWidth - ( margin * 2 );
}

module.exports = ApplicationWindow;