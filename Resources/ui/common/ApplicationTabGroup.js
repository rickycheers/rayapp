function ApplcicationTabGroup(){

	var self = Ti.UI.createTabGroup();

	var Window = require('ui/handheld/ApplicationWindow');

	// App Tabs
	var partidoWindow = new Window('partido'),
		datoWindow    = new Window('dato'),
		triviaWindow  = new Window('trivia')
	;

	var partidoTab = Ti.UI.createTab({
		title: 'El Partido',
		window: partidoWindow
	});
	partidoWindow.containingTab = partidoTab;

	var datoTab = Ti.UI.createTab({
		title: 'El Dato',
		window: datoWindow
	});
	datoWindow.containingTab = datoTab;

	var triviaTab = Ti.UI.createTab({
		title: 'La Trivia',
		window: triviaWindow,
		visible: false
	});
	triviaWindow.containingTab = triviaTab;

	self.addTab(partidoTab);
	self.addTab(datoTab);
	self.addTab(triviaTab);

	return self;
}

module.exports = ApplcicationTabGroup;