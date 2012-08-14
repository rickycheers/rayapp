function ApplicationWindow(){
	var self = Ti.UI.createWindow({
		backgroundColor: '#fff',
		navBarHidden   : true,
		layout         : 'vertical'
	});

	var NavBar = require('NavBar');
	var navBar = new NavBar();

	var HomeWindow = require('HomeWindow');
	var homeWindow = new HomeWindow();

	/* Partido */
	var partido_row = Ti.UI.createTableViewRow({height:100, childView:'ui/PartidoWindow'});

	var partido_row_label = Ti.UI.createLabel({
			color:'#000',
			font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial'},
			left:70,
			top:30,
			text:'El Partido'
		});

	partido_row.add(partido_row_label);

	/* Dato */
	var dato_row = Ti.UI.createTableViewRow({height:100});

	var dato_row_label = Ti.UI.createLabel({
			color:'#000',
			font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial'},
			left:70,
			top:30,
			text:'El Dato'
		});

	dato_row.add(dato_row_label);

	/* Trivia */
	var trivia_row = Ti.UI.createTableViewRow({height:100});

	var trivia_row_label = Ti.UI.createLabel({
			color:'#000',
			font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial'},
			left:70,
			top:30,
			text:'La Trivia'
		});

	trivia_row.add(trivia_row_label);

	var tableView = Titanium.UI.createTableView({
			data: [partido_row, dato_row, trivia_row]
		});

	self.add(navBar);
	self.add(tableView);
	//self.add(homeWindow);

	partido_row.addEventListener('click', function(e){
		Titanium.API.info(e.rowData.childView);
		
		var NewWindow = require('PartidoWindow');
		var new_window = new NewWindow();
		self.close();
		new_window.open();
	});

	return self;
}

module.exports = ApplicationWindow;