function NavBar(){
	
	var self = Ti.UI.createView({
		top               : 0,
		height            : '44dip',
		layout            : 'vertical',
		backgroundColor   : '#dadadb'
		/*
		backgroundGradient: {
            type: 'linear',
            startPoint: { x: '0%', y: '50%' },
            endPoint: { x: '100%', y: '50%' },
            colors: [ { color: '#eaeaea', offset: 0.0}, { color: '#ffffee', offset: 1.0 } ],
        }
        */
	});

	var menu_button = Ti.UI.createView({
		backgroundImage : '/images/slider_thumb.png',
		top   : 10,
		right : 5,
		width : 25,
		height: 32,
	});

	self.add(menu_button);

	return self;
}

module.exports = NavBar;