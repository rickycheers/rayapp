function TriviaWindow(){
	// creating Window instance
	var self = Ti.UI.createView({
		title          : 'La Trivia',
		backgroundColor: '#fff'
	});

	return self;

}

module.exports = TriviaWindow;