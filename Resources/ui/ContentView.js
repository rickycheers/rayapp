function ContentView(data, banners) {
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
	
	//self.add(new ui.Label(title, {
	//	color:'#ffffff'
	//}));

	// Banner
	var banner_url = banners ? banners[0].url : '';
	var banner = new ui.View({
		backgroundColor: '#eaeaea',
		backgroundImage: banner_url,
		width: '300dip',
		height: '112dip',
		top: '10dip',
		borderColor: '#fff',
		borderWidth: 2
	});
	self.add(banner);
	if( banners ){
		var banner_counter = 0;
		var banners_length = banners.length;

		setInterval(function(){
			banner.backgroundImage = banners[banner_counter].url;
			banner.link = banners[banner_counter].link;
			banner_counter = banner_counter == banners_length - 1 ? 0 : banner_counter + 1;
		}, 5000);
	}
	banner.addEventListener('click', function(){
		if( banner.link ){
			Titanium.Platform.openURL(banner.link);
		}
	});

	// Content
	var content_wrapper = new ui.ScrollView({
		showVerticalScrollIndicator: true,
		layout: 'vertical',
		backgroundColor: '#000',
		opacity: 0.7,
		width: '300dip',
		height: '150dip',
		top: '10dip',
		borderColor: '#fff',
		borderWidth: 2
	});

	var date = data.for_day + ' de ' + readableMonth(data.for_month);
	var font_size = Ti.Platform.osname == 'mobileweb' ? 14 : 8;
	content_wrapper.add(new ui.Label(date, {
		top: 10,
		left: 10,
		color: "#fff",
		width : "95%",
		font: { fontSize: font_size + 'pt', fontWeight: 'bold' }
	}));

	content_wrapper.add(new ui.Label(data.text, {
			top: 10,
			left: 10,
			color: "#fff",
			width : "95%",
			font: { fontSize: font_size - 1 + 'pt' }
		}));

	self.add(content_wrapper);

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