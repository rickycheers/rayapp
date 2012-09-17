function InfoWindow() {
	var _ = require('/lib/underscore'),
		theme = require('/ui/theme'),
		ui = require('/ui/components'),
		ActionBarView = require('/ui/ActionBarView');

	var self = new ui.Window({
		navBarHidden:true,
		backgroundImage:theme.windowBackground
	});
	
	var actionBar = new ActionBarView({
		title: 'Acerca de Historias Rayadas',
		buttons: {
			cancel: {
				title:'Cancelar',
				width:80
			}
		}
	});
	self.add(actionBar.viewProxy);

	self.add(new ui.Label('By KIWAM'));
	
	actionBar.addEventListener('buttonPress', function() {
		self.close();
	});
	
	return self;
}
module.exports = InfoWindow;