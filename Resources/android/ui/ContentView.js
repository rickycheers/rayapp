function ContentView(data) {
	var _        = require('/lib/underscore'),
		theme    = require('/ui/theme'),
		ui       = require('/ui/components');
	
	var self = new ui.View({
		layout: 'vertical'
	});

	var title, content;

	switch( data.type ){
		case 1:
			title = 'El Partido';
			break;
		case 2:
			title = 'El Dato';
			break;
		case 3:
			title = 'La Trivia';
			break;
	}
	
	self.add(new ui.Label(title, {
		color:'#ffffff'
	}));

	self.add(new ui.View({
		backgroundColor: '#eaeaea',
		width: 310,
		height: 200,
		top: 10,
	}));

	var date = data.for_day + ' de ' + readableMonth(data.for_month);
	self.add(new ui.Label(date, {
		top: 10,
		left: '10%'
	}));

	self.add(new ui.Label(
		data.text,
		{
			width: '90%',
			top: 10
		}
		));
	
	return self;
}

function readableMonth( month ){
	var text = '';
	switch( parseInt(month) ){
		case 1: text = 'Enero'; break;
		case 2: text = 'Febrero'; break;
		case 3: text = 'Marzo'; break;
		case 4: text = 'Abril'; break;
		case 5: text = 'Mayo'; break;
		case 6: text = 'Junio'; break;
		case 7: text = 'Julio'; break;
		case 8: text = 'Agosto'; break;
		case 9: text = 'Septiembre'; break;
		case 10: text = 'Octubre'; break;
		case 11: text = 'Noviembre'; break;
		case 12: text = 'Diciembre'; break;
	}
	return text;
}

module.exports = ContentView;