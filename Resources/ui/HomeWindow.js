function HomeWindow(){
	var self = Ti.UI.createView({
		backgroundColor: '#fff',
		layout         : 'vertical'
	});

	var globals = require('globals');

	var partido_button = Ti.UI.createButton({title: 'El Partido', top: '50dip'});
	var dato_button    = Ti.UI.createButton({title: 'El Dato',    top: '50dip'});
	var trivia_button  = Ti.UI.createButton({title: 'La Trivia',  top: '50dip'});

	var PartidoWindow = require('PartidoWindow');
	var partidoWindow = new PartidoWindow();

	partido_button.addEventListener('click', function(){
		self.hide();
		partidoWindow.show(); // globals.slide_animation
	});

	self.add(partido_button);
	self.add(dato_button);
	self.add(trivia_button);

	return self;
}

module.exports = HomeWindow;